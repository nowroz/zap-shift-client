import axios from "axios";

const secureInstance = axios.create({
  baseURL: "http://localhost:3000",
});

const useAxiosSecureInstance = () => {
  return secureInstance;
};

export default useAxiosSecureInstance;
