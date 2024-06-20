import { RegistroLocalRepositoryImpl } from "../../../Data/repositories/RegistroLocalRepository";
import { Registro } from "../../entities/Registro";

const { save } = new RegistroLocalRepositoryImpl();

export const SaveRegistroLocalUseCase = async (registro: Registro) => {
    
    return await save(registro);

}