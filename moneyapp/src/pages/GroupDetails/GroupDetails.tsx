import {
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonRow,
  IonCol,
  IonCard,
  IonList,
  IonImg,
  IonButton,
  IonLoading,
  IonLabel,
  useIonAlert,
  IonToast,
  useIonViewWillEnter,
} from "@ionic/react";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import { RouteComponentProps } from "react-router";
import Toolbar from "../../components/Toolbar";
import Group from "../../domain/groups/Group";
import ApiClient from "../../services/ApiClient";
import Icons from "../AddGroup/Icons";
import { Clipboard } from "@capacitor/clipboard";

import "./GroupDetails.css";
import FlexSpacer from "../../components/common/Spacer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IconButton from "../../components/IconButton";
import { faPen, faShareAlt } from "@fortawesome/free-solid-svg-icons";

const GroupDetails: React.FC<RouteComponentProps> = ({ history }) => {
  const { groupId } = useParams<{ groupId: string }>();
  const [isGroupLoaded, setIsGroupLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [groupDetails, setGroup] = useState<Group | null>(null);
  const [present] = useIonAlert();
  const [showCopiedToast, setCopiedShowToast] = useState(false);

  const navigateToAllExpenses = () => {
    history.push(`/groups/${groupId}/expenses`);
  };

  const navigateToAddExpense = () => {
    history.push(`/groups/${groupId}/expenses/add`);
  };

  const navigateToEditGroup = () => {
    history.push(`/groups/${groupId}/edit`);
  };

  const navigateToSuggestedPayments = () => {
    history.push(`/groups/${groupId}/suggested-payments`);
  };

  const fethGroupsDetails = useCallback(async () => {
    const group = await ApiClient.instance.getGroup(parseInt(groupId));
    setGroup(group);
    setIsLoading(false);
    setIsGroupLoaded(true);
  }, [groupId])
  

  const copyToClipboard = async (code: string) => {
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
      cssClass: "share-code-alert",
      header: "Share the code with friends!",
      message: code,
      buttons: [
        { text: "Copy", handler: (e) => copyToClipboard(code) },
        { text: "Back", handler: (e) => {} },
      ],
    });
  };

  useEffect(() => {
    fethGroupsDetails();
  }, [groupId, fethGroupsDetails]);

  useIonViewWillEnter(() => {
    fethGroupsDetails();
  });

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
            {isGroupLoaded && (
              <>
                <div className="manage-group-icons">
                  <IconButton size="big" onClick={presentCodeAlert}>
                    <FontAwesomeIcon
                      size="2x"
                      icon={faShareAlt}
                    ></FontAwesomeIcon>
                  </IconButton>
                  <IconButton size="big" onClick={navigateToEditGroup}>
                    <FontAwesomeIcon size="2x" icon={faPen}></FontAwesomeIcon>
                  </IconButton>
                </div>
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
                            groupDetails!.userBalance >= 0
                              ? "success"
                              : "danger"
                          }
                        >
                          ${groupDetails!.userBalance.toFixed(2)}
                        </IonLabel>
                      </div>
                    </IonRow>
                  </div>
                </div>
              </>
            )}
          </IonGrid>

          <IonRow>
            <IonButton color="primary" onClick={navigateToSuggestedPayments}>Settle up</IonButton>
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
            </IonList>
          </IonCard>
          <IonButton onClick={navigateToAllExpenses}>All expenses</IonButton>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default GroupDetails;
