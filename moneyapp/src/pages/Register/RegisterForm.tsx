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
import UserRepository from "../../services/UserRepository";
import "./Register.css";

const RegisterForm: React.FC<any> = ({history}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const submitRegister = async () => {
    setIsLoading(true);
    const result = await UserRepository.instance.register(
      username,
      email,
      password
    );
    if (result) {
      setIsLoading(false);
      window.location.reload();
    } else {
      setShowToast(true);
      setIsLoading(false);
    }
  };

  const navigateToLogin = async () => {
    history.push("/login");

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
          message="Register error"
          position="top"
          color="danger"
          mode="ios"
          duration={1000}
        />
        <LoginHeader title="Register" />
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
            type="text"
            placeholder="Email"
            value={email}
            onIonChange={(e) => setEmail(e.detail.value!)}
          />
        </IonItem>

        <IonItem lines="none">
          <IonInput
            type="password"
            placeholder="Password"
            value={password}
            onIonChange={(e) => setPassword(e.detail.value!)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                submitRegister();
              }
            }}
          />
        </IonItem>
        <IonButton color="primary" onClick={submitRegister}>
          Register
        </IonButton>
        <IonItem className="login-form-option" lines="none">
          <p>
            Have an account?
            <span className="clickable" onClick={navigateToLogin}>
              Login
            </span>
          </p>
        </IonItem>
      </IonList>
    );
  }
};

export default RegisterForm;
