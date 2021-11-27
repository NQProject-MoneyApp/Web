import {
  IonContent,
  IonHeader,
  IonPage,
  IonRow,
  IonList,
  IonButton,
  IonLoading,
  useIonViewWillEnter,
} from "@ionic/react";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import { RouteComponentProps } from "react-router";
import Toolbar from "../../components/Toolbar";
import ApiClient from "../../services/ApiClient";

import "./SuggestedPayments.css";
import SuggestedPayment from "../../domain/groups/SuggestedPayment";
import PaymentComponent from "./PaymentComponent";

const SuggestedPayments: React.FC<RouteComponentProps> = ({ history }) => {
  const { groupId } = useParams<{ groupId: string }>();
  const [isLoading, setIsLoading] = useState(true);
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

  const navigateToNewPayment = () => {

  }

  return (
    <IonPage>
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
              savePayment={() => {return new Promise(()=>{})}}
            />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default SuggestedPayments;
