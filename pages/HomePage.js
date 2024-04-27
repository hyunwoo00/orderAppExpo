import { Image, SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from "react-native"
import CompanyLogo from '../assets/company-logo.png'
import { getTokenFromLocal, removeTokenFromLocal } from "../utils/tokenUtils";
import { useEffect, useState } from "react";


export const HomePage = ({navigation}) => {

    const [userId, setUserId] = useState(0);
    const [accessToken, setAccessToken] = useState('');

    useEffect(() => {
        getTokenFromLocal()
        .then((Token) => {
            setAccessToken(Token.accessToken);
            setUserId(Token.userId);
        })
        .catch((error) => console.log(error))
    },[]);

    const handleOrderButton = () => {
        navigation.navigate("ItemPage", {accessToken: accessToken});
    }

    const handleOrderDetailsButton = () => {
        navigation.navigate("OrderDetailsPage", {accessToken: accessToken});
    }

    const handleAnnouncementButton = () => {
        navigation.navigate("AnnouncementPage", {isAdmin: false, page: 0, accessToken: accessToken});
    }

    const handleLogoutButton = () => {
       
        removeTokenFromLocal();
        navigation.reset({routes: [{name: "AuthPage"}]});
        
    }


    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.logoContainer}>
                <Image source={CompanyLogo} style={styles.companyLogo} resizeMode="contain"/>
                <Text style={styles.companyName}>삼천푸드</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleOrderButton}>
                <Text style={styles.buttonText}>주문하기</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleOrderDetailsButton}>
                <Text style={styles.buttonText}>주문내역</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleAnnouncementButton}>
                <Text style={styles.buttonText}>공지사항</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleLogoutButton}>
                <Text style={styles.buttonText}>로그아웃</Text>
            </TouchableOpacity>
            <Text style={styles.contactText}>문의 전화: 010-9344-3282</Text>
            <Text style={styles.contactText}>회사 계좌번호: 농협 301-1544-3282-21</Text>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
    },
    companyLogo: {
        width: 100,
        height: 100,
        marginRight: 10,
    },
    companyName: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#3498db',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    contactText: {
        marginTop: 20,
        fontSize: 16,
    },
});