import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Animated, StyleSheet } from 'react-native';

/**
 *  공통 : Toast Message
 * 
 * @param {number} message: Toast 메시지에서 출력할 텍스트
 * @param {number} height : Toast 메시지의 높이
 * @param {number} marginBottom : Toast 메시지의 하단 기준 Margin 
 * @param {() => void} onClose: Toast 메시지의 처리 이후 부모창의 State 값을 초기화 해줍니다.
 * @returns 
 */
const ToastScreen = ({ message, height, marginBottom, onClose }) => {
    const [isToastVisible, setIsToastVisible] = useState(true);
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsToastVisible(false);
            onClose();
        }, 4000);

        Animated
            .timing(fadeAnim, {
                toValue: isToastVisible ? 1 : 0,
                duration: 500,
                useNativeDriver: true
            })
            .start(() => {
                setIsToastVisible(true);
            });
        return () => clearTimeout(timer);
    }, []);

    const styles = StyleSheet.create({
        container: {
            position: "absolute",
            zIndex: 1000000,
            flex: 1,
            alignItems: 'center',
            marginTop: 600,
            width: 328,
            height: height,
            borderRadius: 14,
            marginLeft: 16,
            marginRight: 16,
            marginBottom: marginBottom,
            // backgroundColor: '#4e545e',
            backgroundColor: "rgba(0, 0, 0, 0.7)"
        },
        buttonText: {
            fontSize: 20,
            textAlign: 'center',
            margin: 10,
        },
        toast: {
            position: 'absolute',
            backgroundColor: '#333',
            borderRadius: 25,
            paddingVertical: 10,
            paddingHorizontal: 20,
        },
        toastText: {
            width: 296,
            height: height,
            fontFamily: 'NanumBarunGothic',
            fontSize: 14,
            marginTop: 10,
            marginLeft: 10,
            fontWeight: 'normal',
            fontStyle: 'normal',
            lineHeight: 20,
            letterSpacing: 0,
            textAlign: 'center',
            color: '#ffffff',
        },
    });

    return (
        <>
            {isToastVisible && (
                <Animated.View
                    style={styles.container}
                >
                    <Text style={styles.toastText}>{message}</Text>
                </Animated.View>
            )}
        </>
    );

};

export default ToastScreen;