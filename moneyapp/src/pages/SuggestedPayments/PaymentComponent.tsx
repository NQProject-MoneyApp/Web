import {
  IonCard,
  IonCardSubtitle,
  IonItem,
  IonCol,
  IonButton,
} from "@ionic/react";


type PaymentComponentProps = {
  readonly fromName: string;
  readonly toName: string;
  readonly amount: number;
  readonly savePayment: () => Promise<void>;
};

const PaymentComponent: React.FC<PaymentComponentProps> = ({
  fromName,
  toName,
  amount,
  savePayment,
}: PaymentComponentProps) => {
  return (
    <IonCard color="light">
      <IonItem color="none" lines="none">
        <IonCol>
          <IonCardSubtitle className="payment-subtitle">
            From: <span className="value">{fromName}</span>
          </IonCardSubtitle>
          <IonCardSubtitle className="payment-subtitle">
            To: <span className="value">{toName}</span>
          </IonCardSubtitle>
          <IonCardSubtitle className="payment-subtitle">
            Amount: <span className="value">{amount.toFixed(2)}</span>
          </IonCardSubtitle>
          <IonButton fill="clear" className="clear-button" onClick={savePayment}>Save the payment</IonButton>
        </IonCol>
      </IonItem>
    </IonCard>
  );
};

export default PaymentComponent;
