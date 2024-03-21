import axios from 'axios';
import Api from '@/services/Api'

class AuthorService {
  url = '/authors'

  async getAllAuthors() {
    // const api = new Api()
    // console.log(api.baseURL())
    // const response = await api.get(this.url)
    // return response
    return axios({
      url: this.url,
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });
  }

  // createAuthor(newAuthor) {
  //   return axios({
  //     url: this.url,
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     data: JSON.stringify(newAuthor),
  //   });
  // }
}

export default new AuthorService();
