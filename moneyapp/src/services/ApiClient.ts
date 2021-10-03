import axios, { Axios } from "axios";

class ApiClient {
  private static axiosInstance: Axios = axios.create({
    baseURL: process.env.REACT_APP_API_URL || "",
    timeout: 1000,
  });

  static async login(username: string, password: string) {
    const requestData = {
      username: username,
      password: password,
    };

    try {
      await this.axiosInstance.post("api/login/", requestData);
    } catch {
      return false;
    }
    return true;
  }
}

export default ApiClient;
