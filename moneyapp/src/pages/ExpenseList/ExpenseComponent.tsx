import { IonCard, IonContent, IonList, IonRow, IonText } from "@ionic/react";
import FlexSpacer from "../../components/common/Spacer";

type ExpenseComponentProps = {
  readonly title: string;
  readonly author: string;
  readonly amount: number;
};

const ExpenseComponent: React.FC<ExpenseComponentProps> = ({
  title,
  author,
  amount,
}: ExpenseComponentProps) => {
  return (
    <IonCard className="expense-card" color="light">
      <IonList>
        <IonText color="primary" style={{ fontFamily: "Poppins SemiBold" }}>
          <h3>{title}</h3>
        </IonText>
        <IonRow>
          <IonText>{author}</IonText>
          <FlexSpacer flex={1} />
          <IonText>${amount.toFixed(2)}</IonText>
        </IonRow>
      </IonList>
    </IonCard>
  );
};

export default ExpenseComponent;
