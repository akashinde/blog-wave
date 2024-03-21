import axios, { AxiosInstance } from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8181/api/v1',
    withCredentials: true,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default class Api {
    api: AxiosInstance

    constructor () {
        this.api = api
    }

    baseURL () {
        return `${this.api.defaults.baseURL}`
    }

    async get<T> (url) {
        const response = await this.api.get<T>(url)
        return response.data
    }
    
    async put<T> (url, data) {
        const response = await this.api.put<T>(url, data)
        return response.data
    }

    async post<T> (url, data) {
        const response = await this.api.post<T>(url, data)
        return response.data
    }

    async delete<T> (url, config?) {
        const response = await this.api.delete<T>(url, config)
        return response.data
    }
}