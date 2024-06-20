import React, { useContext, useState } from 'react'
import { RegisterAuthUseCase } from '../../../Domain/useCases/auth/RegisterAuth';
import { SaveUserLocalUseCase } from '../../../Domain/useCases/userLocal/SaveUserLocal';
import { useUserLocal } from '../../hooks/useUserLocal';
import { UserContext } from '../../context/UserContext';




const RegisterViewModel = () =>{
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const { saveUserSession } = useContext (UserContext)

    const [values, setValues] = useState({
        name: '',
        lastname: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [loading, setLoading] = useState(false);
    const { user, getUserSession } = useUserLocal();


    const onChange = (property: string, value: any) => {
        setValues({...values, [property]: value})
    }

    const register = async () =>{
        if (isValidForm()) {
            setLoading(true);
            const response = await RegisterAuthUseCase(values);
            console.log('RESULT: ' + JSON.stringify(response));   
            if (response.success) {
                await SaveUserLocalUseCase(response.data);
                getUserSession();
            } 
            else {
                setErrorMessage(response.message);
            }

            setLoading(false);
            console.log('RESULT: ' + JSON.stringify(response));
            if (response.success) {
                saveUserSession(response.data);
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
        if (values.email === '') {
            setErrorMessage('Ingresa el correo electronico');
            return false;
        }
        if (values.phone === '') {
            setErrorMessage('Ingresa el numero de telefono');
            return false;
        }
        if (values.password === '') {
            setErrorMessage('Ingresa la contraseña');
            return false;
        }
        if (values.confirmPassword === '') {
            setErrorMessage('Ingresa la confirmacion de la contraseña');
            return false;
        }
        if (values.password !== values.confirmPassword){
            setErrorMessage('Las contraseñas no coinciden');
            return false;
        }

        return true;

    }   

    return{
    ...values,
    onChange,
    register,
    errorMessage,
    successMessage,
    loading,
    user
    }
}

export default RegisterViewModel;
