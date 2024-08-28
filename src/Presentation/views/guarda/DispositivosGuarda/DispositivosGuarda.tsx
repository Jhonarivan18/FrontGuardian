/* import React from 'react'
import { Text, View } from 'react-native'

export const GuardaScreenRegistroDispositivo = () => {
  return (
    <View>
        <Text> pantalla registro guarda </Text>
    </View>
  )
} */


import React, { useEffect } from 'react'
import { Text, View, ScrollView, ActivityIndicator, ToastAndroid } from 'react-native';
import Styles from './Styles';
import { CustomTextInput } from '../../../components/CustomTextInput';
import useViewModel from './ViewModel'
import { RoundedButton } from '../../../components/RoundedButton';
import DropDownComponent from '../../../components/DropDown';
import { tiposDocumento } from '../../../components/data';

export const GuardaScreenRegistroDispositivos = () => {

  const {name, lastname, telefono, tipoDocumento, documento, dispositivo, marca, color, serial, descripcion, loading, errorMessage, successMessage, onChange, CreateRegistro} = useViewModel();

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
  

  return (
    <ScrollView> 
    <View style={Styles.form}>
    <Text style={{fontWeight: 'bold', fontSize: 18, marginTop: 20, textAlign: 'center'}}>DATOS DEL PROPIETARIO</Text>
      <CustomTextInput
            placeholder='Nombres'
            image={require('../../../../../assets/usuario.png')}
            keyboardType='default'
            property='name'
            value={name}
            onChangeText={onChange}
          />
          <CustomTextInput
            placeholder='Apellidos'
            image={require('../../../../../assets/usuario.png')}
            keyboardType='default'
            property='lastname'
            value={lastname}
            onChangeText={onChange}
          />
          <CustomTextInput
            placeholder='Telefono'
            image={require('../../../../../assets/telefono.png')}
            keyboardType='numeric'
            property='telefono'
            value={telefono}
            onChangeText={onChange}
          />
          <DropDownComponent
              image={require('../../../../../assets/documento.png')}
              label="Tipo de documento"
              items={tiposDocumento}
              value={tipoDocumento}
              onValueChange={(value) => onChange('tipoDocumento', value)}
      
            /> 
          <CustomTextInput
            placeholder='Número Documento'
            image={require('../../../../../assets/documento.png')}
            keyboardType='numeric'
            property='documento'
            value={documento}
            onChangeText={onChange}
          />
          <Text style={{
            fontSize: 18,
            fontWeight: 'bold',
            marginTop: 35,
            textAlign: 'center'
            }}>DATOS DEL DISPOSITIVO</Text>
            
          <CustomTextInput
            placeholder='Tipo de Dispositivo'
            image={require('../../../../../assets/dispositivos.png')}
            keyboardType='default'
            property='dispositivo'
            value={dispositivo}
            onChangeText={onChange}
          />
          <CustomTextInput
            placeholder='Marca'
            image={require('../../../../../assets/marca.png')}
            keyboardType='default'
            property='marca'
            value={marca}
            onChangeText={onChange}
          />
          <CustomTextInput
            placeholder='Color'
            image={require('../../../../../assets/color.png')}
            keyboardType='default'
            property='color'
            value={color}
            onChangeText={onChange}
          />
          <CustomTextInput
            placeholder='Serial'
            image={require('../../../../../assets/serial.png')}
            keyboardType='default'
            property='serial'
            value={serial}
            onChangeText={onChange}
          />
          <CustomTextInput
            placeholder='Observación'
            image={require('../../../../../assets/descripcion.png')}
            keyboardType='default'
            property='descripcion'
            value={descripcion}
            onChangeText={onChange}
          />
          <View style={Styles.buttonContainer}>
          <RoundedButton
              text='GUARDAR REGISTRO'
              onPress={() => CreateRegistro()}
              />
          </View>
          {
                loading &&
                <ActivityIndicator 
                    style={Styles.loading} 
                    size="large" 
                    color= 'blue' />
            }
    </View>
    </ScrollView> 
     
  )
} 
