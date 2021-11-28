import {
  IonPage,
  IonHeader,
  IonContent,
  IonCard,
  IonRow,
  IonCardTitle,
  IonLoading,
  IonCardContent,
  IonCardHeader,
  IonButton,
  useIonViewWillEnter,
} from "@ionic/react";
import { RouteComponentProps } from "react-router";
import FlexSpacer from "../../components/common/Spacer";
import Toolbar from "../../components/Toolbar";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import ApiClient, { ExpenseType } from "../../services/ApiClient";
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
            <IonCardHeader ion-text-center>
                <IonCardTitle className="expense-type">{expenseDetails!.type}</IonCardTitle>
              </IonCardHeader>
              <IonCardHeader>
                {expenseDetails!.type === ExpenseType.expense && <IonRow>
                  <IonCardTitle className="expense-label">Name</IonCardTitle>
                  <FlexSpacer flex={1} />
                  <IonCardTitle className="expense-label">{expenseDetails!.name}</IonCardTitle>
                </IonRow>}
                <IonRow>
                  <IonCardTitle className="expense-label">Amount</IonCardTitle>
                  <FlexSpacer flex={1} />
                  <IonCardTitle className="expense-label">${expenseDetails!.amount}</IonCardTitle>
                </IonRow>
                <IonRow>
                  <IonCardTitle className="expense-label">Paid by</IonCardTitle>
                  <FlexSpacer flex={1} />
                  <IonCardTitle className="expense-label">{expenseDetails!.paidBy}</IonCardTitle>
                </IonRow>
                {expenseDetails!.type === ExpenseType.payment && <IonRow>
                  <IonCardTitle className="expense-label">Paid To</IonCardTitle>
                  <FlexSpacer flex={1} />
                  <IonCardTitle className="expense-label">{expenseDetails!.paidTo}</IonCardTitle>
                </IonRow>}
              </IonCardHeader>
            </IonCard>
            <IonCard color="light">
              <IonCardHeader ion-text-center>
                <IonCardTitle className="expense-label">Participants</IonCardTitle>
              </IonCardHeader>
              <IonCardContent className="participants-list">
                {expenseDetails?.participants!.map((e) => (
                  <IonRow key={e.id}>
                    {e.name}
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

            <h4 className="label">Created by</h4>
            <h4 className="value">
              {expenseDetails!.author.name}
            </h4>
            <FlexSpacer height="1rem" />

            <h4 className="label">Created on</h4>
            <h4 className="value">
              {moment(expenseDetails!.createDate).format("DD.MM.YYYY")}
            </h4>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default ExpenseDetails;
