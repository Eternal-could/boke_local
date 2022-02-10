import axios from "axios";
import defaultConfig from "@/config/config.default";

class AuthorService {
    async registerUser(userData) {
        return axios.post(`${defaultConfig.baseApiUrl}/authentication/registerUser`,userData);
    }
}

export default new AuthorService;