import {
  IonCard,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonRow,
  IonText,
} from "@ionic/react";
import FlexSpacer from "../../components/common/Spacer";
import { User } from "../../domain/users/User";
import "./ExpenseList.css";

type ExpenseComponentProps = {
  readonly groupId: number;
  readonly expenseId: number;
  readonly title: string;
  readonly author: User;
  readonly amount: number;
};

const ExpenseComponent: React.FC<ExpenseComponentProps> = ({
  groupId,
  expenseId,
  title,
  author,
  amount,
}: ExpenseComponentProps) => {
  return (
    <IonCard color="light" routerLink={`/groups/${groupId}/expenses/${expenseId}`}>
      <IonItem color="none" lines="none">
        <IonLabel>
          <IonCardTitle class="ion-text-wrap" className="expense">
            {title}
          </IonCardTitle>
          <FlexSpacer height="1rem" />
          <IonRow>
            <IonCardSubtitle>{author.name}</IonCardSubtitle>
            <FlexSpacer flex={1} />
            <IonCardSubtitle className="group-date">$ {amount.toFixed(2)}</IonCardSubtitle>
          </IonRow>
        </IonLabel>
      </IonItem>
    </IonCard>
  );
};

export default ExpenseComponent;
