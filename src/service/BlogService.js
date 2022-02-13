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

    async getBlogById(args) {
        return axios.get(`${defaultConfig.baseApiUrl}/blog/getBlogDetailById`,{
            params: args
        });
    }

    async createBlogComment(data) {
        return axios.post(`${defaultConfig.baseApiUrl}/blog/comment/create`,data);
    }

    async getMyBlog(args) {
        return axios.get(`${defaultConfig.baseApiUrl}/blog/getMyBlog`,{
            params: args
        });
    }

    async getMyLikeBlog(args) {
        return axios.get(`${defaultConfig.baseApiUrl}/blog/getMyLikeBlog`, {
            params: args
        })
    }

}

export default new BlogService()