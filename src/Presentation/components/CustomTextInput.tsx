import React from 'react'
import { Image, View, TextInput, StyleSheet, KeyboardType } from 'react-native'

interface props{
    image: any,
    placeholder: string,
    value: string,
    keyboardType: KeyboardType,
    secureTextEntry?: boolean,
    property: string,
    onChangeText: (property: string, value: any) => void 
}

export const CustomTextInput = ({
    image,
    placeholder,
    value,
    keyboardType,
    secureTextEntry = false,
    property,
    onChangeText
}: props) => {
  return (
    <View style={styles.formInput}>
            <Image
                style={styles.formIcon}
                source={image}
            />  
            <TextInput
                style={styles.formTextInput}
                placeholder={placeholder}
                keyboardType={keyboardType}
                value={value}
                onChangeText={text =>onChangeText(property, text)}
                secureTextEntry={secureTextEntry}
            />
            </View>
  )
}


const styles = StyleSheet.create({
    formInput:{
        flexDirection: "row",
        marginTop: 20
    },
    formIcon:{
        width: 45,
        height: 45
    },
    formTextInput:{
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#F23469',
        marginLeft: 15
    }

})
