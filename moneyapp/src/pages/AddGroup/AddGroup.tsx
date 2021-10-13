import {
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonRow,
  IonCol,
  IonCard,
  IonList,
  IonItem,
  IonImg,
  IonButton,
} from "@ionic/react";
import Toolbar from "../../components/Toolbar";

import "./AddGroup.css";

const AddGroup: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <Toolbar />
      </IonHeader>
      <IonContent>
        <h2>Add Group</h2>
      </IonContent>
    </IonPage>
  );
};

export default AddGroup;
