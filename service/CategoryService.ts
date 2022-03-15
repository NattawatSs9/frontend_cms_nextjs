import axios from "axios"
import { API } from "../api/API"
class CategoryService {
    static async getAllPosts(){
        return await axios.get(API.CATEGORY.GETALL)
    }
    static async getPostById(payload: string){
        return await axios.get(API.CATEGORY.GET+payload)
    }
}

export default CategoryService