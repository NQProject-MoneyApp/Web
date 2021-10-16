import {
  IonPage,
  IonHeader,
  IonContent,
  IonCard,
  IonItem,
  IonList,
  IonCardTitle,
  IonCardContent,
  IonCardSubtitle,
  IonCardHeader,
} from "@ionic/react";
import { RouteComponentProps } from "react-router";
import FlexSpacer from "../../components/common/Spacer";
import Toolbar from "../../components/Toolbar";

const ExpenseDetails: React.FC<RouteComponentProps> = (history) => {
  return (
    <IonPage>
      <IonHeader>
        <Toolbar history={history}/>
      </IonHeader>
      <IonContent>
        <IonCard>
            {/* <IonCardHeader> */}
                <IonItem color="none" lines="none">
                    <h5>Amount</h5>
                    <FlexSpacer flex={1} />
                    <h5>50.00</h5>
                </IonItem>
                <IonItem color="none" lines="none">
                    <h5>Paid by</h5>
                    <FlexSpacer flex={1} />
                    <h5>user5</h5>
                </IonItem>
          {/* </IonCardHeader> */}
        </IonCard>
        <IonCard>
          <IonCardHeader ion-text-center>
            <IonCardSubtitle>Participants</IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            <h5>Miłosz</h5>
            <h5>Jędrek</h5>
          </IonCardContent>
        </IonCard>
        <FlexSpacer height="1rem" />
        <h4>Created on</h4>
        <h4>13.10.2021</h4>
      </IonContent>
    </IonPage>
  );
};

export default ExpenseDetails;
