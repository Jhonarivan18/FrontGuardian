import { RegistroRepositoryImpl } from "../../../Data/repositories/RegistroRepository";
import { Registro } from "../../entities/Registro";
const { RegistroUpdate } = new RegistroRepositoryImpl();

export const UpdateRegistroUseCase = async (registro: Registro) => {
    return await RegistroUpdate(registro);
}