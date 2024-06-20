import { Registro } from '../../Domain/entities/Registro';
import { RegistroLocalRepository } from '../../Domain/repositories/RegistroLocalRepository';
import { LocalStorage } from '../sources/local/LocalStorage';
 

export class RegistroLocalRepositoryImpl implements RegistroLocalRepository{

    async save(registro: Registro): Promise<void> {
        const { save } = LocalStorage();
        await save('registro', JSON.stringify(registro));

    }

    async getRegistro(): Promise<Registro> {

        const { getItem } = LocalStorage();
        const data = await getItem('registro');
        const registro: Registro = JSON.parse(data as any);
        return registro;
        
    }

    async remove(): Promise<void> {
        const { remove } = LocalStorage();
        await remove('registro');
    }

}