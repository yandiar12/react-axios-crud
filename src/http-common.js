import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:2000/api",
  headers: {
    "Content-type": "application/json"
  }
});