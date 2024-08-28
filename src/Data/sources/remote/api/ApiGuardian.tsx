import axios from "axios";
import { LocalStorage } from "../../local/LocalStorage";
import { User } from "../../../../Domain/entities/User";

const ApiGuardian = axios.create({
    baseURL: 'http://192.168.1.57:3000/api',
    headers: {
        'content-type': 'application/json'
    }
})

ApiGuardian.interceptors.request.use(
    async(config) => {
        const data = await LocalStorage().getItem('user');
        if (data) {
            const user: User = JSON.parse(data as any);
            config.headers!['Authorization'] = user.session_token!
        }
        return config;
    }
);

export { ApiGuardian }