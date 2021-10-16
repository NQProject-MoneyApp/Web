import { IonCol, IonGrid, IonRow } from "@ionic/react";
import logo from "../images/logo.svg";
import "./LoginHeader.css";

type LoginHeaderProps = {
  title: string;
};

const LoginHeader: React.FC<LoginHeaderProps> = ({
  title,
}: LoginHeaderProps) => {
  return (
    <IonGrid>
      <IonRow>
        <IonCol className="login-header">
          <img src={logo} alt="MoneyApp Logo"></img>
          <h1>{title}</h1>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default LoginHeader;
