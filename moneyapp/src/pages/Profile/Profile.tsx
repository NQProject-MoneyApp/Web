import { IonContent, IonHeader, IonPage } from "@ionic/react";
import ProfileContent from "./ProfileContent";
import Toolbar from "../../components/Toolbar";

import "./Profile.css";

const Profile: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <Toolbar />
      </IonHeader>
      <IonContent fullscreen>
        <ProfileContent />
      </IonContent>
    </IonPage>
  );
};

export default Profile;
