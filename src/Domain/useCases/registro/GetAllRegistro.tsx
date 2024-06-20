import { RegistroRepositoryImpl } from "../../../Data/repositories/RegistroRepository";
const {getAll} = new RegistroRepositoryImpl();

export const GetAllRegistroUseCase = async() => {
  return await getAll();
}
