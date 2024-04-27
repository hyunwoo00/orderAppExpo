import axios from "axios";
import { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {API_URL} from '@env';
import { verifyTokens } from "../../utils/tokenUtils";

export const AdminUserDetailsPage = ({route, navigation}) => {

    const {page, accessToken} = route.params;
    const [users, setUsers] = useState(null);
    const [maxPage, setMaxPage] = useState(0);

    useEffect(() => {
        axios.get(`${API_URL}/api/admin/users`, {params: {page:0}, headers: {Authorization: `Bearer ${accessToken}`}})
        .then((response) => {
            setUsers(response.data.data);
            setMaxPage(response.data.totalPage);
        })
        .catch((error) => {
            verifyTokens(navigation);    
        })
    },[]);

   

    const renderUser = ({item}) => (
      <View style={styles.itemContainer}>
            <View style={styles.itemDetails}>
                <Text>이름: {item?.name}</Text>
                <Text>가게명: {item.address?.storeName}</Text>
                <Text>전화번호: {item?.phoneNumber}</Text>
                <Text>주소: {item.address?.roadAddress} [{item.address?.zoneCode}]</Text>
                <Text>상세주소: {item.address?.detail}</Text>
            </View>
      </View>

    );

    const decreasePage = () => {
      navigation.navigate('AdminUserDetailsPage', {...route.params, page: page - 1});
    }
  
    const increasePage = () => {
      navigation.navigate('AdminUserDetailsPage', {...route.params, page: page + 1});
    }

    return(
      
        <FlatList 
            ListEmptyComponent={
                <SafeAreaView style={styles.container}>
                    <Text style={styles.sectionTitle}>회원 목록</Text>
        <FlatList
            data={users}
            renderItem={renderUser}
            keyExtractor={(item) => item?.id.toString()}
        />
        <View style={styles.pageNavigation}>
            <TouchableOpacity
                style={[styles.navigationButton, { opacity: page === 0 ? 0.5 : 1 }]}
                onPress={decreasePage}
                disabled={page === 0}>
                <Text>이전</Text>
            </TouchableOpacity>
            <Text>{page + 1}</Text>
            <TouchableOpacity
                style={[styles.navigationButton, { opacity: page === maxPage - 1 ? 0.5 : 1 }]}
                onPress={increasePage}
                disabled={page === maxPage - 1}>
                <Text>다음</Text>
            </TouchableOpacity>
        </View>
        </SafeAreaView>
            }
        />
        
        
    );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
},
sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
},
itemContainer: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
},
itemDetails: {
    marginBottom: 5,
},
pageNavigation: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
},
navigationButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#ddd',
    borderRadius: 5,
    marginHorizontal: 5,
},
  });