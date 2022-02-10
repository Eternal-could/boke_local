import axios from "axios";
import defaultConfig from "@/config/config.default";

class ImgFileService {
    async uploadImgFile(uploadData) {
        return axios.post(`${defaultConfig.baseApiUrl}/uploadImg`,uploadData);
    }
}

export default new ImgFileService;