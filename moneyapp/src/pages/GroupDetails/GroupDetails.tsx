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
import { RouteComponentProps } from "react-router";
import Toolbar from "../../components/Toolbar";
import Group from "../../domain/groups/Group";
import ApiClient from "../../services/ApiClient";
import Icons from "../AddGroup/Icons";
import { Clipboard } from "@capacitor/clipboard";

import "./GroupDetails.css";
import FlexSpacer from "../../components/common/Spacer";

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
    history.push(`/groups/${groupId}/expenses/add`);
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
          <IonList className="container">
            <IonGrid className="group-info">
              <h2>{groupDetails!.name}</h2>
              <div className="group-info-container">
                <div>
                  <IonImg
                    className="icon group-image"
                    src={Icons.instance.icon(groupDetails!.icon)}
                  />
                </div>
                <div className="group-info-column">
                  <IonRow className="group-info-row">
                    <div>
                      <IonLabel>Total cost:</IonLabel>
                    </div>
                    <div>
                      <IonLabel>${groupDetails!.totalCost}</IonLabel>
                    </div>
                  </IonRow>
                  <IonRow className="group-info-row">
                    <div>
                      <IonLabel>Balance:</IonLabel>
                    </div>
                    <div>
                      <IonLabel
                        color={
                          groupDetails!.userBalance >= 0 ? "success" : "danger"
                        }
                      >
                        ${groupDetails!.userBalance.toFixed(2)}
                      </IonLabel>
                    </div>
                  </IonRow>
                </div>
              </div>
            </IonGrid>

            <IonRow>
              <IonButton color="primary">Settle up</IonButton>
              <IonButton color="primary" onClick={navigateToAddExpense}>
                New expense
              </IonButton>
            </IonRow>
            <IonCard className="group-members">
              <IonList lines="none">
                {groupDetails?.members!.map((e) => (
                  <IonCol key={e.id}>
                    <IonRow className="member-container">
                      <IonLabel> {e.name}</IonLabel>
                      <FlexSpacer className="member-spacer" flex={1} />
                      <IonLabel> {e.balance.toFixed(2)}</IonLabel>
                    </IonRow>
                  </IonCol>
                ))}
                <IonButton color="secondary" onClick={presentCodeAlert}>
                  Code
                </IonButton>
              </IonList>
            </IonCard>
            <IonButton onClick={navigateToAllExpenses}>All expenses</IonButton>
          </IonList>
        </IonContent>
      </IonPage>
    );
  }
};

export default GroupDetails;
