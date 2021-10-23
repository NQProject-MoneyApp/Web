import axios, { Axios } from "axios";
import SessionStorage from "./SessionStorage";
import UserRepository from "./UserRepository";
import Group from "./../domain/groups/Group";
import { Expense } from "../domain/expenses/Expense";
import { User } from "../domain/users/User";
import { group } from "console";
import { resultingClientExists } from "workbox-core/_private";

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
  is_favourite?: boolean;
  members?: GroupUserDto[];
};

type ExpenseDto = {
  pk?: number;
  group_id?: number;
  name?: string;
  author?: UserDto;
  amount?: number;
  create_date?: string;
  participants?: UserDto[];
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

  async register(
    username: string,
    email: string,
    password: string
  ): Promise<SimpleResult> {
    const requestData = {
      username: username,
      email: email,
      password1: password,
      password2: password,
    };
    try {
      const response = await this.axiosInstance.post<typeof requestData, any>(
        "api/registration/",
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
          icon: e.icon!,
          members: e.members!.map((e) => this.mapFromGroupUserDto(e)),
          isFavourite: e.is_favourite!,
        };
      });
    }
    return [];
  }

  async getGroup(id: number): Promise<Group | null> {
    const result = await this.axiosInstance.get<any, NetworkResponse<GroupDto>>(
      `api/groups/${id}/`
    );
    if (result.data) {
      return {
        id: result.data.pk!,
        name: result.data.name!,
        totalCost: result.data.total_cost!,
        userBalance: result.data.user_balance!,
        createDate: new Date(result.data.create_date!),
        icon: result.data.icon!,
        members: result.data.members!.map((e) => this.mapFromGroupUserDto(e)),
        isFavourite: result.data.is_favourite!,
      };
    }

    return null;
  }

  async getCode(id: number): Promise<string> {
    const result = await this.axiosInstance.post<any>(`api/group-codes/`, {
      group: id,
    });
    console.log(result.data);
    if (result.data) {
      return result.data.code;
    }

    return "code";
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
          author: this.mapFromUserDto(e.author!, 0),
          createDate: e.create_date!,
          participants: e.participants!.map((e) => this.mapFromUserDto(e, 0)),
        };
      });
    }
    return [];
  }

  async getExpense(
    groupId: number,
    expenseId: number
  ): Promise<Expense | null> {
    const result = await this.axiosInstance.get<
      any,
      NetworkResponse<ExpenseDto>
    >(`api/${groupId}/expenses/${expenseId}/`);

    if (result.data) {
      return {
        amount: result.data.amount!,
        groupId: result.data.group_id!,
        id: result.data.pk!,
        name: result.data.name!,
        author: this.mapFromUserDto(result.data.author!, 0),
        createDate: result.data.create_date!,
        participants: result.data.participants!.map((e) =>
          this.mapFromUserDto(e, 0)
        ),
      };
    }

    return null;
  }

  async addExpense(
    groupId: number,
    name: String,
    amount: number,
    participants: number[]
  ): Promise<SimpleResult> {
    try {
      await this.axiosInstance.post<any>(`api/${groupId}/expenses/`, {
        name: name,
        amount: amount,
        participants: participants,
      });
      return { success: true, result: "Success" };
    } catch {
      return { success: false, result: "Something wrong" };
    }
  }

  async editExpense(
    groupId: number,
    expenseId: number,
    name: String,
    amount: number,
    participants: number[]
  ): Promise<SimpleResult> {
    try {
      const result = await this.axiosInstance.put<any>(
        `api/${groupId}/expenses/${expenseId}/`,
        {
          name: name,
          amount: amount,
          participants: participants,
        }
      );
      return { success: true, result: "Success" };
    } catch {
      return { success: false, result: "Something wrong" };
    }
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

  async editGroup(
    id: number,
    name: String,
    icon: number
  ): Promise<SimpleResult> {
    try {
      const result = await this.axiosInstance.patch<any>(`api/groups/${id}/`, {
        name: name,
        icon: icon,
      });
      return { success: true, result: "Succes" };
    } catch {
      return { success: false, result: null };
    }
  }

  async markGroupAsFavourite(
    groupId: number,
    isFavourite: boolean
  ): Promise<SimpleResult> {
    try {
      const result = await this.axiosInstance.patch<any>(
        `api/groups/${groupId}/`,
        {
          is_favourite: isFavourite,
        }
      );
      return { success: true, result: "Succes" };
    } catch {
      return { success: false, result: null };
    }
  }

  async join(code: String): Promise<SimpleResult> {
    try {
      const result = await this.axiosInstance.put<any, any>(
        `api/join/${code}/`
      );
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
        throw error;
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
