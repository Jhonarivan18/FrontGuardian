import { AxiosError } from "axios";
import { User } from "../../Domain/entities/User";
import { UserRepository } from "../../Domain/repositories/UserRepository";
import { ResponseGuardian } from "../sources/remote/models/ResponseGuardian";
import { ApiGuardian } from "../sources/remote/api/ApiGuardian";

export class UserRepositoryImpl implements UserRepository {

    async update(user: User): Promise<ResponseGuardian>{
        try {
            const response = await ApiGuardian.put<ResponseGuardian>('/users/update', user);
            return Promise.resolve(response.data);
            
        } catch (error) {
            let e = (error as AxiosError); 
            console.log('ERROR: ' +  JSON.stringify(e.response?.data));
            const apiError:ResponseGuardian = JSON.parse(JSON.stringify(e.response?.data));
            return Promise.resolve(apiError)
            
        }
    }

}