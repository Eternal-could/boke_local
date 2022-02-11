import axios from "./config/axios.default.config";
import defaultConfig from "@/config/config.default";

class BlogService {
    async createBlog(blogData) {
        return axios.post(`${defaultConfig.baseApiUrl}/blog/create`,blogData);
    }
    async getPublicBlog(args) {
        return axios.get(`${defaultConfig.baseApiUrl}/blog/getPublicBlog`,{
            params: args
        });
    }
}

export default new BlogService()