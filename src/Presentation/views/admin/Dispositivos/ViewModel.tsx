import React, { useContext, useState } from 'react';
import { AdminScreenRegistroDispositivos } from './RegistroDispositivos';
import { CreateRegistroUseCase } from '../../../../Domain/useCases/registro/CreateRegistro';
import { useRegistroLocal } from '../../../hooks/useRegistroLocal';
import { RegistroContext } from '../../../context/RegistroContext';
import { SaveRegistroLocalUseCase } from '../../../../Domain/useCases/registroLocal/SaveRegistroLocal';

const AdminRegistroViewModel = () => {

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const { saveRegistroSession } = useContext(RegistroContext);

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

    const [loading, setLoading] = useState(false);
    const { registro, getRegistroSession } = useRegistroLocal();

    const onChange = (property: string, value: any) => {
        setValues({ ...values, [property]: value });
    }

    const CreateRegistro = async () => {
        if (isValidForm()) {
            
            setLoading(true);
            const response = await CreateRegistroUseCase(values as any);
            console.log('RESULT: ' + JSON.stringify(response)); 
            if (response.success) {
                await SaveRegistroLocalUseCase(response.data);
                getRegistroSession();
                resetForm();
            } else {
                setErrorMessage(response.message);
            }

            setLoading(false);
            console.log('RESULT: ' + JSON.stringify(response));
            if (response.success) {
                setSuccessMessage(response.message);
            } else {
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
        });
    }

    return {
        ...values,
        loading,
        errorMessage,
        successMessage,
        registro,
        onChange,
        CreateRegistro
    }
}

export default AdminRegistroViewModel;






/* import React, { useState } from 'react'
import { AdminScreenRegistroDispositivos } from './RegistroDispositivos';
import { CreateRegistroUseCase } from '../../../../Domain/useCases/registro/CreateRegistro';

const AdminRegistroViewModel = () => {

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

    const onChange = (property: string, value: any) => {
        setValues({...values, [property]: value});
    }

    const CreateRegistro = async () => {
        setLoading(true);
        const response = await CreateRegistroUseCase(values as any);
        setLoading(false);
        setResponseMessage(response.message);
        resetForm();
    }
 /// refresco de formulario
 
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
        onChange,
        CreateRegistro,
        responseMessage
  }
}

export default AdminRegistroViewModel; */