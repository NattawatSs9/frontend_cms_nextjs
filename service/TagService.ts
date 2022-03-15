import axios from "axios"
import { API } from "../api/API"
class TagService {
    static async getAllTags(){
        return await axios.get(API.TAG.GETALL)
    }
    static async getTagById(payload: string){
        return await axios.get(API.TAG.GET+payload)
    }
}

export default TagService