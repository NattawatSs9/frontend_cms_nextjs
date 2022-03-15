import axios from "axios";
import { API } from "../api/API";
import { postcomment } from "../types/comment";
class CommentService {
  static async getAllPosts() {
    return await axios.get(API.COMMENT.GETALL);
  }
  static async getPostById(payload: string) {
    return await axios.get(API.COMMENT.GET + payload);
  }
  static async createComment(payload : postcomment) {
      let obj = {
          author_name: payload.author_name,
          content: payload.content,
          post: payload.post
      }
    return await axios.post(API.COMMENT.CREATE, obj, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Basic ZnN3ZDpmc3dkLWNtcw=="
      },
    });
  }
}

export default CommentService;
