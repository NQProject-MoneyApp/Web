import { IonContent, IonPage } from "@ionic/react";
import LoginForm from "./LoginForm";

import "./Login.css";

const Login: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <LoginForm />
      </IonContent>
    </IonPage>
  );
};

export default Login;
