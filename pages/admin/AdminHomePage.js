import { Image, SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from "react-native"
import CompanyLogo from '../../assets/company-logo.png'
import { DateToString } from "../../utils/dateUtils";
import { getTokenFromLocal, removeTokenFromLocal } from "../../utils/tokenUtils";
import { useEffect, useState } from "react";

export const AdminHomePage = ({navigation}) => {

    const [accessToken, setAccessToken] = useState('');

    useEffect(() => {
        getTokenFromLocal()
        .then((Token) => {
            setAccessToken(Token.accessToken);
        })
        .catch((error) => console.log(error))
    },[]);

    const handleOrderDetailsButton = () => {

        const now = new Date();
        
        const today = DateToString(now);

        navigation.navigate('AdminOrderDetailsPage', {date: today, page: 0, accessToken: accessToken});
    };

    const handleLogoutButton = () => {

        removeTokenFromLocal();
        navigation.reset({routes: [{name: "AuthPage"}]});
    }

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.logoContainer}>
                <Image source={CompanyLogo} style={styles.companyLogo} resizeMode="contain" />
                <Text style={styles.companyName}>삼천푸드</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('AdminUserDetailsPage', { page: 0, accessToken: accessToken }); }}>
                <Text style={styles.buttonText}>회원 목록</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleOrderDetailsButton}>
                <Text style={styles.buttonText}>주문 확인</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('AdminItemPage', {accessToken: accessToken}) }} >
                <Text style={styles.buttonText}>상품 등록</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('AdminItemDeletePage', {accessToken: accessToken}) }} >
                <Text style={styles.buttonText}>상품 삭제</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate("AnnouncementPage", { isAdmin: true, page: 0, accessToken: accessToken }); }}>
                <Text style={styles.buttonText}>공지사항</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleLogoutButton}>
                <Text style={styles.buttonText}>로그아웃</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

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
    
});