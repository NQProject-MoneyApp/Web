import axios, { Axios } from "axios";
import SessionStorage from "./SessionStorage";
import UserRepository from "./UserRepository";
import Group from "./../domain/groups/Group";
import { Expense } from "../domain/expenses/Expense";
import { User } from "../domain/users/User";

type SimpleResult = {
  success: boolean;
  result: any;
};

type GroupDto = {
  pk?: number;
  name?: string;
  icon?: number;
  total_cost?: number;
  user_balance?: number;
  create_date?: string;
  is_favorite?: boolean;
  members?: GroupUserDto[];
};

type ExpenseDto = {
  pk?: number;
  group_id?: number;
  name?: string;
  author?: any;
  amount?: number;
  create_date?: string;
};

type UserDto = {
  pk?: number;
  username?: string;
  email?: string;
};

type GroupUserDto = {
  user?: UserDto;
  balance?: number;
};

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
    if (result.data) {
      return result.data.map((e) => {
        return {
          id: e.pk!,
          name: e.name!,
          totalCost: -1,
          userBalance: e.user_balance!,
          createDate: new Date(e.create_date!),
          icon: "",
          members: e.members!.map((e) => this.mapFromGroupUserDto(e)),
        };
      });
    }
    return [];
  }

  async getExpenses(groupId: number): Promise<Expense[]> {
    const result = await this.axiosInstance.get<
      any,
      NetworkResponse<ExpenseDto[]>
    >(`api/${groupId}/expenses/`);
    if (result.data) {
      return result.data.map((e) => {
        return {
          amount: e.amount!,
          groupId: e.group_id!,
          name: e.name!,
          id: e.pk!,
        };
      });
    }
    return [];
  }

  async addExpense(
    groupId: number,
    name: String,
    amount: number,
    participants: number[]
  ) {
    const result = await this.axiosInstance.post<any>(
      `api/${groupId}/expenses/`,
      {
        name: name,
        amount: amount,
        participants: participants,
      }
    );
    console.log(result);
  }

  async addGroup(
    name: String,
    icon: number,
    participants: number[]
  ): Promise<SimpleResult> {
    try {
      const result = await this.axiosInstance.post<any>(`api/groups/`, {
        name: name,
        icon: icon,
        participants: participants,
      });
      return { success: true, result: "Succes" };
    } catch {
      return { success: false, result: null };
    }
  }

  async updateUserProfile(
    username: string,
    pk: number,
    email: string
  ): Promise<SimpleResult> {
    try {
      const response = await this.axiosInstance.patch<any>("api/user/", {
        username: username,
        email: email,
        pk: pk,
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
        if (error.response?.status === 401) {
          UserRepository.instance.logout();
        }
        return error;
      }
    );
  }

  async getUserFriends(): Promise<User[]> {
    const response = await this.axiosInstance.get<
      any,
      NetworkResponse<UserDto[]>
    >("api/friends/");

    if (response.data) {
      return response.data.map((e) => {
        return {
          id: e.pk!,
          name: e.username!,
          email: e.email!,
          balance: 0,
        };
      });
    } else {
      return [];
    }
  }

  async getIcons(): Promise<SimpleResult> {
    try {
      const response = await this.axiosInstance.get<any>("api/icons");
      return { success: true, result: response.data };
    } catch {
      return { success: false, result: null };
    }
  }

  private mapFromGroupUserDto(user: GroupUserDto): User {
    return this.mapFromUserDto(user.user!, user.balance!);
  }

  private mapFromUserDto(user: UserDto, balance: number): User {
    return {
      id: user.pk!,
      email: user.email!,
      name: user.username!,
      balance: balance,
    };
  }
}

export default ApiClient;
export type { SimpleResult };
