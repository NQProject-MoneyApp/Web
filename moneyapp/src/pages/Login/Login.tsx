import { IonContent, IonHeader, IonPage } from "@ionic/react";
import LoginForm from "./LoginForm";

import "./Login.css";
import { RouteComponentProps } from "react-router";
import Toolbar from "../../components/Toolbar";

const Login: React.FC<RouteComponentProps> = ({history}) => {
  return (
    <IonPage>
      <IonHeader>
        <Toolbar history={history} />
      </IonHeader>
      <IonContent fullscreen>
        <LoginForm />
      </IonContent>
    </IonPage>
  );
};

export default Login;
