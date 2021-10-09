import {
  IonCard,
  IonCardSubtitle,
  IonCardTitle,
  IonItem,
  IonLabel,
  IonIcon,
} from "@ionic/react";
import burger from "../../images/icons/burgers.svg";
import { star, starOutline } from "ionicons/icons";
import moment from 'moment';

type GroupComponentProps = {
  readonly name: string;
  readonly icon: number;
  readonly balance: number;
  readonly createDate: Date;
  readonly isFavourite: boolean;
};

const GroupComponent: React.FC<GroupComponentProps> = ({
  name,
  icon,
  balance,
  createDate,
  isFavourite
}: GroupComponentProps) => {
  return (
    <IonCard>
      <IonItem color="none" lines="none">
        <img className="icon" src={burger} />
        <IonLabel>
          <IonIcon icon={star}></IonIcon>
          <IonCardTitle class="ion-text-wrap">{name}</IonCardTitle>
          <IonCardSubtitle>$ {balance.toFixed(2)}</IonCardSubtitle>
          <IonCardSubtitle className="groupDate">{moment(createDate).format('DD.MM.YYYY')}</IonCardSubtitle>
        </IonLabel>
      </IonItem>
    </IonCard>
  );
};

export default GroupComponent;