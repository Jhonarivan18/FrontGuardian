import React, {useEffect} from 'react'
import { ActivityIndicator, Image, ScrollView, Text, ToastAndroid, View } from 'react-native';
import { RoundedButton } from '../../../components/RoundedButton';
import useViewModel from './ViewModel';
import { CustomTextInput } from '../../../components/CustomTextInput';
import styles from './Styles';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../../App';

interface Props extends StackScreenProps<RootStackParamList, 'ProfileUpdateScreen'>{};

export const ProfileUpdateScreen = ({navigation,route}: Props) => {

    const {user} = route.params;
    const { name, lastname, phone, loading, errorMessage, successMessage, onChange, onChangeInfoUpdate, update}=useViewModel(user);

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
            onChangeInfoUpdate(user?.name, user?.lastname, user?.phone) 
    }, [user])

    
         

    return (
        <View style={styles.container}> 
        <Image
            source={require('../../../../../assets/fondo.png')}
            style={styles.imageBackground}
          />
            
            <View style={styles.form}>

                <ScrollView>


            <Text style={styles.formText}>ACTUALIZAR</Text>

            <CustomTextInput
            placeholder='Nombres'
            keyboardType='default'
            image={require('../../../../../assets/usuario.png')}
            property='name'
            onChangeText={onChange}
            value={ name }
            />
            <CustomTextInput
            placeholder='Apellidos'
            keyboardType='default'
            image={require('../../../../../assets/usuario.png')}
            property='lastname'
            onChangeText={onChange}
            value={ lastname }
            />
            <CustomTextInput
            placeholder='Telefono'
            keyboardType='numeric'
            image={require('../../../../../assets/telefono.png')}
            property='phone'
            onChangeText={onChange}
            value={ phone }
            />

                <View style={{marginTop: 30}}>
                <RoundedButton text='CONFIRMAR' onPress={() => update() }/>
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
        
       