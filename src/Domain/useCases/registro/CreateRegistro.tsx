import { RegistroRepositoryImpl } from '../../../Data/repositories/RegistroRepository'
import { Registro } from '../../entities/Registro';
const { create } = new RegistroRepositoryImpl();

export const CreateRegistroUseCase = async (registro: Registro) => {
  return await create(registro);
}
