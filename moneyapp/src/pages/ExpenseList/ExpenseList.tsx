import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonLoading,
  IonPage,
  useIonViewWillEnter,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { RouteComponentProps, useParams } from "react-router";
import IconButton from "../../components/IconButton";
import Toolbar from "../../components/Toolbar";
import { Expense } from "../../domain/expenses/Expense";
import ApiClient from "../../services/ApiClient";
import ExpenseComponent from "./ExpenseComponent";

import "./ExpenseList.css";

interface RouteParams {
  groupId: string;
}

const ExpenseList: React.FC<RouteComponentProps> = ({history}) => {
  const { groupId } = useParams<RouteParams>();

  const [expenseList, setExpenseList] = useState(new Array<Expense>());
  const [isLoading, setIsLoading] = useState(true);

  const navigateToAddExpense = () => {
    history.push(`/groups/${groupId}/expenses/add`);
  };

  const fetchExpenses = async () => {
    const expenses = await ApiClient.instance.getExpenses(parseInt(groupId));
    setExpenseList(expenses);
    console.log(expenses);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  useIonViewWillEnter(() => {
    fetchExpenses();
  });

  return (
    <IonPage>
      <IonHeader>
        <Toolbar history={history}/>
      </IonHeader>
      <IonContent fullscreen>
        <IonLoading isOpen={isLoading} message={"Loading..."} />
        <IonList lines="none" className="container">
          <IonButton onClick={navigateToAddExpense}>
            Add expense
          </IonButton>
          {expenseList.map((e) => (
            <ExpenseComponent
              key={e.id}
              groupId={e.groupId}
              expenseId={e.id}
              title={e.name}
              amount={e.amount}
              paidBy={e.paidBy}
            />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default ExpenseList;
