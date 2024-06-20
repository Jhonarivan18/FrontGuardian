import React, {useState} from 'react'
import { Registro } from '../../../../Domain/entities/Registro'
import { GetAllRegistroUseCase } from '../../../../Domain/useCases/registro/GetAllRegistro';
import { DeleteRegistroUseCase } from '../../../../Domain/useCases/registro/DeleteRegistro';
import { UpdateRegistroUseCase } from '../../../../Domain/useCases/registro/UpdateRegistro';

const AdminRegistroViewModel = () => {

  const [registros, setRegistros] = useState<Registro[]>([]);
  const [responseMessage, setResponseMessage] = useState('')


  ///creo hace falta el update de Registro para una actualización 
  const getRegistros = async() => {
    const result = await GetAllRegistroUseCase();
    console.log('REGISTROS: '+ JSON.stringify(result));
    setRegistros(result);
  }

  const deleteRegistro = async(idRegistro: string) => {
    const result = await DeleteRegistroUseCase(idRegistro);
    setResponseMessage(result.message);
    if (result.success) {
      getRegistros();
    }
  }

///  abria que crearlo aqui-----

 const RegistroUpdate = async(registro: Registro) => {
  const result = await UpdateRegistroUseCase(registro);
  console.log('REGISTROS: '+ JSON.stringify(result));
  setRegistros(result.data);
}
  return {
    registros,
    responseMessage,
    getRegistros,
    deleteRegistro,
    RegistroUpdate
  }
}

export default AdminRegistroViewModel;
