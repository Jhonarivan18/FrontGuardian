import { ResponseGuardian } from '../../Data/sources/remote/models/ResponseGuardian'
import { User } from '../entities/User'


export interface AuthRepository {
    login(email: string, password: string): Promise<ResponseGuardian>
    register(user: User): Promise<ResponseGuardian>
}