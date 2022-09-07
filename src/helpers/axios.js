import axios from "axios";

const baseURL = "https://api.apilayer.com/exchangerates_data";
const API_KEY = "k5pbk8yEgJpLUwJxisyuq59qAIe2Ylfv";

const headers = {
  apikey: API_KEY,
};

const axiosInstance = axios.create({
  method: "get",
  baseURL: baseURL,
  headers,
});

export default axiosInstance;
