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
} from "@ionic/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import FlexSpacer from "../../components/common/Spacer";
import { RouteComponentProps } from "react-router";
import Toolbar from "../../components/Toolbar";
import Group from "../../domain/groups/Group";
import burger from "../../images/icons/burgers.svg";
import ApiClient from "../../services/ApiClient";
import Icons from "../AddGroup/Icons";

import "./GroupDetails.css";

const GroupDetails: React.FC<RouteComponentProps> = ({history}) => {

  const { groupId } = useParams<{ groupId: string }>();

  const [isLoading, setIsLoading] = useState(true);
  const [groupDetails, setGroup] = useState<Group | null>(null);

  const navigateToAllExpenses = () => {
    window.location.href = `groups/${groupId}/expenses`;
  };

  const navigateToAddExpense = () => {
    window.location.href = `groups/${groupId}/add-expense`;
  };

  const fethGroupsDetails = async () => {
    setIsLoading(true);
    const group = await ApiClient.instance.getGroup(parseInt(groupId));
    setGroup(group);
    setIsLoading(false);
  };

  useEffect(() => {
    fethGroupsDetails();
  }, []);

  if (isLoading) {
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
          <h2>Group Details</h2>
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonCard
                  key={groupDetails!.icon}
                  color="medium"
                  className="groupIconClass"
                >
                  <IonImg
                    className="icon group-image"
                    src={Icons.instance.icon(groupDetails!.icon)}
                  />
                </IonCard>
              </IonCol>
              <IonCol>
                <IonRow>Total cost: ${groupDetails!.totalCost}</IonRow>
                <IonRow>Balance: ${groupDetails!.userBalance}</IonRow>
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
                    <IonLabel> {e.balance}</IonLabel>
                    <FlexSpacer width="1rem" />
                  </IonRow>
                  <FlexSpacer height="0.5rem" />
                </IonCol>

                // </IonItem>
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

type GroupImageProps = {
  src?: string;
};

// const GroupImage: React.FC<GroupImageProps> = ({ src }: GroupImageProps) => {
//   return;

// };

export default GroupDetails;
