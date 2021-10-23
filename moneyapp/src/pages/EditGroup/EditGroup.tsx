import { IonContent, IonHeader, IonPage } from "@ionic/react";
import { RouteComponentProps } from "react-router";
import Toolbar from "../../components/Toolbar";

import EditGroupContent from "./EditGroupContent";

const EditGroup: React.FC<RouteComponentProps> = ({history}) => {
  return (
    <IonPage>
      <IonHeader>
        <Toolbar history={history} />
      </IonHeader>
      <IonContent fullscreen>
        <EditGroupContent history={history} />
      </IonContent>
    </IonPage>
  );
};

export default EditGroup;
