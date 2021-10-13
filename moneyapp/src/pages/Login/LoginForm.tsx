import { IonItem, IonLabel, IonInput, IonButton, IonToast } from "@ionic/react";
import { useState } from "react";
import { Redirect } from "react-router";
import ApiClient from "../../services/ApiClient";
import UserRepository from "../../services/UserRepository";
import "./Login.css";

const LoginFrom: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showToast, setShowToast] = useState(false);

  const submitLogin = async () => {
    console.log("Login");
    const result = await UserRepository.instance.login(username, password);
    if (result) {
      window.location.reload();
    } else {
      setShowToast(true);
    }
  };

  if (UserRepository.instance.isLogin()) {
    return <Redirect to="/groups" />;
  } else {
    return (
      <div className="container auth-form">
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="Login error"
          position="top"
          color="danger"
          mode="ios"
          duration={1000}
        />
        <h1>Hello</h1>
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
      </div>
    );
  }
};

export default LoginFrom;
