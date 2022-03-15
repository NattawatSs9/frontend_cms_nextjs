import axios from "axios"
import { API } from "../api/API"
class PostService {
    static async getAllPosts(){
        return await axios.get(API.POST.GETALL)
        
    }
    static async getPostById(payload: string){
        return await axios.get(API.POST.GET+payload)
    }
}

export default PostService