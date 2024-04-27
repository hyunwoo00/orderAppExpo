import { View, TouchableOpacity, StyleSheet, Text, SafeAreaView} from 'react-native';
import { useState } from "react";
import { getTokens } from '../utils/tokenUtils';
import { TextInput } from 'react-native-gesture-handler';
import ToastScreen from '../component/ToastScreen';



const AuthPage = ({navigation, route}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showErrorToast, setShowErrorToast] = useState(false);



    const handleLogin = () =>{
      getTokens(username, password, navigation)
      .then((response) =>{
        if(response === false) setShowErrorToast(true);
      })  
      .catch((error) => console.log(error))
        
      
      
    }

    const handleSignUp = () =>{
      navigation.navigate('SignUpPage');
    }

  return (
    <View style = {styles.container}>
      <TextInput
        placeholder="아이디"
        value={username}
        style = {styles.input}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="비밀번호"
        value={password}
        style = {styles.input}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      <View style = {{alignItems: 'center'}}>
        <TouchableOpacity style = {styles.button} onPress={handleLogin} >
          <Text style = {styles.buttonText}>로그인</Text>
        </TouchableOpacity>
        <TouchableOpacity style = {styles.button} onPress={handleSignUp}>
          <Text style = {styles.buttonText}>회원가입</Text>
        </TouchableOpacity>
      </View>
      {
        showErrorToast ?
        <ToastScreen 
          height = {40}
          marginBottom={72}
          onClose={() => setShowErrorToast(false)}
          message="로그인에 실패했습니다."
        />
        : null
      }
    </View>
    );
}


const styles = StyleSheet.create({
  CompanyLogoStyle: {width: 100, height: 100, resizeMode: "contain"},
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  button: {
      backgroundColor: '#3498db', // 버튼 배경색상 추가
      paddingVertical: 15,
      paddingHorizontal: 30,
      borderRadius: 10,
      marginBottom: 20,
  },
  buttonText: {
    color: '#fff', // 버튼 글자색상 추가
    fontSize: 18,
    fontWeight: 'bold',
},
input: {
  marginBottom: 20,
  padding: 10,
  borderWidth: 1,
  borderColor: 'gray',
  borderRadius: 5,
},
});

export default AuthPage;