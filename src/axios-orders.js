import axios from "axios"

const instance = axios.create({
    baseURL: "https://burger-builder-react-2000.firebaseio.com/"
})

export default instance