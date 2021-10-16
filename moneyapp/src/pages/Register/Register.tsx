import { IonContent, IonPage } from "@ionic/react";
import { RouteComponentProps } from "react-router";

import "./Register.css";
import RegisterForm from "./RegisterForm";

const Login: React.FC<RouteComponentProps> = ({history}) => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <RegisterForm history={history} />
      </IonContent>
    </IonPage>
  );
};

export default Login;
