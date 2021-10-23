import {
  IonCard,
  IonCardSubtitle,
  IonCardTitle,
  IonItem,
  IonLabel,
  IonIcon,
  IonRow,
} from "@ionic/react";
import moment from "moment";
import Icons from "../AddGroup/Icons";
import IconButton from "../../components/IconButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as starSolid } from "@fortawesome/free-solid-svg-icons";
import { faStar as starOutline } from "@fortawesome/free-regular-svg-icons";
import "./GroupList.css";

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
    <IonCard color="light" routerLink={`/groups/${groupId}/details`}>
      <IonItem color="none" lines="none">
        <img
          className="icon"
          src={Icons.instance.icon(icon)}
          alt="group icon"
        />
        <IonLabel className="group-label">
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
              <FontAwesomeIcon className="favorite-icon" icon={isFavourite ? starSolid : starOutline }></FontAwesomeIcon>
            </IconButton>
          </IonRow>
          <IonCardSubtitle className="card-subtitles">$ {balance.toFixed(2)}</IonCardSubtitle>
          <IonCardSubtitle className="group-date card-subtitles">
            {moment(createDate).format("DD.MM.YYYY")}
          </IonCardSubtitle>
        </IonLabel>
      </IonItem>
    </IonCard>
  );
};

export default GroupComponent;
