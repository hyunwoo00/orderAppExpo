import React from 'react';
import { Modal, Text, View, TouchableOpacity, StyleSheet } from 'react-native';

export const ItemAddedModal = ({ isVisible}) => {
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
    >
      <View style={styles.container}>
        <View style={styles.modal}>
          <Text style={styles.message}>상품이 등록되었습니다!</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modal: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
    },
    message: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    closeButton: {
      marginTop: 10,
      padding: 10,
      backgroundColor: '#3498db',
      borderRadius: 5,
    },
    closeButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },
  });