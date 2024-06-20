/* import React, { createContext, useEffect, useState} from "react";
import { Registro } from "../../Domain/entities/Registro";
import { SaveRegistroLocalUseCase } from "../../Domain/useCases/registroLocal/SaveRegistroLocal";
import { GetRegistroLocalUseCase } from "../../Domain/useCases/registroLocal/GetRegistroLocal";
import { RemoveRegistroLocalUseCase } from "../../Domain/useCases/registroLocal/RemoveRegistroLocal";

//
import { UpdateRegistroUseCase } from "../../Domain/useCases/registro/UpdateRegistro";
///
import { GetAllRegistroUseCase} from "../../Domain/useCases/registro/GetAllRegistro";
import { CreateRegistroUseCase } from "../../Domain/useCases/registro/CreateRegistro"; 
import { DeleteRegistroUseCase } from "../../Domain/useCases/registro/DeleteRegistro";
import { ResponseGuardian } from "../../Data/sources/remote/models/ResponseGuardian";
//

export const registroInitialState: Registro = {
    id:           '',
    name:          '',
    lastname:      '',
    telefono:      '',
    tipoDocumento: '',
    documento:     '',
    dispositivo:   '',
    marca:         '',
    color:         '',
    serial:        '',
    descripcion:   '',
    created_at:    '',
    updated_at:    ''
}

/// toca comentar toda este bloque de codigo
export interface RegistroContextProps {
    registro: Registro;
    getAll(): Promise<Registro[]>;
    create(registro: Registro): Promise<ResponseGuardian>;
    remove(id: string): Promise<ResponseGuardian>;
    RegistroUpdate(registro: Registro): Promise<ResponseGuardian>;    
}  

export const RegistroContext = createContext ({} as RegistroContextProps);

export const RegistroProvider = ({children}: any) => {

    const [registro, setRegistro] = useState(registroInitialState);
}
    const getAll = async() => {
        const result = await GetAllRegistroUseCase();
        console.log('REGISTROS: '+ JSON.stringify(result));
        setRegistros(result);
    }



    
    const RegistroUpdate = async(registro: Registro): Promise<ResponseGuardian> => {
        const response = await UpdateRegistroUseCase(registro);
    return response;
   }

 */
/* 
export interface RegistroContextProps {
    registro: Registro;
    saveRegistroSession: (registro: Registro) => Promise<void>;
    getRegistroSession: () => Promise<void>;
    removeRegistroSession: () => Promise<void>;

    
}  

export const RegistroContext = createContext ({} as RegistroContextProps);

export const RegistroProvider = ({children}: any) => {

    const [registro, setRegistro] = useState(registroInitialState);

    useEffect(() => {
        getRegistroSession();
        
      }, [])

    const saveRegistroSession = async (registro: Registro) => {
        await SaveRegistroLocalUseCase(registro);
        setRegistro(registro);
    }

    const getRegistroSession = async() => {
        const registro = await GetRegistroLocalUseCase();
        setRegistro(registro);        
      }

    const removeRegistroSession = async () => {
        await RemoveRegistroLocalUseCase();
        setRegistro(registroInitialState);
    }

    return (
        <RegistroContext.Provider value={{
            registro,
            saveRegistroSession,
            getRegistroSession,
            removeRegistroSession
        }}>
            { children }
        </RegistroContext.Provider>
    )
}
 */