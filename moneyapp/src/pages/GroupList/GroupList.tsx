import {
  IonContent,
  IonHeader,
  IonPage,
  IonCard,
  IonCardSubtitle,
  IonCardTitle,
  IonItem,
  IonLabel,
  IonIcon,
} from "@ionic/react";
import Toolbar from "../../components/Toolbar";
import burger from "../../images/icons/burgers.svg";
import bowling from "../../images/icons/bowling.svg";
import { star } from "ionicons/icons";
import "./GroupList.css";

const GroupList: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <Toolbar />
      </IonHeader>
      <IonContent fullscreen>
        <IonCard>
          <IonItem color="none" lines="none">
            <img className="icon" src={burger} />
            <IonLabel>
              <IonIcon icon={star}></IonIcon>
              <IonCardTitle>Grill</IonCardTitle>
              <IonCardSubtitle>$ 163</IonCardSubtitle>
              <IonCardSubtitle className="updatedDate">
                07.10.2021
              </IonCardSubtitle>
            </IonLabel>
          </IonItem>
        </IonCard>
        <IonCard>
          <IonItem color="none" lines="none">
            <img className="icon" src={bowling} />
            <IonLabel>
              <IonIcon icon={star}></IonIcon>
              <IonCardTitle>Impreza</IonCardTitle>
              <IonCardSubtitle>$ 50</IonCardSubtitle>
              <IonCardSubtitle className="updatedDate">
                20.09.2021
              </IonCardSubtitle>
            </IonLabel>
          </IonItem>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default GroupList;
