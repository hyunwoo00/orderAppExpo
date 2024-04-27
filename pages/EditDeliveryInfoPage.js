import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";


export const EditDeliveryInfoPage = ({navigation, route}) => {
    console.log(route);
    const {deliveryInfo, page} = route.params;
    const [roadAddress, setRoadAddress] = useState("");
    const [zoneCode, setZoneCode] = useState("");
    const [detail, setDetail] = useState("");
    const [storeName, setStoreName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    

    useEffect(() => {
        if(route.params.deliveryInfo !== undefined){
            setRoadAddress(deliveryInfo.address?.roadAddress);
            setZoneCode(deliveryInfo.address?.zoneCode);
            setDetail(deliveryInfo.address?.detail);
            setStoreName(deliveryInfo.address.storeName);
            setPhoneNumber(deliveryInfo.phoneNumber);
        }
    },[route.params?.deliveryInfo]);
        
    useEffect(() => {
        if(route.params.zoneCode !== undefined){
            setRoadAddress(route.params?.address);
            setZoneCode(route.params?.zoneCode);
        }
    },[route.params?.zoneCode]);

    const handlePhoneNumber = (input) => {
        let newText = "";

        const state = input.replace(/-/g, '');

        if(state.length > 7){
            newText = state.substring(0, 3) + "-" + state.substring(3, 7) + "-" + state.substring(7, 11);
        }
        else if(state.length > 3) {
            newText = state.substring(0, 3) + "-" + state.substring(3, 7);
        }
        else newText = state;
        setPhoneNumber(newText);
    }


    return(

        <SafeAreaView style = {styles.container}>
            <View style={styles.infoContainer}>
                <View style={styles.detailItem}>
                    <Text style={styles.label}>주소</Text>
                    <Text style={styles.value}>{roadAddress + " [" + zoneCode + "]"}</Text>
                </View>
                <View style={styles.detailItem}>
                    <Text style={styles.label}>상세주소</Text>
                    <TextInput style={styles.value} value={detail} onChangeText={setDetail}/>
                </View>
                <View style={styles.detailItem}>
                    <Text style={styles.label}>가게명</Text>
                    <TextInput style={styles.value} value={storeName} onChangeText={setStoreName}/>
                </View>
                <View style={styles.detailItem}>
                    <Text style={styles.label}>핸드폰 번호</Text>
                    <TextInput style={styles.value} value={phoneNumber} onChangeText={handlePhoneNumber}/>
                </View>
            </View>

            <TouchableOpacity 
                activeOpacity={0.8} 
                style={styles.btn} 
                onPress={() => 
                    navigation.navigate('SearchAddress', {...route.params, redirectPage: 'EditDeliveryInfoPage'})
                }>
                <Text style={styles.text}>우편번호 찾기</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                activeOpacity={0.8}
                style={styles.btn} 
                onPress={() => 
                    navigation.navigate(
                        page, 
                        {...route.params, editedDeliveryInfo: {address: {roadAddress: roadAddress, zoneCode: zoneCode, detail: detail, storeName: storeName}, phoneNumber: phoneNumber}}
                    )   
                }>
                <Text style={styles.text}>수정 완료</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
      },
      infoContainer: {
        width: '100%',
        marginBottom: 20,
      },
      detailItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
      },
      label: {
        fontWeight: 'bold',
        marginRight: 10,
      },
      value: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
      },
      btn: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 5,
        marginVertical: 10,
      },
      text: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
      },
  });