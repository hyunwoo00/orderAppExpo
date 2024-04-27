import { Button, SafeAreaView, StyleSheet, TouchableOpacity, Text, ScrollView , View} from "react-native";
import React, { useState, useEffect} from 'react';
import { TextInput } from "react-native-gesture-handler";
import axios from "axios";
import {API_URL} from '@env';
import ToastScreen from "../component/ToastScreen";



export const SignUpPage = ({route, navigation}) => {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [storeName, setStoreName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [roadAddress, setRoadAddress] = useState("");
    const [zoneCode, setZoneCode] = useState("");
    const [businessNumber, setBusinessNumber] = useState("");
    const [detail, setDetail] = useState("");

    const [showErrorToast, setShowErrorToast] = useState(false);

    useEffect(() => {
        console.log(route);
        setRoadAddress(route.params?.address);
        setZoneCode(route.params?.zoneCode);
    },[route])

    const handlePhoneNumber = (input) => {
        let newText = input.replace(/[^0-9]/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
        setPhoneNumber(newText);
      };
    
      const handleBusinessNumber = (input) => {
        let newText = input.replace(/[^0-9]/g, '').replace(/(\d{3})(\d{2})(\d{5})/, '$1-$2-$3');
        setBusinessNumber(newText);
      };



    const handleSignUp = () => {

        if(password !== confirmPassword){
            return setShowErrorToast(true);
        }


        axios.post(`${API_URL}/api/users`, {
            "name":name,
            "username": username,
            "storeName": storeName,
            "password": password,
            "phoneNumber": phoneNumber,
            "businessNumber": businessNumber,
            "roadAddress": roadAddress,
            "zoneCode": zoneCode,
            "detail": detail
        })
        .then(res => {{
            if(res.status === 200){
                navigation.navigate('AuthPage');
            }
        }})
        .catch(error => {
            setShowErrorToast(true);
        })
    };

    const handleDisableButton = () => {
        return (name !== "" && username !== "" && storeName !== "" && password !== "" && confirmPassword !== "" && phoneNumber !== "" && roadAddress !== "" && zoneCode !== "");
    }


    return(
      <SafeAreaView>
        <ScrollView style={{}}>
        <TextInput
          placeholder="아이디"
          style={styles.input}
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          placeholder="비밀번호"
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        
        <TextInput
          placeholder="비밀번호 확인"
          style={styles.input}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={true}
        />
        <TextInput
          placeholder="이름"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />
        <TextInput
          placeholder="가게 명"
          style={styles.input}
          value={storeName}
          onChangeText={setStoreName}
        />
        <TextInput
          placeholder="사업자 번호"
          style={styles.input}
          value={businessNumber}
          keyboardType="numeric"
          onChangeText={handleBusinessNumber}
        />
        <TextInput
          placeholder="전화번호"
          value={phoneNumber}
          style={styles.input}
          keyboardType="phone-pad"
          onChangeText={handlePhoneNumber}
        />
        <TextInput
          placeholder="주소"
          value={roadAddress === undefined ? "주소" : roadAddress + " [" + zoneCode + "]"}
          editable={false}
          style={styles.input}
        />
        <TouchableOpacity activeOpacity={0.8} style={styles.btn} onPress={() => navigation.navigate('SearchAddress', { redirectPage: 'SignUpPage' })}>
          <Text style={styles.text}>우편번호 찾기</Text>
        </TouchableOpacity>
        <TextInput
          placeholder="상세 주소"
          value={detail}
          onChangeText={setDetail}
          style={styles.input}
        />
        <TouchableOpacity activeOpacity={0.8} style={[styles.btn, !handleDisableButton() && styles.disabledBtn]} onPress={handleSignUp} disabled={!handleDisableButton()}>
          <Text style={styles.text}>회원가입</Text>
        </TouchableOpacity>
        {showErrorToast && (
          <ToastScreen
            height={40}
            marginBottom={72}
            onClose={() => setShowErrorToast(false)}
            message="입력한 정보가 올바른지 확인하십시오."
          />
        )}
      </ScrollView>
      </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    input: {
        marginBottom: 20,
        padding: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
      },
      btn: {
        backgroundColor: '#3498db',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        marginBottom: 20,
      },
      disabledBtn: {
        backgroundColor: '#cccccc',
      },
      text: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
      },
  });

