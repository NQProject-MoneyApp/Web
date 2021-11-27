import {
  IonContent,
  IonHeader,
  IonPage,
  IonRow,
  IonList,
  IonButton,
  IonLoading,
  useIonViewWillEnter,
  IonToast,
} from "@ionic/react";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import { RouteComponentProps } from "react-router";
import Toolbar from "../../components/Toolbar";
import ApiClient, { ExpenseType } from "../../services/ApiClient";

import "./SuggestedPayments.css";
import SuggestedPayment from "../../domain/groups/SuggestedPayment";
import PaymentComponent from "./PaymentComponent";
import { User } from "../../domain/users/User";

const SuggestedPayments: React.FC<RouteComponentProps> = ({ history }) => {
  const { groupId } = useParams<{ groupId: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [suggestedPayments, setSuggestedPayments] = useState<
    SuggestedPayment[]
  >([]);

  const fetchSuggestedPayments = useCallback(async () => {
    const payments = await ApiClient.instance.getSuggestedPayments(
      parseInt(groupId)
    );
    setSuggestedPayments(payments);
    setIsLoading(false);
  }, [groupId]);

  useEffect(() => {
    fetchSuggestedPayments();
  }, [groupId, fetchSuggestedPayments]);

  useIonViewWillEnter(() => {
    fetchSuggestedPayments();
  });

  const navigateToNewPayment = () => {};

  const savePayment = async (paidBy: User, paidTo: User, amount: number) => {
    setIsLoading(true);
    const result = await ApiClient.instance.addExpense(
      parseInt(groupId),
      `${paidBy.name} -> ${paidTo.name}`,
      amount,
      [],
      paidBy.id,
      ExpenseType.payment,
      paidTo.id
    );
    fetchSuggestedPayments();
    setIsLoading(false);

    if (!result.success) {
      setShowToast(true);
    }
  };

  return (
    <IonPage>
      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message="Something went wrong"
        position="top"
        color="danger"
        duration={1000}
      />
      <IonHeader>
        <Toolbar history={history} />
      </IonHeader>
      <IonContent>
        <IonLoading isOpen={isLoading} message={"Loading..."} />
        <IonList lines="none" className="container">
          <IonRow>
            <IonButton onClick={navigateToNewPayment}>New Payment</IonButton>
          </IonRow>

          {suggestedPayments.map((payment) => (
            <PaymentComponent
              key={`${payment.paidBy.id}_${payment.paidTo.id}_${payment.amount}`}
              fromName={payment.paidBy.name}
              toName={payment.paidTo.name}
              amount={payment.amount}
              savePayment={() =>
                savePayment(payment.paidBy, payment.paidTo, payment.amount)
              }
            />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default SuggestedPayments;
