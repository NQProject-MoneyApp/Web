import { IonContent, IonHeader, IonPage } from "@ionic/react";
import LoginForm from "./RegisterForm";
import Toolbar from "../../components/Toolbar";

import "./Register.css";
import RegisterForm from "./RegisterForm";

const Login: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <Toolbar />
      </IonHeader>
      <IonContent fullscreen>
        <RegisterForm />
      </IonContent>
    </IonPage>
  );
};

export default Login;
