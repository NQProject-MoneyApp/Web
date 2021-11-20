import {
  IonPage,
  IonHeader,
  IonContent,
  IonCard,
  IonList,
  IonRow,
  IonCardTitle,
  IonLoading,
  IonCardContent,
  IonCardSubtitle,
  IonCardHeader,
  IonButton,
  useIonViewWillEnter,
} from "@ionic/react";
import { RouteComponentProps } from "react-router";
import FlexSpacer from "../../components/common/Spacer";
import Toolbar from "../../components/Toolbar";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import ApiClient from "../../services/ApiClient";
import Expense from "../../domain/expenses/Expense";
import "./ExpenseDetails.css";
import moment from "moment";

const ExpenseDetails: React.FC<RouteComponentProps> = ({ history }) => {
  interface RouteParams {
    groupId: string;
    expenseId: string;
  }

  const [isLoading, setIsLoading] = useState(true);
  const [expenseDetails, setExpense] = useState<Expense | null>(null);
  const { groupId, expenseId } = useParams<RouteParams>();

  const fetchExpenseDetails = async () => {
    const expense = await ApiClient.instance.getExpense(
      parseInt(groupId),
      parseInt(expenseId)
    );
    console.log(expense);
    setExpense(expense);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchExpenseDetails();
  }, []);

  useIonViewWillEnter(() => {
    fetchExpenseDetails();
  });

  return (
    <IonPage>
      <IonHeader>
        <Toolbar history={history} />
      </IonHeader>
      <IonContent fullscreen>
        {!isLoading && (
          <>
            <IonLoading isOpen={isLoading} message={"Loading..."} />
            <IonCard color="light" className="expense-details-card">
              <IonCardHeader>
              <IonRow>
                  <IonCardTitle>Name</IonCardTitle>
                  <FlexSpacer flex={1} />
                  <IonCardTitle>{expenseDetails!.name}</IonCardTitle>
                </IonRow>
                <IonRow>
                  <IonCardTitle>Amount</IonCardTitle>
                  <FlexSpacer flex={1} />
                  <IonCardTitle>{expenseDetails!.amount}</IonCardTitle>
                </IonRow>
                <IonRow>
                  <IonCardTitle>Paid by</IonCardTitle>
                  <FlexSpacer flex={1} />
                  <IonCardTitle>{expenseDetails!.author.name}</IonCardTitle>
                </IonRow>
              </IonCardHeader>
            </IonCard>
            <IonCard color="light">
              <IonCardHeader ion-text-center>
                <IonCardSubtitle>Participants</IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent>
                {expenseDetails?.participants!.map((e) => (
                  <IonRow key={e.id}>
                  <h5>{e.name}</h5>
                  </IonRow>
                ))}
              </IonCardContent>
            </IonCard>
            <IonButton
              routerLink={`/groups/${groupId}/expenses/${expenseId}/edit`}
            >
              Edit
            </IonButton>
            <FlexSpacer height="1rem" />
            <h4>Created on</h4>
            <h4>{moment(expenseDetails!.createDate).format("DD.MM.YYYY")}</h4>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default ExpenseDetails;
