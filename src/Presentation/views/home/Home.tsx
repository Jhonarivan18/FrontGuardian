import React, {useEffect} from 'react'
import { Image, Text, View, TouchableOpacity, ToastAndroid, ActivityIndicator } from 'react-native';
import { RoundedButton } from '../../components/RoundedButton';
import {  StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../App';
import useViewModel from './ViewModel';
import { CustomTextInput } from '../../components/CustomTextInput';
import styles from './Styles';
import DropDown from '../../components/DropDown';


interface Props extends StackScreenProps<RootStackParamList, 'HomeScreen'>{};

export const HomeScreen = ({navigation, route}: Props) => {

    const { email, password, errorMessage, loading, onChange, login, user } = useViewModel();

    useEffect(() => {
        if (errorMessage !== ''){
            ToastAndroid.show(errorMessage, ToastAndroid.LONG);
        }
    }, [errorMessage])


    useEffect(() => {
        if (user?.id !== null && user?.id !== undefined && user?.id !== ''){
            if (user.roles?.length! > 1) {
                navigation.replace('RolesScreen');
            }
            else{
                navigation.replace('GuardaTabsNavigator')
            }
        }
    }, [user])
    
    

return (
    //COLUMN
    <View style={styles.container}>
        <View style={styles.logoContainer}>
        <Text style={styles.logoText}>GUARDIÁN</Text>
        <Image source={require('../../../../assets/logoGuardian.png')} style={styles.logoImage}/>
        </View>      
        <View style={styles.form}>
        <Text style={styles.formText}>INICIAR SESIÓN</Text>


        <CustomTextInput
            image={require('../../../../assets/correo_electronico.png')}
            placeholder='correo electronico'
            keyboardType='email-address'
            property='email'
            onChangeText={ onChange } 
            value={ email }           
        />



        <CustomTextInput
            image={require('../../../../assets/contraseña.png')}
            placeholder='contraseña'
            keyboardType='default'
            property='password'
            onChangeText={ onChange } 
            value={ password }
            secureTextEntry={true}           
        />



            <View style={{marginTop: 30}}>

            <RoundedButton text='LOGIN' onPress={ () => login()}/>
            </View>


            <View style={styles.formRegister}>
            <Text>No tienes cuenta aún?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
            <Text style={styles.formRegisterText}>REGÍSTRATE</Text>
            </TouchableOpacity>
            </View>

        </View>
        {
         loading &&
        <ActivityIndicator 
            style={styles.loading} 
            size="large" 
            color= 'blue' />
        }
    </View>
    )
};
    
    
