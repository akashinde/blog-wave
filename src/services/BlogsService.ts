import axios from "axios";

class BlogsService {
  baseURL = 'blogs'

  getAllBlogs() {
    return axios({
      url: this.baseURL,
      method: "GET",
    });
  }

  createBlog(newBlog) {
    return axios({
      url: this.baseURL,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify(newBlog),
    });
  }

  modifyBlog(id, title, content) {
    return axios({
      url: `${this.baseURL}/${id}`,
      method: "PUT",
      params: { title, content },
    });
  }

  deleteBlog(id) {
    return axios({
      url: `${this.baseURL}/${id}`,
      method: "DELETE",
    });
  }
}

export default new BlogsService();
