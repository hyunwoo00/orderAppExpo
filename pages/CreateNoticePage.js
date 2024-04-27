import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Pressable } from 'react-native';
import {API_URL} from '@env';
import axios from 'axios';
import { verifyTokens } from '../utils/tokenUtils';


export const CreateNoticePage = ({navigation, route}) => {

  const {accessToken} = route.params;
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleCreateNotice = () => {

    const body = {
      title: title,
      content: content
    };
    axios.post(`${API_URL}/api/admin/announcement`, body, {headers: {Authorization: `Bearer ${accessToken}`}})
    .then((response) => {
      navigation.navigate('AnnouncementPage', {isAdmin: true, page: 0, accessToken: accessToken});
    })
    .catch((error) => {
   
      verifyTokens(navigation);    
      
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="제목"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[styles.input, { height: 200 }]} // 높이를 높임
        placeholder="내용"
        multiline={true} // 여러 줄 입력 가능하도록 설정
        value={content}
        onChangeText={setContent}
      />
      <Pressable style = {styles.button} onPress={handleCreateNotice} disabled = {title == '' || content == ''}>
        <Text style = {styles.buttonText}>공지사항 작성</Text>
      </Pressable>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff', // 버튼 글자색상 추가
    fontSize: 18,
    fontWeight: 'bold',
},
  button: {
    backgroundColor: '#3498db', // 버튼 배경색상 추가
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 20,
},
});

