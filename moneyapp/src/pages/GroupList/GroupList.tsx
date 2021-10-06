import { IonContent, IonHeader, IonPage } from "@ionic/react";
import Toolbar from "../../components/Toolbar";

import "./GroupList.css";

const GroupList: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <Toolbar />
      </IonHeader>
      <IonContent fullscreen>
        Group List
      </IonContent>
    </IonPage>
  );
};

export default GroupList;
