import React, { useContext, useState } from 'react';
import { Registro } from '../../../../../Domain/entities/Registro';
import { UpdateRegistroUseCase } from '../../../../../Domain/useCases/registro/UpdateRegistro';
import { SaveRegistroLocalUseCase } from '../../../../../Domain/useCases/registroLocal/SaveRegistroLocal';
import { RegistroContext } from '../../../../context/RegistroContext';

const TablaUpdateViewModel = (registro: Registro) => {
    const [values, setValues] = useState(registro);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const { RegistroUpdate } = useContext(RegistroContext);

    const onChange = (property: string, value: any) => {
        setValues({...values, [property]: value})
    }

    const onChangeTablaUpdate = (name: string, lastname: string, telefono: string, tipoDocumento: string, documento: string, dispositivo: string, marca: string, color: string, serial: string,descripcion: string) => {
        setValues({...values, name, lastname, telefono, tipoDocumento, documento, dispositivo, marca, color, serial, descripcion})
    }

    const update = async () => {
        if (isValidForm()) {
            setLoading(true);
            const response = await UpdateRegistroUseCase(values);
            console.log('LOG RESULT:', response); 
            if (response.success) {
                await SaveRegistroLocalUseCase(response.data);
                setSuccessMessage(response.message);
            } else {
                setErrorMessage(response.message);
            }
            setLoading(false);
        }
    }

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

    return {
        ...values,
        onChange,
        onChangeTablaUpdate,
        RegistroUpdate,
        update,
        errorMessage,
        successMessage,
        loading,
        registro
    }
}

export default TablaUpdateViewModel;


/* import React, { useContext, useState } from 'react'
import { AdminRegistroScreen } from '../../Dispositivos/RegistroDispositivos';
import { CreateRegistroUseCase } from '../../../../../Domain/useCases/registro/CreateRegistro';
import { useUserLocal } from '../../../../hooks/useUserLocal';
import { RegistroContext } from '../../../../context/RegistroContext';
import { SaveRegistroLocalUseCase } from '../../../../../Domain/useCases/registroLocal/SaveRegistroLocal';

const AdminRegistroViewModel = () => {

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const {saveRegistroSession} = useContext (RegistroContext)

    const [values, setValues] = useState({
        name: '',
        lastname: '',
        telefono: '',
        tipoDocumento: '',
        documento:'',
        dispositivo:'',
        marca:'',
        color:'',
        serial:'',
        descripcion:''
    });

    const [responseMessage, setResponseMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const { registro, getRegistroSession } = ();

    const onChange = (property: string, value: any) => {
        setValues({...values, [property]: value});
    }

    const CreateRegistro = async () => {
    if (isValidForm()) {
        setLoading(true);
        const response = await CreateRegistroUseCase(values as any);
        console.log('RESULT: ' + JSON.stringify(response)); 
        if (response.success) {
            await SaveRegistroLocalUseCase(response.data);
            getRegistroSession();
        } 

        else {
            setErrorMessage(response.message);
        }

        setLoading(false);
        setResponseMessage(response.message);
        resetForm();
        console.log('RESULT: ' + JSON.stringify(response));
        if (response.success) {
            setSuccessMessage(response.message);
        }
        else {
            setErrorMessage(response.message);
        }

    }

    }

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
            setErrorMessage('Ingresa el telefono');
            return false;
        }
        if (values.tipoDocumento === '') {
            setErrorMessage('Ingresa el tipo de Documento');
            return false;
        }
        if (values.documento === '') {
            setErrorMessage('Ingresa el Documento');
            return false;
        }
        if (values.dispositivo === '') {
            setErrorMessage('Ingresa el Dispositivo');
            return false;
        }
        if (values.marca === '') {
            setErrorMessage('Ingresa la Marca');
            return false;
        }
        if (values.color === '') {
            setErrorMessage('Ingresa el Color');
            return false;
        }
        if (values.serial === '') {
            setErrorMessage('Ingresa el Serial');
            return false;
        }
        if (values.descripcion === '') {
            setErrorMessage('Ingresa la Descripcion');
            return false;
        }
        return true;

    }   

    const resetForm = async () => {
        setValues({
        name: '',
        lastname: '',
        telefono: '',
        tipoDocumento: '',
        documento:'',
        dispositivo:'',
        marca:'',
        color:'',
        serial:'',
        descripcion:''
        })
    }


     return {
        ...values,
        loading,
        errorMessage,
        successMessage,
        responseMessage,
        registro,
        onChange,
        CreateRegistro
  }
}

export default AdminRegistroViewModel;

 */

