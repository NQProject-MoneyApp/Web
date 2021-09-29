import {
  IonItem,
  IonLabel,
  IonInput,
} from "@ionic/react";
import "./Login.css";

const LoginFrom: React.FC = () => {
  return (
    <div className="container">
      <h1>Hello</h1>
      <IonItem>
        <IonLabel>Login</IonLabel>
        <IonInput type="text" value="" />
      </IonItem>

      <IonItem>
        <IonLabel>Password</IonLabel>
        <IonInput type="password" value="" />
      </IonItem>
    </div>
  );
};

export default LoginFrom;
