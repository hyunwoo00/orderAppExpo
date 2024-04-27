import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {API_URL} from '@env';
import { DateToString } from "../../utils/dateUtils";
import { verifyTokens } from "../../utils/tokenUtils";


const LIMIT = 20;


export const AdminOrderDetailsPage = ({route, navigation}) => {

    const {date, page, accessToken} = route.params;
    const currentDate = date.substr(0, date.indexOf('T'));
    const [orders, setOrders] = useState(null);
    const isLoading = useRef<Boolean>(false);


    const apiGetData = (currentPage, LIMIT) => (
        axios.get(`${API_URL}/api/admin/orders`, 
        { params: {date: date, offset: currentPage * LIMIT, limit: LIMIT},
         headers: {Authorization: `Bearer ${accessToken}`}
        })
    );


     // 주문 항목 렌더링
     const renderOrder = ({ item }) => (
      <View style={styles.orderContainer}>
          <Text>상호명: {item.storeName}</Text>
          <Text>주소: {item?.roadAddress} [{item?.zoneCode}] {item?.detail}</Text>
          <Text>전화번호: {item.phoneNumber}</Text>
          <Text>Receipt: {item.receipt}</Text>
          <FlatList
              data={item?.orderItems}
              renderItem={renderItem}
          />
      </View>
  );

  // 주문 상품 항목 렌더링
  const renderItem = ({ item }) => (
      <View style={styles.itemContainer}>
          <Text>{item.name}</Text>
          <Text style={styles.itemCount}>수량: {item.count}개</Text>
      </View>
  );

  // 페이지 이동 함수
  const navigateToPage = (targetPage) => {
      navigation.navigate('AdminOrderDetailsPage', { ...route.params, page: targetPage });
  };

  // 날짜 변경 함수
  const changeDate = (increment) => {
      const newDate = new Date(currentDate);
      newDate.setDate(newDate.getDate() + increment);
      navigation.navigate('AdminOrderDetailsPage', { ...route.params,page: 0, date: DateToString(newDate)});
  };

  // useEffect를 이용해 페이지 로딩 시 데이터 불러오기
  useEffect(() => {
      apiGetData(page, LIMIT)
      .then((response) => {
        setOrders(response.data.data);
    })
      .catch((error) => {
        verifyTokens(navigation);    
          
      })
  }, [date, page]);

  return (
      
        <FlatList 
            ListEmptyComponent={
                <SafeAreaView style={styles.container}>
                    <Text style={styles.sectionTitle}>주문 목록</Text>
          <View style={styles.dateContainer}>
              <TouchableOpacity style={styles.dateButton} onPress={() => changeDate(-1)}>
                  <Text>{'<-'}</Text>
              </TouchableOpacity>
              <Text>{currentDate}</Text>
              <TouchableOpacity style={styles.dateButton} onPress={() => changeDate(1)}>
                  <Text>{'->'}</Text>
              </TouchableOpacity>
          </View>
          <FlatList
              data={orders}
              renderItem={renderOrder}

          />
          <View style={styles.pageNavigation}>
              <TouchableOpacity
                  style={[styles.navigationButton, { opacity: page === 0 ? 0.5 : 1 }]}
                  onPress={() => navigateToPage(page - 1)}
                  disabled={page === 0}>
                  <Text>이전</Text>
              </TouchableOpacity>
              <Text>{page + 1}</Text>
              <TouchableOpacity
                  style={styles.navigationButton}
                  onPress={() => navigateToPage(page + 1)}>
                  <Text>다음</Text>
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
    paddingHorizontal: 16,
    paddingTop: 20,
},
sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
},
dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
},
dateButton: {
    padding: 8,
},
orderContainer: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
},
itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
},
itemCount: {
    fontWeight: 'bold',
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