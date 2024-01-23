import axios from 'axios'

class BlogsService {
    getAllBlogs () {
        return axios({
            url: '/blogs',
            method: 'GET'
        })
    }

    createBlog (newBlog) {
        return axios({
            url: '/blogs',
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            data: JSON.stringify(newBlog)
        })
    }

    modifyBlog (id, title, content) {
        return axios({
            url: `/blogs/${id}`,
            method: 'PUT',
            params: {title, content}
        })
    }

    deleteBlog (id) {
        return axios({
            url: `/blogs/${id}`,
            method: 'DELETE'
        })
    }
}

export default new BlogsService()