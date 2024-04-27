import Postcode from "@actbase/react-daum-postcode";
import React from 'react';
import { View } from "react-native";

export const SearchAddress = ({navigation, route}) => {

    const redirectPage = route.params?.redirectPage;

    return (
        <View>
            <Postcode style={{ width: '100%', height: '100%' }}
                jsOptions={{ animation: true }}
                onSelected= {
                    (data) => {
                        navigation.navigate(redirectPage, {...route.params, zoneCode: data.zonecode, address: data.address})
                    }
                }
            />
        </View>
    );
}