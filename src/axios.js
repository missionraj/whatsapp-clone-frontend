import axios from 'axios';

const instance = axios.create({
    // baseURL : 'http://localhost:9000',
    baseURL : 'https://whatsapp-node-backend.herokuapp.com'
})

export default instance;