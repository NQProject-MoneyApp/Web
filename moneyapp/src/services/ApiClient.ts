import axios, { Axios } from "axios";
import SessionStorage from "./SessionStorage";
import UserRepository from "./UserRepository";

class ApiClient {
  static instance: ApiClient = new ApiClient();

  private axiosInstance: Axios;

  constructor() {
    this.axiosInstance = this.createInstance();
    this.addLogoutInterceptors();
  }

  async login(username: string, password: string) {
    const requestData = {
      username: username,
      password: password,
    };
    try {
      const response = await this.axiosInstance.post<typeof requestData, any>(
        "api/login/",
        requestData
      );
      SessionStorage.instance.setToken(response.data.key);

      this.axiosInstance = this.createInstance();
      this.addLogoutInterceptors();

      return [true, response.data.key];
    } catch {
      return [false, undefined];
    }
  }

  async getGroups() {
    return await this.axiosInstance.get<any>("api/groups/");
  }

  private createInstance(): Axios {
    return axios.create({
      baseURL: process.env.REACT_APP_API_URL || "",
      timeout: 1000 * 30,
      headers: { Authorization: SessionStorage.instance.getToken() ?? "" },
    });
  }

  private addLogoutInterceptors() {
    this.axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response.status === 401) {
          UserRepository.instance.logout();
        }
        return error;
      }
    );
  }
}

export default ApiClient;
