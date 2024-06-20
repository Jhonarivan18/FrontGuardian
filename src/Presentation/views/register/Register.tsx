import React, {useEffect} from 'react'
import { ActivityIndicator, ScrollView, Text, ToastAndroid, View } from 'react-native';
import { RoundedButton } from '../../components/RoundedButton';
import useViewModel from './ViewModel';
import { CustomTextInput } from '../../components/CustomTextInput';
import styles from './Styles';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../App';

interface Props extends StackScreenProps<RootStackParamList, 'RegisterScreen'>{};

export const RegisterScreen = ({navigation,route}: Props) => {

    const { name, lastname, email, phone, password, confirmPassword,loading, errorMessage,successMessage, user, onChange, register}=useViewModel();

    useEffect(() => {
        if (errorMessage != '') {
            ToastAndroid.show(errorMessage, ToastAndroid.LONG); 
        }
    }, [errorMessage])

    useEffect(() => {
        if (successMessage != '') {
            ToastAndroid.show(successMessage, ToastAndroid.LONG); 
        }
    }, [successMessage])

    useEffect(() => {
        if (user?.id !== null && user?.id !== undefined) {
            navigation.replace('GuardaTabsNavigator');
        }
    }, [user])

    return (
        <View style={styles.container}> 
                 
            <View style={styles.form}>

                <ScrollView>


            <Text style={styles.formText}>REGISTRARSE</Text>

            <CustomTextInput
            placeholder='Nombres'
            keyboardType='default'
            image={require('../../../../assets/usuario.png')}
            property='name'
            onChangeText={onChange}
            value={ name }
            />
            <CustomTextInput
            placeholder='Apellidos'
            keyboardType='default'
            image={require('../../../../assets/usuario.png')}
            property='lastname'
            onChangeText={onChange}
            value={ lastname }
            />
            <CustomTextInput
            placeholder='Correo Electronico'
            keyboardType='default'
            image={require('../../../../assets/correo_electronico.png')}
            property='email'
            onChangeText={onChange}
            value={ email }
            />
            <CustomTextInput
            placeholder='Telefono'
            keyboardType='numeric'
            image={require('../../../../assets/telefono.png')}
            property='phone'
            onChangeText={onChange}
            value={ phone }
            />
            <CustomTextInput
            placeholder='Contraseña'
            keyboardType='default'
            image={require('../../../../assets/contraseña.png')}
            property='password'
            onChangeText={onChange}
            value={ password }
            secureTextEntry={true}
            />
            <CustomTextInput
            placeholder=' Confirmar Contraseña'
            keyboardType='default'
            image={require('../../../../assets/confirmacion_contraseña.png')}
            property='confirmPassword'
            onChangeText={onChange}
            value={ confirmPassword }
            secureTextEntry={true}
            />

                <View style={{marginTop: 30}}>
                <RoundedButton text='CONFIRMAR' onPress={() => register() }/>
                </View>
                
                </ScrollView>
    
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
        
       