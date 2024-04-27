import axios from "axios";
import { useEffect, useState } from "react";
import { FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import {API_URL} from '@env';
import mk from "../assets/mk.png"
import { verifyTokens } from "../utils/tokenUtils";


export const CartPage = ({navigation, route}) => {

    const [items, setItems] = useState(null);
    const {userId, accessToken} = route.params;

    const renderingScreen = () => {
        axios.get(`${API_URL}/api/carts/users/${userId}`, {headers: {Authorization: `Bearer ${accessToken}`}})
        .then((response) => {
            setItems(response.data.orderItems);
        })
        .catch((error) => {
          verifyTokens(navigation);    
        });
    }


    const totalPrice = items?.reduce((total, item) => total + item.price * item.count - item.discountPrice, 0);
    
    
    
    useEffect(() => {
        renderingScreen();
    },[]);

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
          <Image source={{uri:item.imgPath}} style = {styles.image} />
          <View style = {styles.itemDetails}>
            <Text>{item.name}</Text>
            <View style = {styles.priceContainer}>
                <Text style={styles.originalPrice}>가격: {item.price * item.count}원</Text>
                <Text style={styles.discountedPrice}>할인 가격: {item.price * item.count - item.discountPrice}원</Text>
            </View>
            <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={() => modifyCount(item.id, item.count - 1)} style={styles.quantityButton} disabled = {item.count === 1}>
                <Text>-</Text>
                </TouchableOpacity>
                <Text>{item.count}</Text>
                <TouchableOpacity onPress={() => modifyCount(item.id, item.count + 1)} style={styles.quantityButton} disabled = {item.count === 10}>
                <Text>+</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => removeFromCart(item.id)} style={styles.removeButton}>
                <Text>장바구니에서 삭제</Text>
            </TouchableOpacity>
          </View>
        </View>
    );

    
    const removeFromCart = (itemId) => {
        axios.delete(`${API_URL}/api/carts/users/${userId}/items/${itemId}`, {headers: {Authorization: `Bearer ${accessToken}`}})
        .then((response) => {
            console.log(response);
            renderingScreen();
        })
        .catch((error) => {
  
            verifyTokens(navigation);    
          
        });
    };
    

    const modifyCount = (itemId, itemCount) => {
        const body = {
            "userId": userId,
            "itemId": itemId,
            "count": itemCount
        };
        axios.patch(`${API_URL}/api/carts`, body, {headers: {Authorization: `Bearer ${accessToken}`}})
        .then((response) => {
            console.log(response);
            renderingScreen();
        })
        .catch((error) => {
      
            verifyTokens(navigation);    
          
        })
    };

    const continueButtonHandler = () => {
        navigation.navigate('ItemPage', {accessToken: accessToken});
    }

    const orderButtonHandler = () => {
        navigation.navigate('OrderPageByCart', {userId: userId, accessToken: accessToken});
    }

    return(
        
          <FlatList 
            ListEmptyComponent={
              <SafeAreaView style={styles.container}>
                <Text style={styles.sectionTitle}>장바구니</Text>
            <FlatList
                data={items}
                renderItem={renderItem}
                keyExtractor={item => item?.id.toString()}
            />
            <View style={styles.totalContainer}>
                <Text>Total: {totalPrice}원</Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress = {continueButtonHandler}>
                    <Text>게속 쇼핑하기</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress = {orderButtonHandler} disabled = {totalPrice == 0}>
                    <Text>주문하러 가기</Text>
                </TouchableOpacity>
            </View>
            </SafeAreaView>
            }
          />
            
        
        
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    item: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#ffffff',
      marginBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      paddingBottom: 10,
    },
    quantityContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    quantityButton: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      backgroundColor: '#eee',
      borderRadius: 5,
      marginHorizontal: 5,
    },
    removeButton: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      backgroundColor: 'red',
      borderRadius: 5,
      marginHorizontal: 5,
    },
    totalContainer: {
      marginTop: 20,
      alignItems: 'flex-end',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    button: {
      backgroundColor: 'blue',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
    },
    originalPrice: {
        marginRight: 5,
        textDecorationLine: 'line-through', // 줄 긋기
        color: '#888', // 원래 가격은 회색으로 표시
      },
      discountedPrice: {
        color: '#000', // 할인가격은 검은색으로 표시
      },
      priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 16,
        marginTop: 20,
      },
      itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
      },
      itemDetails: {
        flex: 1,
        alignItems: 'center',
      },
  });