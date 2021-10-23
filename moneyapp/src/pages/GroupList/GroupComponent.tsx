import {
  IonCard,
  IonCardSubtitle,
  IonCardTitle,
  IonItem,
  IonLabel,
  IonIcon,
  IonRow,
} from "@ionic/react";
// import { star, starOutline } from "ionicons/icons";
import moment from "moment";
import Icons from "../AddGroup/Icons";
import IconButton from "../../components/IconButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as starSolid } from "@fortawesome/free-solid-svg-icons";
import { faStar as starOutline } from "@fortawesome/free-regular-svg-icons";

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
    <IonCard color="light" routerLink={`/groups/${groupId}`}>
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
              <FontAwesomeIcon className="primary" icon={isFavourite ? starSolid : starOutline }></FontAwesomeIcon>
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
