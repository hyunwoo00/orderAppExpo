import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {API_URL} from '@env';
import { useState } from "react";
import axios from "axios";
import { CartAddedModal } from "../component/CartAddedModal";
import { verifyTokens } from "../utils/tokenUtils";


export const ItemDetailPage = ({navigation, route}) => {
    const {item,userId, accessToken} = route.params;

    const [quantity, setQuantity] = useState(1);
    const [isModalVisible, setIsModalVisible] = useState(false);



    const increaseQuantity = () => {
      setQuantity((state) => {
        if(state === 10) return 10;
        else return state + 1;
      });
    }

    const decreaseQuantity = () => {
      setQuantity((state) => {
        if(state === 1) return 1;
        else return state - 1;
      });
    }



    const cartButtonHandler = () => {

      const body = {
        "userId": userId,
        "itemId": item.id,
        "count": quantity
      }

      axios.post(`${API_URL}/api/carts`,  body, {headers: {Authorization: `Bearer ${accessToken}`}})
      .then((response) => {
        console.log(response);
        setIsModalVisible(true);

        // 일정 시간 후에 모달을 자동으로 닫을 수도 있습니다.
        setTimeout(() => {
        setIsModalVisible(false);
        }, 2000);
      })
      .catch((error) => {
        verifyTokens(navigation);
      });
    };

    const purchaseButtonHandler = () => {
      navigation.navigate('OrderPage', {item: item, quantity: quantity, userId: userId, accessToken: accessToken})
    }

    const closeModal = () => {
      setIsModalVisible(false);
    };

    return(
        <SafeAreaView style={styles.container}>
          <ScrollView>

            <Image style={styles.image} source={{uri:item.imgPath}} />
            <Text style={styles.title}>{item?.name}</Text>
            <Text style={styles.price}>{item?.price}원</Text>
            <Text style={styles.description}>제품 번호: {item?.itemNumber}</Text>
            <Text style={styles.description}>제조사: {item?.manufacturer}</Text>
            <Text style={styles.description}>{item?.description}</Text>
            <View style = {styles.quantityContainer}>
              <TouchableOpacity activeOpacity={0.8} style={styles.quantityButton} onPress = {decreaseQuantity} disabled = {quantity === 1}>
                <Text>-</Text>
              </TouchableOpacity>
              <Text>{quantity}</Text>
              <TouchableOpacity activeOpacity={0.8} style={styles.quantityButton} onPress = {increaseQuantity} disabled = {quantity === 10}>
                <Text>+</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity activeOpacity={0.8} style={styles.btn} onPress = {cartButtonHandler}>
                    <Text style={styles.text}>장바구니 담기</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} style={styles.btn} onPress = {purchaseButtonHandler}>
                    <Text style={styles.text}>바로 구매하기</Text>
                </TouchableOpacity>
            </View>
            <CartAddedModal isVisible={isModalVisible} onClose={closeModal} />
          </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    marginBottom: 10,
  },
  description: {
    marginBottom: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  quantityButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
  },
});