import axios from "axios";

const server = axios.create({
    baseURL: process.env.SERVER_URI || "http://localhost:5000/api"
});

export default server;