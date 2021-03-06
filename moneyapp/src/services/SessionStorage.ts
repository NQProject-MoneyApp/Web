// import { assert } from "console";

class SessionStorage {
  static instance: SessionStorage = new SessionStorage();

  private key: string = "money-app-key";

  setToken(token: string): void {
    if (!token || token.trim() === "" || token.trim().length === 0) {
      console.log(
        "The token cannot be empty, if you want to log out use the logout function"
      );
      return;
    }
    localStorage.setItem(this.key, `Token ${token}`)
  }

  getToken(): string | undefined {
    let token = localStorage.getItem(this.key);

    if (token == null || !token) {
      return undefined;
    } else {
      return token;
    }
  }

  logout(): void {
    localStorage.setItem(this.key, "");
  }
}

export default SessionStorage;
