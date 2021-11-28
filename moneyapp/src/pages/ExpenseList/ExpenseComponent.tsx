import {
  IonCard,
  IonCardSubtitle,
  IonCardTitle,
  IonItem,
  IonRow,
  IonCol,
} from "@ionic/react";
import FlexSpacer from "../../components/common/Spacer";
import "./ExpenseList.css";

type ExpenseComponentProps = {
  readonly groupId: number;
  readonly expenseId: number;
  readonly title: string;
  readonly paidBy: string;
  readonly amount: number;
};

const ExpenseComponent: React.FC<ExpenseComponentProps> = ({
  groupId,
  expenseId,
  title,
  paidBy,
  amount,
}: ExpenseComponentProps) => {
  return (
    <IonCard
      color="light"
      routerLink={`/groups/${groupId}/expenses/${expenseId}/details`}
    >
      <IonItem className="expense-card" lines="none">
        <IonCol>
          <IonCardTitle class="ion-text-wrap" className="expense">
            {title}
          </IonCardTitle>
          <IonRow>
            <IonCardSubtitle className="card-subtitles">
              {paidBy}
            </IonCardSubtitle>
            <FlexSpacer flex={1} />
            <IonCardSubtitle className="group-date card-subtitles">
              $ {amount.toFixed(2)}
            </IonCardSubtitle>
          </IonRow>
        </IonCol>
      </IonItem>
    </IonCard>
  );
};

export default ExpenseComponent;
