import React, {useState, useEffect, useContext} from 'react'
import { LoginAuthUseCase } from '../../../Domain/useCases/auth/LoginAuth';
import { SaveUserLocalUseCase } from '../../../Domain/useCases/userLocal/SaveUserLocal';
import { GetUserLocalUseCase } from '../../../Domain/useCases/userLocal/GetUserLocal';
import { useUserLocal } from '../../hooks/useUserLocal';
import { UserContext } from '../../context/UserContext';

export const HomeViewModel = () => {

    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const [values, setValues] = useState({
        email: '',
        password: '',
    });

    
    //const {user, getUserSession} = useUserLocal();
    const {user, saveUserSession} = useContext(UserContext)
    console.log('USUARIO DE SESIÓN: '+ JSON.stringify(user,null,3));
    
    
    const onChange = (property: string, value: any) => {
        setValues({...values, [property]: value});
    }
    
    const login = async () => {
      if (isValidForm()){
        setLoading(true);
        const response = await LoginAuthUseCase(values.email, values.password);
        console.log('RESPONSE: ' + JSON.stringify(response));
          if (!response.success){
            setErrorMessage(response.message);
          }
          else {
            saveUserSession(response.data);
          }

          setLoading(false);
          console.log('RESULT: ' + JSON.stringify(response));
          if (response.success) {
              saveUserSession(response.data);
          }
          else {
              setErrorMessage(response.message);
          }

      }
    }

    const isValidForm = (): boolean => {
      if (values.email === ''){
        setErrorMessage('Ingresa el correo electronico');
        return false;
      }

      if (values.password === ''){
        setErrorMessage('Ingresa la contraseña');
        return false;
      }


      return true;

    }


  return {
    ...values,
    user,
    onChange,
    login,
    errorMessage,
    loading
  }
}

export default HomeViewModel;
