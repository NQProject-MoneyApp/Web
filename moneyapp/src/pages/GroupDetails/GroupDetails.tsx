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
import burger from "../../images/icons/burgers.svg";

import "./GroupDetails.css";

const GroupDetails: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <Toolbar />
      </IonHeader>
      <IonContent>
        <h2>Group Details</h2>
        <IonGrid>
          <IonRow>
            <IonCol>
              <GroupImage src={burger} />
            </IonCol>
            <IonCol>
              <IonRow>Total cost: $12.99</IonRow>
              <IonRow>Balance: $+2.00</IonRow>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonButton color="primary">Settle up</IonButton>
            </IonCol>
            <IonCol>
              <IonButton color="primary">New expense</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonCard>
          <IonList lines="none" >
            <IonItem>Item 1</IonItem>
            <IonItem>Item 2</IonItem>
            <IonItem>Item 3</IonItem>
          </IonList>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

type GroupImageProps = {
  src?: string;
};

const GroupImage: React.FC<GroupImageProps> = ({ src }: GroupImageProps) => {
  return <IonImg className="icon group-image" src={src} />;
};

export default GroupDetails;
