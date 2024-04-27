import axios from "axios";
import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, FlatList, TouchableOpacity, View } from "react-native";
import {API_URL} from '@env';
import { Item } from "../component/Item";
import { getTokenFromLocal, verifyTokens } from "../utils/tokenUtils";



export const ItemPage = ({navigation, route}) => {
    const {accessToken} = route.params;
    const [bestItems, setBestItems] = useState([]);
    const [steadyItems, setSteadyItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [userId, setUserId] = useState(0);

    useEffect(() => {
        axios.get(`${API_URL}/api/items`, {headers: {Authorization: `Bearer ${accessToken}`}})
        .then((response) => {
            console.log(response);
            setSteadyItems(response.data.data.filter(item => item.best === false));
            setBestItems(response.data.data.filter(item => item.best === true));
        })
        .catch((error) => {
            console.log(error);
            
            verifyTokens(navigation);
              
            
        });

        getTokenFromLocal()
        .then(value => {
          setUserId(value.userId);
        })
        .catch((error) => console.log(error))
    },[]);


    const renderItem = ({item}) => (
        <Item 
            item = {item}
            onPress = {() => {
                setSelectedItem(item);
                navigation.navigate('ItemDetailPage', {item: item, userId: userId, accessToken: accessToken})
            }}
        />
    );

    const navigateToCart = () => {
      navigation.navigate('CartPage', {userId: userId, accessToken: accessToken});
    }




    return(
      
            <FlatList 
                ListEmptyComponent={
                    <SafeAreaView style={styles.container}>
                        <TouchableOpacity style={styles.cartButton} onPress={navigateToCart}>
                            <Text style={styles.cartButtonText}>장바구니</Text>
                        </TouchableOpacity>
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
cartButton: {
    alignSelf: 'flex-end',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: '#3498db',
    marginBottom: 10,
    top: 30
},
cartButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
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