import { IonContent, IonHeader, IonPage } from "@ionic/react";
import ProfileContent from "./ProfileContent";
import Toolbar from "../../components/Toolbar";
import { RouteComponentProps } from 'react-router-dom';
import "./Profile.css";

const Profile: React.FC<RouteComponentProps> = ({history}) => {
  return (
    <IonPage>
      <IonHeader>
        <Toolbar history={history} />
      </IonHeader>
      <IonContent fullscreen>
        <ProfileContent />
      </IonContent>
    </IonPage>
  );
};

export default Profile;
