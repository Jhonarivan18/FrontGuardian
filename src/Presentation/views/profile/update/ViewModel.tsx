import React, { useState, useContext } from 'react'
import { SaveUserLocalUseCase } from '../../../../Domain/useCases/userLocal/SaveUserLocal';
import { UpdateUserUseCase } from '../../../../Domain/useCases/user/UpdateUser';
import { User } from '../../../../Domain/entities/User';
import { UserContext } from '../../../context/UserContext';

const ProfileUpdateViewModel = (user: User) =>{
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [values, setValues] = useState(user);
    const [loading, setLoading] = useState(false);
    const { saveUserSession } = useContext (UserContext)


    const onChange = (property: string, value: any) => {
        setValues({...values, [property]: value})
    }

    const onChangeInfoUpdate = (name: string, lastname: string, phone: string) => {
        setValues({...values, name, lastname, phone})
    }

    const update = async () =>{
        if (isValidForm()) {
            setLoading(true);
            const response = await UpdateUserUseCase(values);
            console.log('RESULT: ' + JSON.stringify(response));   
            if (response.success) {
                await SaveUserLocalUseCase(response.data);
                //getUserSession();
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

        if (values.phone === '') {
            setErrorMessage('Ingresa el numero de telefono');
            return false;
        
        }

        return true;

    }   

    return{
    ...values,
    onChange,
    update,
    onChangeInfoUpdate,
    errorMessage,
    successMessage,
    loading,
    user
    }
}

export default ProfileUpdateViewModel;
