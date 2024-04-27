import React, { useEffect, useState } from 'react';
import { View, Alert, StyleSheet, TouchableOpacity, FlatList, Text, Pressable, SafeAreaView} from 'react-native';
import {API_URL} from '@env';
import axios from 'axios';
import { verifyTokens } from '../utils/tokenUtils';

export const AnnouncementPage = ({route, navigation}) => {

  const {isAdmin, page, accessToken} = route.params;

  const [notices, setNotices] = useState(null);
  const [total, setTotal] = useState(0);
  const [maxPage, setMaxPage] = useState(0);

  const renderingScreen = () => {
    axios.get(`${API_URL}/api/announcement`, {params:{page: page}, headers: {Authorization: `Bearer ${accessToken}`}})
    .then((response) => {
      
      setNotices(response.data.data);
      setTotal(response.data.total);
      setMaxPage(response.data.totalPage);
      if(response.data.totalPage < page){
        navigation.navigate('AnnouncementPage', {...route.params, page: response.data.totalPage});
      }
    })
    .catch((error) => {
        console.log(error);
        verifyTokens(navigation);    
    });
  }
    
  useEffect(() => {
    renderingScreen();
  },[page]);

  const renderNotice = ({ item }) => (
    <View style={styles.item}>
      <Pressable onPress = {() => {handleNoticeBtn(item.id)}}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.date}>{item.date.substring(0, item.date.indexOf('T'))}</Text>
      </Pressable>
      {isAdmin &&
        <TouchableOpacity onPress={() => handleDeletePress(item.id)} style={styles.removeButton}>
          <Text>삭제</Text>
        </TouchableOpacity>
      }
    </View>
  );

  const handleNoticeBtn = (id) => {
    navigation.navigate('AnnouncementDetailPage', {id: id, accessToken: accessToken});
  };

  const remove = (id) => {
    
    axios.delete(`${API_URL}/api/admin/announcement/${id}`, {headers: {Authorization: `Bearer ${accessToken}`}})
    .then(() => {
      renderingScreen();
    })
    .catch((error) => {
      
        verifyTokens(navigation);    
       
    });
  }

  const handleDeletePress = (id) => {
    Alert.alert(
      "삭제 확인",
      "정말 삭제하시겠습니까?",
      [
        {
          text: "취소",
          style: "cancel"
        },
        {
          text: "확인",
          onPress: () => remove(id)
        }
      ]
    );
  }

  const decreasePage = () => {
    navigation.navigate('AnnouncementPage', {...route.params, page: page - 1});
  }

  const increasePage = () => {
    navigation.navigate('AnnouncementPage', {...route.params, page: page + 1});
  }

  const handleWriteNotice = () => {
    navigation.navigate('CreateNoticePage', {accessToken: accessToken});
  }


  return (
    
      <FlatList 
        ListEmptyComponent={
          <SafeAreaView style={styles.container}>
            <Text style={styles.sectionTitle}>공지사항</Text>
      <FlatList
        data={notices}
        renderItem={renderNotice}
      />
      <View style={styles.quantityContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.quantityButton, { marginRight: 10 }]}
          onPress={decreasePage}
          disabled={page === 0}
        >
          <Text>이전</Text>
        </TouchableOpacity>
        <Text>{page + 1}</Text>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.quantityButton, { marginLeft: 10 }]}
          onPress={increasePage}
          disabled={page === maxPage - 1}
        >
          <Text>다음</Text>
        </TouchableOpacity>
      </View>
      {isAdmin && (
        <TouchableOpacity style={styles.addButton} onPress={handleWriteNotice}>
          <Text style={styles.addButtonText}>글쓰기</Text>
        </TouchableOpacity>
      )}
          </SafeAreaView>
        }
      />
      
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 16,
  },
  date: {
    fontSize: 14,
    color: 'gray',
  },
  removeButton: {
    padding: 5,
    backgroundColor: 'red',
    borderRadius: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  quantityButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
    alignSelf: 'flex-start',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});