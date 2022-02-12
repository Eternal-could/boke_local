import axios from "./config/axios.default.config";
import defaultConfig from "@/config/config.default";

class UserDetailService {
    async setLikes(args) {
        return axios.post(`${defaultConfig.baseApiUrl}/userDetail/likes`,args);
    }
    async unLikes(args) {
        return axios.delete(`${defaultConfig.baseApiUrl}/userDetail/likes/${args.blogId}`);
    }
}

export default new UserDetailService()