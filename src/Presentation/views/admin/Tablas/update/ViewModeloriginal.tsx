/* import React, { useContext, useState } from 'react'
import { Registro } from '../../../../../Domain/entities/Registro';
import { UpdateRegistroUseCase } from '../../../../../Domain/useCases/registro/UpdateRegistro';
import { SaveRegistroLocalUseCase } from '../../../../../Domain/useCases/registroLocal/SaveRegistroLocal';
import { RegistroContext } from '../../../../context/RegistroContextOriginal';


const TablaUpdateViewModel = (registro: Registro) => {
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [values, setValues] = useState(registro);
    const [loading, setLoading] = useState(false);
    const { saveRegistroSession } = useContext (RegistroContext)


    const onChange = (property: string, value: any) => {
        setValues({...values, [property]: value})
    }

    const onChangeTablaUpdate = (name: string, lastname: string, telefono: string, tipoDocumento: string, documento: string, dispositivo: string, marca: string, color: string, serial: string,descripcion: string) => {
        setValues({...values, name, lastname, telefono, tipoDocumento, documento, dispositivo, marca, color, serial, descripcion})
    }

    const RegistroUpdate = async () =>{
        if (isValidForm()) {
            setLoading(true);
            const response = await UpdateRegistroUseCase(values);
            console.log('RESULT: ' + JSON.stringify(response));   
            if (response.success) {
                await SaveRegistroLocalUseCase(response.data);
            } 
            else {
                setErrorMessage(response.message);
            }

            setLoading(false);
            console.log('RESULT: ' + JSON.stringify(response));
            if (response.success) {
                saveRegistroSession(response.data);
                setSuccessMessage(response.message);
            }
            else {
                setErrorMessage(response.message);
            }

        }
    }
    /// Validación de campos 
    const isValidForm = (): boolean => {
        if (values.name === '') {
            setErrorMessage('Ingresa el nombre');
            return false;
        }
        if (values.lastname === '') {
            setErrorMessage('Ingresa tu apellido');
            return false;
        }

        if (values.telefono === '') {
            setErrorMessage('Ingresa el numero de telefono');
            return false;
        
        }
        if (values.tipoDocumento === '') {
            setErrorMessage('Ingresa el tipo de documento');
            return false;
        
        }
        if (values.documento === '') {
            setErrorMessage('Ingresa el documento');
            return false;
        
        }
        if (values.dispositivo === '') {
            setErrorMessage('Ingresa el dispositivo');
            return false;
        
        }
        if (values.marca === '') {
            setErrorMessage('Ingresa la marca');
            return false;
        
        }
        if (values.color === '') {
            setErrorMessage('Ingresa el color');
            return false;
        
        }
        if (values.serial === '') {
            setErrorMessage('Ingresa el serial');
            return false;
        
        }
        if (values.descripcion === '') {
            setErrorMessage('Ingresa la descripcion');
            return false;
        
        }

        return true;

    } 
    return{
        ...values,
        onChange,
        RegistroUpdate,
        onChangeTablaUpdate,
        errorMessage,
        successMessage,
        loading,
        registro
        }  
    }

export default TablaUpdateViewModel;
 */