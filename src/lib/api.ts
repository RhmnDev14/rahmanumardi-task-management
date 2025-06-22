import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/taskmanagement",
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
