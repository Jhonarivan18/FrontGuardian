import { RegistroLocalRepositoryImpl } from "../../../Data/repositories/RegistroLocalRepository";

const {getRegistro} = new RegistroLocalRepositoryImpl();

export const GetRegistroLocalUseCase = async () => {
    
    return await getRegistro();

}