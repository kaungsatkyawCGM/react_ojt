import axios from "axios";

export default axios.create({
    baseURL: "https://api.exchangerate.host/",
    //prevent data from caching
    params: {
        timestamp: new Date().getTime()
    }
})