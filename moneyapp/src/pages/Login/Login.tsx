import { IonContent, IonHeader, IonPage } from "@ionic/react";
import LoginForm from "./LoginForm";
import Toolbar from "../../components/Toolbar";

import "./Login.css";
import { RouteComponentProps } from "react-router";

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
