import { Image, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import AWS from 'aws-sdk';
import { useEffect, useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import { RNS3 } from 'react-native-aws3';
import S3Config from "../../awsS3config"; // S3 정보가 들어있는 파일
import { ScrollView } from "react-native-gesture-handler";
import axios from "axios";
import {API_URL} from '@env';
import { ItemAddedModal } from "../../component/ItemAddedModal";
import Checkbox from "expo-checkbox";
import { verifyTokens } from "../../utils/tokenUtils";


export const AdminItemPage =  ({navigation, route}) => {

    const {accessToken} = route.params;

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [itemNumber, setItemNumber] = useState('');
    const [description, setDescription] = useState('');
    const [manufacturer, setManufacturer] = useState('');
    const [discountAmount, setDiscountAmount] = useState(2);
    const [imgUrl, setImgUrl] = useState(null);
    const [isBest, setIsBest] = useState(false);
    const [imgType, setImgType] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [fileName, setFileName] = useState('');
    const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();

    const uploadImage = async() => {
        if(!status.granted) {
            const permission = await requestPermission();
            if(!permission.granted){
                return null;
            }
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            quality: 1,
            aspect: [1, 1]
        });

        if(result.canceled) {
            return null;
        }

        console.log(result);
        setImgUrl(result.assets[0].uri);
        setImgType(result.assets[0].mimeType);
        setFileName(result.assets[0].fileName);
    }

    

    const submitButton = async() => {
        const file = {
            uri: imgUrl,
            name: fileName,
            type: imgType
        };

        const options = {
            keyPrefix: "uploads/",
            bucket: S3Config.bucket,
            region: S3Config.region,
            accessKey: S3Config.accessKeyID,
            secretKey: S3Config.secretAccessKey,
            successActionStatus: 201
        }

        const response = await RNS3.put(file, options);
        console.log(response);
        if (response.status !== 201){
            throw new Error("Failed to upload image to S3");
        }
        else{
            
            const body = {
                name: name,
                price: price,
                imgPath: `https://companyapp-image.s3.ap-northeast-2.amazonaws.com/uploads/${fileName}`,
                itemNumber: itemNumber,
                manufacturer: manufacturer,
                isBest: isBest,
                description: description,
                minimumQuantityForDiscount: discountAmount
            };
            try{
                const res = await axios.post(`${API_URL}/api/admin/items`, body, {headers: {Authorization: `Bearer ${accessToken}`}});

                setIsModalVisible(true);

                // 일정 시간 후에 모달을 자동으로 닫을 수도 있습니다.
                setTimeout(() => {
                    setIsModalVisible(false);
                    navigation.navigate('AdminHomePage');
                }, 2000);
            }
            catch (error) {
                
                verifyTokens(navigation);    
                 
            };
            
        }
    }



    return(
        <SafeAreaView>
            <ScrollView style={styles.container}>
                <Image source={{ uri: imgUrl }} style={styles.image} />
                <Pressable onPress={uploadImage} style={styles.button}>
                    <Text style={styles.buttonText}>이미지 선택</Text>
                </Pressable>
                <TextInput
                    style={styles.input}
                    placeholder="상품 이름"
                    value={name}
                    onChangeText={setName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="가격"
                    value={price}
                    keyboardType="numeric"
                    onChangeText={setPrice}
                />
                <TextInput
                    style={styles.input}
                    placeholder="제품번호"
                    value={itemNumber}
                    onChangeText={setItemNumber}
                />
                <TextInput
                    style={styles.input}
                    placeholder="할인 시작 개수"
                    value={discountAmount}
                    keyboardType="numeric"
                    onChangeText={setDiscountAmount}
                />
                <TextInput
                    style={styles.input}
                    placeholder="제조사"
                    value={manufacturer}
                    onChangeText={setManufacturer}
                />
                <TextInput
                    style={styles.input}
                    placeholder="설명란"
                    value={description}
                    multiline={true}
                    onChangeText={setDescription}
                />
                <View style={styles.checkboxContainer}>
                    <Text>베스트 상품</Text>
                    <Checkbox
                        value = {isBest}
                        onValueChange={(state) => {setIsBest(state);}}
                    />
                </View>
                <Pressable
                    onPress={submitButton}
                    style={[styles.button, { opacity: !imgUrl ? 0.5 : 1 }]}
                    disabled={!imgUrl}>
                    <Text style={styles.buttonText}>상품 등록</Text>
                </Pressable>
                <ItemAddedModal isVisible={isModalVisible} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
   
    },
    input: {
        marginBottom: 20,
        padding: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#3498db',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        marginBottom: 20,
        alignItems: 'center',
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 10,
        marginBottom: 20,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
  });