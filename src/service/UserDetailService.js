import axios from "./config/axios.default.config";
import defaultConfig from "@/config/config.default";

class UserDetailService {
    async setLikes(args) {
        return axios.post(`${defaultConfig.baseApiUrl}/userDetail/likes`,args);
    }
    async unLikes(args) {
        return axios.delete(`${defaultConfig.baseApiUrl}/userDetail/likes/${args.blogId}`);
    }
    async setAttentions(args) {
        return axios.post(`${defaultConfig.baseApiUrl}/userDetail/attention`,args);
    }
    async unAttentions(args) {
        return axios.delete(`${defaultConfig.baseApiUrl}/userDetail/attention/${args.userName}`);
    }
    async setBlackList(args) {
        return axios.post(`${defaultConfig.baseApiUrl}/userDetail/blacklist`,args);
    }
    async unBlackList(args) {
        return axios.delete(`${defaultConfig.baseApiUrl}/userDetail/blacklist/${args.userName}`);
    }
}

export default new UserDetailService()