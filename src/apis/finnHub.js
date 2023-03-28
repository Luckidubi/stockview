import axios from "axios";

const TOKEN = "cggtre9r01qv7vi3jh1gcggtre9r01qv7vi3jh20"

export default axios.create({
  baseURL: "https://finnhub.io/api/v1",
  params: {
    token : TOKEN
  }
});
