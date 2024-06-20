import { ResponseGuardian } from "../../Data/sources/remote/models/ResponseGuardian";
import { User } from "../entities/User";

export interface UserRepository {
    update(user: User): Promise<ResponseGuardian>;   
}