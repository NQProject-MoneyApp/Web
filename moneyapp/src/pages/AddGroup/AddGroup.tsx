import { IonContent, IonHeader, IonPage } from "@ionic/react";
import Toolbar from "../../components/Toolbar";

import "./AddGroup.css";
import AddGroupContent from "./AddGroupContent";

const AddGroup: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <Toolbar />
      </IonHeader>
      <IonContent fullscreen>
        <AddGroupContent />
      </IonContent>
    </IonPage>
  );
};

export default AddGroup;
