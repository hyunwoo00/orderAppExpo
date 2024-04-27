import { Image, Text, StyleSheet, TouchableOpacity, View, Pressable } from "react-native";
import mk from "../assets/mk.png"


const styles = StyleSheet.create({
  itemContainer: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    width: '50%'
},
item: {
    flexDirection: 'column',
    alignItems: 'center',
},
image: {
    width: 100,
    height: 100,
    marginBottom: 5,
},
title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
},
price: {
    fontSize: 14,
    color: 'gray',
},
removeButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: 'red',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  });

export const DeleteItem = ({item, onDeletePress}) => {

    return(
      <View style={styles.itemContainer}>
      <View style={styles.item}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.price}>{item.price}원</Text>
          <Pressable style = {styles.removeButton} onPress= {onDeletePress}>
            <Text>삭제</Text>
          </Pressable>
      </View>
      </View>
    );
};