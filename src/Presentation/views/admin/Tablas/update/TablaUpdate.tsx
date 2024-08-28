import React, {useEffect} from 'react'
import { ActivityIndicator, ScrollView, Text, ToastAndroid, View } from 'react-native';
import { RoundedButton } from '../../../../components/RoundedButton';
import useViewModel from './ViewModel';
import { CustomTextInput } from '../../../../components/CustomTextInput';
import Styles from './Styles'
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../../../App';
import DropDownComponent from '../../../../components/DropDown';
import { tiposDocumento } from '../../../../components/data';

///validar datos del dispositivos creacion vacia

interface Props extends StackScreenProps<RootStackParamList, 'TablaUpdateScreen'>{};

export const TablaUpdateScreen = ({navigation,route}: Props) => {

    const registro = route.params?.registro;

    const { name, lastname, telefono, tipoDocumento, documento, dispositivo, marca, color, serial, descripcion, loading, errorMessage,successMessage, update, onChange, onChangeTablaUpdate}=useViewModel(registro);

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
      onChangeTablaUpdate(registro?.name || '',
         registro?.lastname  || '',
          registro?.telefono || '',
           registro?.tipoDocumento || '',
            registro?.documento || '',
             registro?.dispositivo || '', 
             registro?.marca || '',
              registro?.color || '',
               registro?.serial || '',
            registro?.descripcion || '') 
    }, [registro])

    

    return ( 
      <ScrollView>
        
      <View style={Styles.form}>
      <Text style={{fontWeight: 'bold', fontSize: 18, marginTop: 20, textAlign: 'center'}}>DATOS DEL PROPIETARIO</Text>
   
        <CustomTextInput
          placeholder='Nombre'
          image={require('../../../../../../assets/usuario.png')}
          keyboardType='default'
          property='name'
          value={name}
          onChangeText={onChange}
        />
        <CustomTextInput
          placeholder='Apellido'
          image={require('../../../../../../assets/usuario.png')}
          keyboardType='default'
          property='lastname'
          value={lastname}
          onChangeText={onChange}
        />
        <CustomTextInput
          placeholder='Telefono'
          image={require('../../../../../../assets/telefono.png')}
          keyboardType='numeric'
          property='telefono'
          value={telefono}
          onChangeText={onChange}
        />
        <DropDownComponent 
          image={require('../../../../../../assets/documento.png')}
          label="Tipo de documento"
          items={tiposDocumento}
          value={tipoDocumento}
          onValueChange={(value) => onChange('tipoDocumento', value)}
        />
        <CustomTextInput
          placeholder='Documento'
          image={require('../../../../../../assets/documento.png')}
          keyboardType='numeric'
          property='documento'
          value={documento}
          onChangeText={onChange}
        />
         <Text style={{fontWeight: 'bold', fontSize: 18, marginTop: 20, textAlign: 'center'}}>DATOS DEL DISPOSITIVO</Text>
   
        <CustomTextInput
          placeholder='Tipo de Dispositivo'
          image={require('../../../../../../assets/dispositivos.png')}
          keyboardType='default'
          property='dispositivo'
          value={dispositivo}
          onChangeText={onChange}
        />
        <CustomTextInput
          placeholder='Marca'
          image={require('../../../../../../assets/marca.png')}
          keyboardType='default'
          property='marca'
          value={marca}
          onChangeText={onChange}
        />
        <CustomTextInput
          placeholder='Color'
          image={require('../../../../../../assets/color.png')}
          keyboardType='default'
          property='color'
          value={color}
          onChangeText={onChange}
        />
        <CustomTextInput
          placeholder='Serial'
          image={require('../../../../../../assets/serial.png')}
          keyboardType='default'
          property='serial'
          value={serial}
          onChangeText={onChange}
        />
        <CustomTextInput
          placeholder='Observación'
          image={require('../../../../../../assets/descripcion.png')}
          keyboardType='default'
          property='descripcion'
          value={descripcion}
          onChangeText={onChange}
        />
        <View style={Styles.buttonContainer}>
          <RoundedButton
            text='ACTUALIZAR REGISTRO'
            onPress={() => update()}
          />
        </View>
        {loading && <ActivityIndicator style={Styles.loading} size="large" color='blue' />}
      </View>
    </ScrollView>
        )
    };
