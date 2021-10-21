import {
  IonCard,
  IonCardSubtitle,
  IonCardTitle,
  IonItem,
  IonLabel,
  IonIcon,
  IonRow,
} from "@ionic/react";
import { star, starOutline } from "ionicons/icons";
import moment from "moment";
import Icons from "../AddGroup/Icons";
import IconButton from "../../components/IconButton";

type GroupComponentProps = {
  readonly groupId: number;
  readonly name: string;
  readonly icon: number;
  readonly balance: number;
  readonly createDate: Date;
  readonly isFavourite: boolean;
  readonly markGroupAsFavourite: (
    GroupId: number,
    isFavourite: boolean
  ) => Promise<void>;
};

const GroupComponent: React.FC<GroupComponentProps> = ({
  groupId,
  name,
  icon,
  balance,
  createDate,
  isFavourite,
  markGroupAsFavourite,
}: GroupComponentProps) => {
  return (
    <IonCard color="light" routerLink={`/groups/${groupId}/expenses`}>
      <IonItem color="none" lines="none">
        <img
          className="icon"
          src={Icons.instance.icon(icon)}
          alt="group icon"
        />
        <IonLabel>
          <IonRow className="group-label-container">
            <IonCardTitle class="ion-text-wrap">{name}</IonCardTitle>

            <IconButton
              size="unset"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                markGroupAsFavourite(groupId, !isFavourite);
              }}
              justify="flex-end"
            >
              <IonIcon icon={isFavourite ? star : starOutline}></IonIcon>
            </IconButton>
          </IonRow>
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
