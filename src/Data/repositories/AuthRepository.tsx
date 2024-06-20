import { AxiosError } from "axios";
import { User } from "../../Domain/entities/User";
import { AuthRepository } from "../../Domain/repositories/AuthRepository";
import { ApiGuardian } from "../sources/remote/api/ApiGuardian";
import { ResponseGuardian } from "../sources/remote/models/ResponseGuardian";

export class AuthRepositoryImpl implements AuthRepository {
    async register(user: User): Promise<ResponseGuardian>{
        try {
            const response = await ApiGuardian.post<ResponseGuardian>('/users/create', user);
            return Promise.resolve(response.data);
            
        } catch (error) {
            let e = (error as AxiosError); 
            console.log('ERROR: ' +  JSON.stringify(e.response?.data,null,3));
            const apiError:ResponseGuardian = JSON.parse(JSON.stringify(e.response?.data));
            return Promise.resolve(apiError)
            
        }
    }   

    async login(email: string, password: string): Promise<ResponseGuardian>{
        try {
            const response = await ApiGuardian.post<ResponseGuardian>('/users/login', {
                email: email,
                password: password
            });
            return Promise.resolve(response.data);
            
        } catch (error) {
            let e = (error as AxiosError); 
            console.log('ERROR: ' +  JSON.stringify(e.response?.data));
            const apiError:ResponseGuardian = JSON.parse(JSON.stringify(e.response?.data));
            return Promise.resolve(apiError)
            
        }
    }
}