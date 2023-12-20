import axios from 'axios'

class BlogsService {
    getAllBlogs() {
        return axios.get('http://localhost:8181/api/v1/blogs')
    }
}

export default new BlogsService()