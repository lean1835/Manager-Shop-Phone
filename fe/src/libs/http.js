import axios from "axios";

const http = axios.create({
  baseURL: "https://manager-shop-phone.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default http;