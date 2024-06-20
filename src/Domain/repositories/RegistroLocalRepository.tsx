import { Registro } from "../entities/Registro";
///  verificar creo no se estan tomando estos metodos

export interface RegistroLocalRepository {

    save(registro: Registro): Promise<void>;
    getRegistro(): Promise<Registro>;
    remove(): Promise<void>;
  
}