import axios from "axios";

const instance = axios.create({
    baseURL:"https://frontend-mentor-apis-6efy.onrender.com"
})

export default instance;