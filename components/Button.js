import React, { Component} from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import { white, lightPurp } from "../utils/colors";

export default function Button({children, onPress}) {
    return(
        <TouchableOpacity style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn} onPress={onPress}>
            <Text style={Platform.OS === 'ios' ? styles.iosBtnText : styles.androidBtnText}>{children}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    androidBtnText: {
        color: white,
        fontWeight: '400',
        textAlign: 'center',
        fontSize: 22,
    },
    iosBtnText: {
        color: lightPurp,
        fontWeight: '400',
        textAlign: 'center',
        fontSize: 22,
    },
    iosSubmitBtn:{
        backgroundColor: white,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        height: 45,
        borderRadius: 2,
        justifyContent: 'center',
        alignItems: 'center',
        width: 300,
        borderColor: lightPurp,
        borderWidth: 1,
        marginTop: 20,
    },
    androidSubmitBtn: {
        backgroundColor: lightPurp,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        height: 45,
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:20,
        width: 300,
        alignSelf: 'center'
    },
})