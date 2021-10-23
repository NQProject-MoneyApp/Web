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
  IonLoading,
  IonLabel,
  useIonAlert,
  IonToast,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import FlexSpacer from "../../components/common/Spacer";
import { RouteComponentProps } from "react-router";
import Toolbar from "../../components/Toolbar";
import Group from "../../domain/groups/Group";
import ApiClient from "../../services/ApiClient";
import Icons from "../AddGroup/Icons";
import { Clipboard } from "@capacitor/clipboard";

import "./GroupDetails.css";

const GroupDetails: React.FC<RouteComponentProps> = ({ history }) => {
  const { groupId } = useParams<{ groupId: string }>();
  const [isGroupLoaded, setIsGroupLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [groupDetails, setGroup] = useState<Group | null>(null);
  const [present] = useIonAlert();
  const [showCopiedToast, setCopiedShowToast] = useState(false);

  const navigateToAllExpenses = () => {
    history.push(`/groups/${groupId}/expenses`);
  };

  const navigateToAddExpense = () => {
    history.push(`/groups/${groupId}/add-expense`);
  };

  const fethGroupsDetails = async () => {
    setIsGroupLoaded(false);
    const group = await ApiClient.instance.getGroup(parseInt(groupId));
    setGroup(group);
    setIsGroupLoaded(true);
  };

  const copieToClipboard = async (code: string) => {
    await Clipboard.write({
      string: code,
    });
    setCopiedShowToast(true);
  };

  const presentCodeAlert = async () => {
    setIsLoading(true);
    const code = await ApiClient.instance.getCode(parseInt(groupId));

    setIsLoading(false);

    present({
      header: "Code",
      message: code,
      buttons: [
        { text: "Copy", handler: (e) => copieToClipboard(code) },
        { text: "Ok", handler: (e) => {} },
      ],
    });
  };

  useEffect(() => {
    fethGroupsDetails();
  }, []);

  if (!isGroupLoaded) {
    return (
      <IonContent>
        <IonLoading isOpen={true} message={"Loading..."} />
      </IonContent>
    );
  } else {
    return (
      <IonPage>
        <IonHeader>
          <Toolbar history={history} />
        </IonHeader>
        <IonContent>
          <IonLoading isOpen={isLoading} message={"Loading..."} />
          <IonToast
            isOpen={showCopiedToast}
            onDidDismiss={() => setCopiedShowToast(false)}
            message="Code copied to clipboard"
            position="top"
            color="primary"
            mode="ios"
            duration={1000}
          />
          <h2>Group Details</h2>
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonImg
                  className="icon group-image"
                  src={Icons.instance.icon(groupDetails!.icon)}
                />
              </IonCol>
              <IonCol>
                <IonRow>Total cost: ${groupDetails!.totalCost}</IonRow>
                <IonRow>Balance: ${groupDetails!.userBalance.toFixed(2)}</IonRow>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonButton color="primary">Settle up</IonButton>
              </IonCol>
              <IonCol>
                <IonButton color="primary" onClick={navigateToAddExpense}>
                  New expense
                </IonButton>
              </IonCol>
              <IonCol>
                <IonButton color="primary" onClick={presentCodeAlert}>
                  Code
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
          <IonCard>
            <IonList lines="none">
              <FlexSpacer height="1rem" />

              {groupDetails?.members!.map((e) => (
                <IonCol key={e.id}>
                  <IonRow>
                    <FlexSpacer width="1rem" />

                    <IonLabel> {e.name}</IonLabel>
                    <FlexSpacer flex={1} />
                    <IonLabel> {e.balance.toFixed(2)}</IonLabel>
                    <FlexSpacer width="1rem" />
                  </IonRow>
                  <FlexSpacer height="0.5rem" />
                </IonCol>
              ))}

              <IonButton onClick={navigateToAllExpenses}>
                All expenses
              </IonButton>
              <FlexSpacer height="1rem" />
            </IonList>
          </IonCard>
        </IonContent>
      </IonPage>
    );
  }
};

export default GroupDetails;
