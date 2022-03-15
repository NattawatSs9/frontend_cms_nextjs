import axios from "axios";
import { API } from "../api/API"
class UserService {
    static async getAllUser(){
        return await axios.get(API.USER.GETALL)
    }
    static async getUserById(payload: string){
        return await axios.get(API.USER.GET+payload)
    }
}

export default UserService;