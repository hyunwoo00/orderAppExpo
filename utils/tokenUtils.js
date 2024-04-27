import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios";
import {API_URL} from '@env';



export const getTokens = (username, password, navigation) => {
    return axios.post(`${API_URL}/api/users/login`,
    {
        "username": username,
        "password": password
    })
    .then(res => {{
        if(res.status === 200){
            AsyncStorage.setItem('Tokens', JSON.stringify({
                'accessToken': res.data.accessToken,
                'refreshToken': res.data.refreshToken,
                'userId': res.data.userId
            }))
            if(res.data.userId == 1) navigation.reset({routes: [{name: "AdminHomePage"}]});
            else navigation.reset({routes: [{name: "HomePage"}]});
        }
        else{
          return false;
        }
    }})
    .catch(error => {
      console.log(error);
      return false;
    })
}

export const getTokenFromLocal = async () => {
    try {
      const value = await AsyncStorage.getItem("Tokens");
      
      if (value !== null) {
        return JSON.parse(value)
      }
      else{
        return null;
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  export const removeTokenFromLocal = async() => {
    try{
      await AsyncStorage.removeItem("Tokens");

    } catch (e) {
      console.log(e.message);
    }
  }
  
  
  export const verifyTokens = async (navigation) => {
    const Token = await getTokenFromLocal();
  
    // 최초 접속
    if (Token === null){
      navigation.reset({routes: [{name: "AuthPage"}]});
    }
    // 로컬 스토리지에 Token데이터가 있으면 -> 토큰들을 헤더에 넣어 검증 
    else{
      const headers_config = {
        "refresh": Token.refreshToken,
        "Authorization" : `Bearer ${Token.accessToken}`,
        "userId": Token.userId
      };
  
      try {
        const res = await axios.get(`${API_URL}/api/users/refresh`, {headers: headers_config})
        
        // accessToken 만료, refreshToken 정상 -> 재발급된 accessToken 저장 후 자동 로그인
        AsyncStorage.setItem('Tokens', JSON.stringify({
          ...Token,
          'accessToken': res.data.accessToken,
        }))
        if(Token.userId == 1) navigation.reset({routes: [{name: "AdminHomePage"}]});
        else navigation.reset({routes: [{name: "HomePage"}]});
  
      } catch(error){
        const code = error.response.data.code; 
        console.log(error);
        // accessToken 만료, refreshToken 만료 -> 로그인 페이지
        if(code === 401){
          navigation.reset({routes: [{name: "AuthPage"}]});
        }
        // accessToken 정상, refreshToken 정상 -> 자동 로그인
        else{
          if(Token.userId == 1) navigation.reset({routes: [{name: "AdminHomePage"}]});
          else navigation.reset({routes: [{name: "HomePage"}]});
        }
      }
  
    }
  };