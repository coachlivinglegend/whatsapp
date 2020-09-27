import axios from 'axios'

let baseURL = "http://localhost:5000"

if (process.env.NODE_ENV === 'production') {
    baseURL = "/"
}

const instance = axios.create({
    baseURL: baseURL
})

export default instance