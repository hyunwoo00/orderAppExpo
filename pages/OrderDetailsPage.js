import { useEffect, useState } from "react";
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {API_URL} from '@env';
import axios from "axios";
import { getTokenFromLocal, verifyTokens } from "../utils/tokenUtils";

export const OrderDetailsPage = ({route, navigation}) => {

  const {accessToken} = route.params;
    const [orders, setOrders] = useState(null);
    const [count, setCount] = useState(0);

    useEffect(() => {
        getTokenFromLocal()
        .then(value => {
            axios.get(`${API_URL}/api/orders/details?id=${value.userId}`, {headers: {Authorization: `Bearer ${accessToken}`}})
            .then((response) => {
              setCount(response.data.count);
              setOrders(response.data.data);
            })
            .catch((error) => {
                console.log(error);
                verifyTokens(navigation);    
              
            });
        })
        .catch((error) => console.log(error))
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
            <Text style={styles.originalPrice}>수량: {item.count}개</Text>
          </View>
        </View>
    );

    const renderOrder = ({item}) => (
      <View style={styles.itemContainer}>
          <View style = {styles.itemDetails}>
            <Text>{item?.orderDate.substring(0,item?.orderDate.indexOf('T'))}</Text>
            <FlatList
                data={item?.orderItems}
                renderItem={renderItem}
                keyExtractor={item => item?.id.toString()}
            />
          </View>
        </View>
    );


    return(
     
        <FlatList 
          ListEmptyComponent={
            <SafeAreaView style={styles.container}>
              <Text style={styles.sectionTitle}>주문 내역</Text>
                <Text style = {{color: 'gray', textAlign: 'right'}}>최근 3개월 내 100건 조회 가능</Text>
                <FlatList
                  data={orders}
                  renderItem ={renderOrder}
                  keyExtractor={order => order?.id.toString()}
                />
            </SafeAreaView>
          }
        />
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 5,
  },
  itemDetails: {
    flex: 1,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  originalPrice: {
    color: 'black',
  },
  discountedPrice: {
    color: 'red',
  },
  });