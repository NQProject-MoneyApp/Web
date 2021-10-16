import {
  IonItem,
  IonList,
  IonInput,
  IonButton,
  IonToast,
  IonLoading,
} from "@ionic/react";
import { useState } from "react";
import { Redirect } from "react-router";
import LoginHeader from "../../components/LoginHeader";
import ApiClient from "../../services/ApiClient";
import UserRepository from "../../services/UserRepository";
import "./Login.css";

const LoginFrom: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const submitLogin = async () => {
    console.log("Login");
    setIsLoading(true);
    const result = await UserRepository.instance.login(username, password);
    if (result) {
      setIsLoading(false);
      window.location.reload();
    } else {
      setShowToast(true);
      setIsLoading(false);
    }
  };

  const navigateToRegister = async () => {
    window.location.href = "/register"
  };

  if (UserRepository.instance.isLogin()) {
    return <Redirect to="/groups" />;
  } else {
    return (
      <IonList className="container auth-form">
        <IonLoading isOpen={isLoading} message={"Loading..."} />

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="Login error"
          position="top"
          color="danger"
          mode="ios"
          duration={1000}
        />
        <LoginHeader title="Hello" />
        <IonItem lines="none">
          <IonInput
            type="text"
            placeholder="Username"
            value={username}
            onIonChange={(e) => setUsername(e.detail.value!)}
          />
        </IonItem>

        <IonItem lines="none">
          <IonInput
            type="password"
            placeholder="Password"
            value={password}
            onIonChange={(e) => setPassword(e.detail.value!)}
            onKeyDown={(e) => {
              if (e.key == "Enter") {
                submitLogin();
              }
            }}
          />
        </IonItem>
        <IonButton color="primary" onClick={submitLogin}>
          Log in
        </IonButton>
        <IonButton color="primary" onClick={navigateToRegister}>
          Register
        </IonButton>
      </IonList>
    );
  }
};

export default LoginFrom;
