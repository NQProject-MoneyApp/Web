import { IonContent, IonPage } from "@ionic/react";

import "./Register.css";
import RegisterForm from "./RegisterForm";

const Login: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <RegisterForm />
      </IonContent>
    </IonPage>
  );
};

export default Login;
