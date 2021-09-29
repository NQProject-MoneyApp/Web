import {
  IonContent,
  IonHeader,
  IonPage,
} from "@ionic/react";
import LoginForm from "./LoginForm";
import Toolbar from "../../components/Toolbar";

import "./Login.css";

const Login: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <Toolbar/>
      </IonHeader>
      <IonContent fullscreen>
        <LoginForm />
      </IonContent>
    </IonPage>
  );
};

export default Login;
