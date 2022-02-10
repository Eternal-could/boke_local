import axios from "./config/axios.default.config";
import defaultConfig from "@/config/config.default";

class AuthorService {
    async registerUser(userData) {
        return axios.post(`${defaultConfig.baseApiUrl}/authentication/registerUser`,userData);
    }

    async checkPermission() {
        return axios.get(`${defaultConfig.baseApiUrl}/authentication/checkPermission`);
    }
}

export default new AuthorService;