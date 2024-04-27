import { Image, Text, StyleSheet, TouchableOpacity, View } from "react-native";
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
  });

export const Item = ({item, onPress}) => {

    return(
      <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
      <View style={styles.item}>
          <Image style={styles.image} source={{ uri: item.imgPath }} />
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.price}>{item.price}원</Text>
      </View>
  </TouchableOpacity>
    );
};