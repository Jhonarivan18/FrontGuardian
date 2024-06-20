import { AxiosError } from "axios";
import { Registro } from "../../Domain/entities/Registro";
import { RegistroRepository } from "../../Domain/repositories/RegistroRepository";
import { ApiGuardian } from "../sources/remote/api/ApiGuardian";
import { ResponseGuardian } from "../sources/remote/models/ResponseGuardian";

export class RegistroRepositoryImpl implements RegistroRepository {

    async getAll(): Promise<Registro[]> {
        try {
            const response = await ApiGuardian.get<Registro[]>('/registro/getAll');
            console.log('REGISTROS: '+ JSON.stringify(response.data,null,3));
            return Promise.resolve(response.data);
            
        } catch (error) {
            let e = (error as AxiosError); 
            console.log('ERROR: ' +  JSON.stringify(e.response?.data));
            return Promise.resolve([])
            
        }
    }
        
    async create(registro: Registro): Promise<ResponseGuardian> {
        try {
            const response = await ApiGuardian.post<ResponseGuardian>('/registro/create', registro);
            return Promise.resolve(response.data);
            
        } catch (error) {
            let e = (error as AxiosError); 
            console.log('ERROR: ' +  JSON.stringify(e.response?.data));
            const apiError:ResponseGuardian = JSON.parse(JSON.stringify(e.response?.data));
            return Promise.resolve(apiError)
            
        }
    }

    async remove(id: string): Promise<ResponseGuardian> {
        try {
            const response = await ApiGuardian.delete<ResponseGuardian>(`/registro/delete/${id}`);
            return Promise.resolve(response.data);
        } catch (error) {
            let e = (error as AxiosError); 
            console.log('ERROR: ' +  JSON.stringify(e.response?.data));
            const apiError:ResponseGuardian = JSON.parse(JSON.stringify(e.response?.data));
            return Promise.resolve(apiError)
        }
    }

    async RegistroUpdate(registro: Registro): Promise<ResponseGuardian>{
        try {
            const response = await ApiGuardian.put<ResponseGuardian>('/registro/update', registro);
            return Promise.resolve(response.data);
            
        } 
        catch (error) {
            let e = (error as AxiosError); 
            console.log('ERROR: ' +  JSON.stringify(e.response?.data));
            const apiError:ResponseGuardian = JSON.parse(JSON.stringify(e.response?.data));
            return Promise.resolve(apiError)           
        }
    }
}

