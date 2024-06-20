import { Registro } from '../entities/Registro';
import { ResponseGuardian } from '../../Data/sources/remote/models/ResponseGuardian';

export interface RegistroRepository {
    getAll(): Promise<Registro[]>;
    create(registro: Registro): Promise<ResponseGuardian>;
    remove(id: string): Promise<ResponseGuardian>;
    RegistroUpdate(registro: Registro): Promise<ResponseGuardian>;
}