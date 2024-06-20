import React, { useEffect } from 'react'
import { Text, View, ScrollView, ActivityIndicator, ToastAndroid } from 'react-native';
import Styles from './Styles';
import { CustomTextInput } from '../../../components/CustomTextInput';
import useViewModel from './ViewModel';
import { RoundedButton } from '../../../components/RoundedButton';

export const AdminScreenRegistroDispositivos = () => {

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
      <CustomTextInput
            placeholder='Nombre'
            image={require('../../../../../assets/usuario.png')}
            keyboardType='default'
            property='name'
            value={name}
            onChangeText={onChange}
          />
          <CustomTextInput
            placeholder='Apellido'
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
          <CustomTextInput
            placeholder='Tipo de Documento'
            image={require('../../../../../assets/documento.png')}
            keyboardType='default'
            property='tipoDocumento'
            value={tipoDocumento}
            onChangeText={onChange}
          />
          <CustomTextInput
            placeholder='Documento'
            image={require('../../../../../assets/documento.png')}
            keyboardType='numeric'
            property='documento'
            value={documento}
            onChangeText={onChange}
          />
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
              text='Registrar Dispositivo'
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


/* 
import React, { useEffect } from 'react'
import { Text, View, ScrollView, ActivityIndicator, ToastAndroid } from 'react-native';
import Styles from './Styles';
import { CustomTextInput } from '../../../components/CustomTextInput';
import useViewModel from './ViewModel';
import { RoundedButton } from '../../../components/RoundedButton';

export const AdminScreenRegistroDispositivos = () => {

  const {name, lastname, telefono, tipoDocumento, documento, dispositivo, marca, color, serial, descripcion, loading, responseMessage, onChange, CreateRegistro} = useViewModel();

  useEffect(() => {
    if (responseMessage !== ''){
      ToastAndroid.show(responseMessage,ToastAndroid.LONG);
    }
  }, [responseMessage])



  return (
    <ScrollView>
    <View style={Styles.form}>
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
            placeholder='Teléfono'
            image={require('../../../../../assets/telefono.png')}
            keyboardType='numeric'
            property='telefono'
            value={telefono}
            onChangeText={onChange}
          />
          <CustomTextInput
            placeholder='Tipo de Documento'
            image={require('../../../../../assets/documento.png')}
            keyboardType='default'
            property='tipoDocumento'
            value={tipoDocumento}
            onChangeText={onChange}
          />
          <CustomTextInput
            placeholder='Numero de Documento'
            image={require('../../../../../assets/documento.png')}
            keyboardType='numeric'
            property='documento'
            value={documento}
            onChangeText={onChange}
          />
          <CustomTextInput
            placeholder='Tipo de Dispositivo (Portatil, Video Beam, Televisor, etc) '
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
            placeholder='Descripcion'
            image={require('../../../../../assets/descripcion.png')}
            keyboardType='default'
            property='descripcion'
            value={descripcion}
            onChangeText={onChange}
          />
          <View style={Styles.buttonContainer}>
          <RoundedButton
              text='Registrar Dispositivo'
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
 */