import { Registro } from '../../Domain/entities/Registro';
import { ResponseGuardian } from '../../Data/sources/remote/models/ResponseGuardian';
import { createContext, useEffect, useState } from "react";
import { SaveRegistroLocalUseCase } from "../../Domain/useCases/registroLocal/SaveRegistroLocal";
import { GetRegistroLocalUseCase } from "../../Domain/useCases/registroLocal/GetRegistroLocal";
import { RemoveRegistroLocalUseCase } from "../../Domain/useCases/registroLocal/RemoveRegistroLocal"
import { UpdateRegistroUseCase } from '../../Domain/useCases/registro/UpdateRegistro';

export const registroInitialState: Registro = {
    id: '',
    name: '',
    lastname: '',
    telefono: '',
    tipoDocumento: '',
    documento: '',
    dispositivo: '',
    marca: '',
    color: '',
    serial: '',
    descripcion: '',
    created_at: '',
    updated_at: '',
}

export interface RegistroContextProps {
    registro: Registro;
    RegistroUpdate:(registro:Registro) => Promise<ResponseGuardian>;


    saveRegistroSession: (registro: Registro) => Promise<void>;
    getRegistroSession: () => Promise<void>;
    removeRegistroSession: () => Promise<void>;

    /*  PROBAR METOOD UPDATE ASYNC
    updateRegistroContext: (registro: Registro) => void; */
}

export const RegistroContext = createContext({} as RegistroContextProps);

export const RegistroProvider = ({ children }: any) => {

    const [registro, setRegistro] = useState(registroInitialState);

    useEffect(() => {
        getRegistroSession();
    }, [])

    const saveRegistroSession = async (registro: Registro) => {
        await SaveRegistroLocalUseCase(registro);
        setRegistro(registro);
    }

    const getRegistroSession = async () => {
        const registro = await GetRegistroLocalUseCase();
        setRegistro(registro);
    }

    const removeRegistroSession = async () => {
        await RemoveRegistroLocalUseCase();
        setRegistro(registroInitialState);
    }
//   INICIO NO SE LEE
    const updateRegistroContext = async (registro: Registro) => { // Implementación del método actualizar
        
        setRegistro(registro);
    }
//   FIN

    const RegistroUpdate = async(registro: Registro): Promise<ResponseGuardian> => {
        const response = await UpdateRegistroUseCase(registro);
    return response;
    }





    return (
        <RegistroContext.Provider value={{
            registro,
            saveRegistroSession,
            getRegistroSession,
            removeRegistroSession,
            RegistroUpdate





            /* updateRegistroContext */ // Agregar el nuevo método al contexto
        }}>
            {children}
        </RegistroContext.Provider>
    )
}
