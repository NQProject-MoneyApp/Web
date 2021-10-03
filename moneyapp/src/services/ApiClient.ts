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
      const response = await this.axiosInstance.post<typeof requestData, any>(
        "api/login/",
        requestData
      );
      console.log(response);
      console.log(response.data.key);
      this.axiosInstance = axios.create({
        baseURL: process.env.REACT_APP_API_URL || "",
        timeout: 1000,
        headers: { Authorization: `Token ${response.data.key}` },
      });
    } catch {
      return false;
    }
    return true;
  }

  static async getGroups() {
      return await this.axiosInstance.get<any>("api/groups/");
  }
}

export default ApiClient;
