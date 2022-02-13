import axios from "./config/axios.default.config";
import defaultConfig from "@/config/config.default";

class TipOffService {
    async tipBlog(data) {
        return axios.post(`${defaultConfig.baseApiUrl}/tipOff/article`,data);
    }
}

export default new TipOffService()