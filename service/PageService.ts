import axios from "axios"
import { API } from "../api/API"
class PageService {
    static async getAllPosts(){
        console.log(API.PAGE.GETALL)
        return await axios.get(API.PAGE.GETALL)
    }
    static async getPostById(payload: string){
        return await axios.get(API.PAGE.GET+payload)
    }
}

export default PageService