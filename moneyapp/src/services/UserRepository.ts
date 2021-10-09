import ApiClient from "./ApiClient";
import SessionStorage from "./SessionStorage";

class UserRepository {
  static instance: UserRepository = new UserRepository();

  async login(username: string, password: string): Promise<boolean> {
    const result = await ApiClient.instance.login(username, password);

    if (result[0]) {
      SessionStorage.instance.setToken(result[1]);
      return true;
    } else {
      return false;
    }
  }

  isLogin(): boolean {
    return SessionStorage.instance.getToken() != undefined;
  }

  logout(): void {
    SessionStorage.instance.logout();
    window.location.href = "";
  }
}

export default UserRepository;
