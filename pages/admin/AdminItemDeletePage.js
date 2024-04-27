import axios from "axios";
import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, FlatList, TouchableOpacity, View } from "react-native";
import {API_URL} from '@env';
import { DeleteItem } from "../../component/DeleteItem";
import { verifyTokens } from "../../utils/tokenUtils";



export const AdminItemDeletePage = ({navigation, route}) => {

    const {accessToken} = route.params;

    const [bestItems, setBestItems] = useState([]);
    const [steadyItems, setSteadyItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);


    const renderingScreen = () => {
        axios.get(`${API_URL}/api/items`, {headers: {Authorization: `Bearer ${accessToken}`}})
        .then((response) => {
            console.log(response);
            setSteadyItems(response.data.data.filter(item => item.best === false));
            setBestItems(response.data.data.filter(item => item.best === true));
        })
        .catch((error) => {
            verifyTokens(navigation);    
        });
    }


    useEffect(() => {
        renderingScreen();
    },[]);


    const renderItem = ({item}) => (
        <DeleteItem 
            item = {item}
            onDeletePress = {() => {
                axios.delete(`${API_URL}/api/admin/items/${item.id}`, {headers: {Authorization: `Bearer ${accessToken}`}})
                .then(() => {
                    renderingScreen();
                })
                .catch((error) => {
                    
                    verifyTokens(navigation);    
                    
                })

            }}
        />
    );





    return(
      
            <FlatList
                ListEmptyComponent={
                    <SafeAreaView style={styles.container}>
                        <Text style={styles.sectionTitle}>베스트 아이템</Text>
            <FlatList
                data={bestItems}
                key={'_'}
                renderItem={renderItem}
                keyExtractor={item => '_' + item.id}
                numColumns={2}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.listContainer}
            />
            <View style={styles.divider} />
            <Text style={styles.sectionTitle}>일반 상품</Text>
            <FlatList
                data={steadyItems}
                key={'#'}
                renderItem={renderItem}
                keyExtractor={item => "#" + item.id}
                numColumns={2}
                contentContainerStyle={styles.listContainer}
            />
                    </SafeAreaView>
                }
            />
            
        
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
    backgroundColor: '#fff',
},
sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
},
listContainer: {
    paddingBottom: 20,
},
divider: {
  borderBottomWidth: 1,
  borderBottomColor: '#ccc',
  marginBottom: 10,
},
});