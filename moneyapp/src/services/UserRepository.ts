import ApiClient, { SimpleResult } from "./ApiClient";
import SessionStorage from "./SessionStorage";

class UserRepository {
  static instance: UserRepository = new UserRepository();

  async login(username: string, password: string): Promise<boolean> {
    const result = await ApiClient.instance.login(username, password);

    if (result.success) {
      SessionStorage.instance.setToken(result.result.key);
      return true;
    } else {
      return false;
    }
  }

  isLogin(): boolean {
    return SessionStorage.instance.getToken() !== undefined;
  }

  logout(): void {
    SessionStorage.instance.logout();
    window.location.href = "";
  }

  async userProfile(): Promise<SimpleResult> {
    return await ApiClient.instance.getUserProfile();
  }

  async fetchFriends(): Promise<SimpleResult> {
    return await ApiClient.instance.getUserFriends();
  }

  async fetchIcons(): Promise<SimpleResult> {
    return await ApiClient.instance.getIcons();
  }

  async updateUserProfile(username: string, pk: number, email: string): Promise<SimpleResult> {
    return await ApiClient.instance.updateUserProfile(username, pk, email);
  }
}

export default UserRepository;
