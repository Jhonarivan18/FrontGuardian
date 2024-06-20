import { RegistroLocalRepositoryImpl } from "../../../Data/repositories/RegistroLocalRepository";

const { remove } = new RegistroLocalRepositoryImpl();

export const RemoveRegistroLocalUseCase = async () => {
    
    return await remove();

}