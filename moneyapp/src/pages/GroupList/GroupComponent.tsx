import {
  IonCard,
  IonCardSubtitle,
  IonCardTitle,
  IonItem,
  IonLabel,
  IonIcon,
} from "@ionic/react";
import { star, starOutline } from "ionicons/icons";
import moment from "moment";
import Icons from "../AddGroup/Icons";
import Burger from "../AddGroup/Icons";
import GroupDetails from "../GroupDetails/GroupDetails";


type GroupComponentProps = {
  readonly groupId: number;
  readonly name: string;
  readonly icon: number;
  readonly balance: number;
  readonly createDate: Date;
  readonly isFavourite: boolean;
};

const GroupComponent: React.FC<GroupComponentProps> = ({
  groupId,
  name,
  icon,
  balance,
  createDate,
  isFavourite,
}: GroupComponentProps) => {

  return (
      <IonCard color="light" routerLink={`/groups/${groupId}/expenses`}>
        <IonItem color="none" lines="none">
          <img className="icon" src={Icons.instance.icon(icon)} alt="group icon"/>
          <IonLabel>
            <IonIcon icon={star}></IonIcon>
            <IonCardTitle class="ion-text-wrap">{name}</IonCardTitle>
            <IonCardSubtitle>$ {balance.toFixed(2)}</IonCardSubtitle>
            <IonCardSubtitle className="groupDate">
              {moment(createDate).format("DD.MM.YYYY")}
            </IonCardSubtitle>
          </IonLabel>
        </IonItem>
      </IonCard>
  );
};

export default GroupComponent;
