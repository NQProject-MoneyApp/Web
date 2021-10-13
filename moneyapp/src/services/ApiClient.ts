import axios, { Axios } from "axios";
import SessionStorage from "./SessionStorage";
import UserRepository from "./UserRepository";
import Group from "./../domain/groups/Group";
import { Expense } from "../domain/expenses/Expense";

type SimpleResult = {
  success: boolean;
  result: any;
};

type GroupDto = {
  pk?: number,
  name?: string,
  icon?: number,
  total_cost?: number,
  user_balance?: number,
  create_date?: string,
  is_favorite?: boolean,
};

type ExpenseDto = {
  pk?: number,
  group_id?: number,
  name?: string,
  author?: any,
  amount?: number,
  create_date?: string,
}

type NetworkResponse<T> = {
  data?: T;
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

  async getGroups(): Promise<Group[]> {
    const result = await this.axiosInstance.get<
      any,
      NetworkResponse<GroupDto[]>
    >("api/groups/");
    if(result.data) {
    
      return result.data.map((e) => {
        return {
          id: e.pk!,
          name: e.name!,
          totalCost: -1,
          userBalance: e.user_balance!,
          createDate: new Date(e.create_date!),
          icon: "",
        };
      } );
    }
    return [];
  }

  async getExpenses(groupId: number): Promise<Expense[]> {
    const result = await this.axiosInstance.get<
      any,
      NetworkResponse<ExpenseDto[]>
    >(`api/${groupId}/expenses/`);
    if(result.data) {
    
      return result.data.map((e) => {
        return {
          amount: e.amount!,
          groupId: e.group_id!,
          name: e.name!,
          id: e.group_id!,
        };
      } );
    }
    return [];
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
