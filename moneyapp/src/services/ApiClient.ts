import axios, { Axios } from "axios";
import SessionStorage from "./SessionStorage";
import UserRepository from "./UserRepository";

type SimpleResult = {
  success: boolean;
  result: any;
};

class ApiClient {
  static instance: ApiClient = new ApiClient();

  private axiosInstance: Axios;

  constructor() {
    this.axiosInstance = this.createInstance();
    this.addLogoutInterceptors();
  }

  async login(username: string, password: string): Promise<SimpleResult> {
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

      return { success: true, result: response.data };
    } catch {
      return { success: false, result: null };
    }
  }

  async getGroups() {
    return await this.axiosInstance.get<any>("api/groups/");
  }

  async updateUserProfile(username: string, pk: number, email: string): Promise<SimpleResult> {
    try {
      const response = await this.axiosInstance.patch<any>("api/user/", {
        username: username,
        email: email,
        pk: pk
      });
      return { success: true, result: response.data };
    } catch {
      return { success: false, result: null };
    }
  }

  async getUserProfile(): Promise<SimpleResult> {
    try {
      const response = await this.axiosInstance.get<any>("api/user/");
      return { success: true, result: response.data };

    } catch {
      return { success: false, result: null };
    }
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
export type {SimpleResult}
