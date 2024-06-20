import React,{useEffect,useState} from 'react';
import { Registro } from '../../Domain/entities/Registro';
import { GetRegistroLocalUseCase } from '../../Domain/useCases/registroLocal/GetRegistroLocal';

export const useRegistroLocal = () => {
    const [registro, setRegistro] = useState<Registro>()
    useEffect(() => {
        getRegistroSession();
        
      }, [])
  
      const getRegistroSession = async() => {
        const registro = await GetRegistroLocalUseCase();
        setRegistro(registro);        
      }
    
  return {
    registro, 
    getRegistroSession
  }
}