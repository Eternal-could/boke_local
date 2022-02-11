import axios from "./config/axios.default.config";
import defaultConfig from "@/config/config.default";

class BlogService {
    async createBlog(blogData) {
        return axios.post(`${defaultConfig.baseApiUrl}/blog/create`,blogData);
    }
}

export default new BlogService()