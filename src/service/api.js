import axios from "axios";

export default () => {
    return axios.create({
        baseURL: process.env.VUE_APP_API,
        withCredentials: false,
        headers: {
            Accept: "*/*",
            "Content-type": "application/json",
        },
    });
};
