import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, SafeAreaView, FlatList } from 'react-native';
import {API_URL} from '@env';
import { RadioButton } from 'react-native-paper';
import { OrderCompleteModal } from '../component/OrderCompleteModal';
import { verifyTokens } from '../utils/tokenUtils';


export const OrderPage = ({navigation, route}) => {
    
    console.log(route);
    const {item, quantity, userId, accessToken} = route?.params;
    
    const [receiptType, setReceiptType] = useState('cash_receipt');
    const [deliveryInfo, setDeliveryInfo] = useState(null);
    const [request, setRequest] = useState("없음");
    const [isModalVisible ,setIsModalVisible] = useState(false);


    const totalPrice = item?.price * quantity - ((quantity >= item?.minimumQuantityForDiscount) ? quantity * 1000 : 0);
    
    useEffect(() => {
        axios.get(`${API_URL}/api/users/${userId}`, {headers: {Authorization: `Bearer ${accessToken}`}})
        .then((response) => {
            setDeliveryInfo(response.data);
        })
        .catch((error) => {
          
          verifyTokens(navigation);    
        
        });
    },[]);

    useEffect(() => {

      if(route.params.editedDeliveryInfo !== undefined){
        setDeliveryInfo(route.params?.editedDeliveryInfo);
      }
    },[route.params?.editedDeliveryInfo]);


    const RenderItem = ({ item }) => (
        <View style={styles.itemContainer}>
          <View style = {styles.itemDetails}>
            <Text>{item?.name}</Text>
            <Text>수량: {quantity}</Text>
            <View style = {styles.priceContainer}>
                <Text style={styles.originalPrice}>가격: {item?.price * quantity}원</Text>
                <Text style={styles.discountedPrice}>할인 가격: {totalPrice}원</Text>
            </View>
          </View>
        </View>
    );


    const handleOrder = () => {

        const body = {
            "itemId": item?.id,
            "quantity": quantity,
            "userId": userId,
            "storeName": deliveryInfo?.address.storeName,
            "roadAddress": deliveryInfo?.address.roadAddress,
            "zoneCode": deliveryInfo?.address.zoneCode,
            "detail": deliveryInfo?.address.detail,
            "phoneNumber": deliveryInfo?.phoneNumber,
            "request": request,
            "receipt": receiptType
        };

        console.log(body);

        axios.post(`${API_URL}/api/orders`, body, {headers: {Authorization: `Bearer ${accessToken}`}})
        .then((response) => {
            console.log(response);

            setIsModalVisible(true);
            // 일정 시간 후에 모달을 자동으로 닫을 수도 있습니다.
            setTimeout(() => {
                setIsModalVisible(false);
                navigation.navigate('HomePage');
            }, 2000);
            
          
        })
        .catch((error) =>{
          
            verifyTokens(navigation);    
        
        });
        

    }
    
  
    return (
      
        <FlatList 
          ListEmptyComponent = {
            <SafeAreaView style={styles.container}>
              <View style={styles.infoContainer}>
          <Text style={styles.heading}>Order Details</Text>
          <View style={styles.detailItem}>
            <Text style={styles.label}>도로명 주소:</Text>
            <Text style={styles.value}>{deliveryInfo?.address.roadAddress}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.label}>상세 주소:</Text>
            <Text style={styles.value}>{deliveryInfo?.address.detail}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.label}>가게명:</Text>
            <Text style={styles.value}>{deliveryInfo?.address.storeName}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.label}>핸드폰 번호:</Text>
            <Text style={styles.value}>{deliveryInfo?.phoneNumber}</Text>
          </View>
          <TouchableOpacity style={[styles.editButton, styles.rightAlign]} onPress={() => navigation.navigate('EditDeliveryInfoPage', {...route.params, deliveryInfo: deliveryInfo, page: 'OrderPage'})}>
            <Text style={styles.editButtonText}>수정</Text>
          </TouchableOpacity>
          <RenderItem item = {item}/>
          <View style={styles.detailItem}>
            <Text style={styles.label}>Total Price:</Text>
            <Text style={[styles.value, styles.totalAmount]}>{totalPrice}</Text>
          </View>
        </View>
        <View style={styles.paymentContainer}>
            <Text style={styles.heading}>결제수단</Text>
            <View style={styles.detailItem}>
            <Text style={styles.label}>무통장입금-</Text>
            <Text style={styles.value}>농협 301-1544-3282-21</Text>
          </View>
        </View>
        <View style={styles.paymentContainer}>
            <Text style={styles.heading}>요청사항</Text>
            <View style={styles.detailItem}>
              <TextInput value = {request} onChangeText={setRequest} multiline={true}/>
            </View>
        </View>
        <View style={styles.receiptContainer}>
            <Text style={styles.heading}>Receipt Type</Text>
            <TouchableOpacity style = {styles.button} onPress={() => setReceiptType('cash_receipt')}>
                <Text>현금영수증</Text>
                <RadioButton
                    value="cash_receipt"
                    status={ receiptType === 'cash_receipt' ? 'checked' : 'unchecked' }
                    onPress={() => setReceiptType('cash_receipt')}
                />
            </TouchableOpacity>
            <TouchableOpacity style = {styles.button} onPress={() => setReceiptType('tax_invoice')}>
                <Text>세금계산서</Text>
                <RadioButton
                    value="tax_invoice"
                    status={ receiptType === 'tax_invoice' ? 'checked' : 'unchecked' }
                    onPress={() => setReceiptType('tax_invoice')}
                />
            </TouchableOpacity>
        </View>
        <TouchableOpacity style = {styles.btn} onPress={handleOrder}>
            <Text style = {styles.text}>주문하기</Text>
        </TouchableOpacity>
        <OrderCompleteModal isVisible={isModalVisible} />
        </SafeAreaView>
          }
        />
        
  
      
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    infoContainer: {
      marginBottom: 20,
    },
    heading: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    detailItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    label: {
      fontWeight: 'bold',
      marginRight: 10,
    },
    value: {
      flex: 1,
    },
    totalAmount: {
      fontWeight: 'bold',
    },
    paymentContainer: {
      marginBottom: 20,
    },
    receiptContainer: {
      marginBottom: 20,
    },
    btn: {
      backgroundColor: '#007bff',
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      color: '#fff',
      fontWeight: 'bold',
    },
    itemContainer: {
      marginBottom: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      paddingBottom: 10,
    },
    itemDetails: {
      marginBottom: 10,
    },
    priceContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    originalPrice: {
      textDecorationLine: 'line-through',
      color: '#999',
    },
    discountedPrice: {
      fontWeight: 'bold',
    },
    editButton: {
      padding: 10,
      backgroundColor: '#007bff',
      borderRadius: 5,
    },
    editButtonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
  });