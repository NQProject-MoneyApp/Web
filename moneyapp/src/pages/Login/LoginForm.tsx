import { IonItem, IonLabel, IonInput, IonButton } from "@ionic/react";
import { useState } from "react";
import ApiClient from "../../services/ApiClient";
import "./Login.css";

const LoginFrom: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submitLogin = async () => {
    console.log("Login");
    const result = await ApiClient.login(username, password);
    if (result) {
      console.log("Logged in succesfully!");
    } else {
      console.log("Error!");
    }
    const response =  await ApiClient.getGroups();
    console.log(response.data)
  };

  return (
    <div className="container">
      <h1>Hello</h1>
      <IonItem>
        <IonLabel>Login</IonLabel>
        <IonInput
          type="text"
          placeholder="username"
          value={username}
          onIonChange={(e) => setUsername(e.detail.value!)}
        />
      </IonItem>

      <IonItem>
        <IonLabel>Password</IonLabel>
        <IonInput
          type="password"
          placeholder="password"
          value={password}
          onIonChange={(e) => setPassword(e.detail.value!)}
        />
      </IonItem>

      <IonButton color="primary" onClick={submitLogin}>
        Login
      </IonButton>
    </div>
  );
};

export default LoginFrom;
