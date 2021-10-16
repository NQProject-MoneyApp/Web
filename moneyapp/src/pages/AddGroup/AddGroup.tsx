import { IonContent, IonHeader, IonPage } from "@ionic/react";
import { RouteComponentProps } from "react-router";
import Toolbar from "../../components/Toolbar";

import "./AddGroup.css";
import AddGroupContent from "./AddGroupContent";

const AddGroup: React.FC<RouteComponentProps> = ({history}) => {
  return (
    <IonPage>
      <IonHeader>
        <Toolbar history={history} />
      </IonHeader>
      <IonContent fullscreen>
        <AddGroupContent history={history} />
      </IonContent>
    </IonPage>
  );
};

export default AddGroup;
