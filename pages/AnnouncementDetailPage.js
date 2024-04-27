import React, { useState, useEffect } from 'react';
import {  View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import {API_URL} from '@env';
import axios from 'axios';
import { verifyTokens } from '../utils/tokenUtils';

export const AnnouncementDetailPage = ({ route, navigation }) => {
  const { id, accessToken } = route.params;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    axios.get(`${API_URL}/api/announcement/${id}`, {headers: {Authorization: `Bearer ${accessToken}`}})
    .then((response) => {
        setTitle(response.data.title);
        setContent(response.data.content);
    })
    .catch((error) => {
      verifyTokens(navigation);    
      
    });
  },[]);

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.content}>{content}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  titleContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  contentContainer: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    borderRadius: 10,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
  },
});

