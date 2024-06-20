import React from 'react'
import { TouchableOpacity, View, Image, Text } from 'react-native'
import { Rol } from '../../../Domain/entities/Rol';
import styles from './Styles';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../App';

interface Props{
    rol: Rol,
    height: number,
    width: number,
    navigation:StackNavigationProp<RootStackParamList, "RolesScreen", undefined>
}

export const RolesItem = ({rol, height, width, navigation}: Props) => {
  return (
    <TouchableOpacity
        onPress={() =>{
            if (rol.name == "ADMINISTRADOR"){
                navigation.replace('AdminTabsNavigator');
            }
            if (rol.name == "GUARDA"){
                navigation.replace('GuardaTabsNavigator');
            }
        }}
        style={{ ...styles.container, height: height, width: width}}>

        <View style={styles.imageContainer}>
            <Image
            style={styles.image} 
                source={{uri: rol.image}}
            /> 
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{rol.name}</Text>
            </View>
        </View>
    </TouchableOpacity>
  )
}
