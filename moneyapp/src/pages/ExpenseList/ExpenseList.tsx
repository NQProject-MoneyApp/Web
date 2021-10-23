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
  const [isLoading, setIsLoading] = useState(false);

  const navigateToAddExpense = () => {
    history.push(`/groups/${groupId}/expenses/add`);
  };

  const fetchExpenses = async () => {
    setIsLoading(true);
    const expenses = await ApiClient.instance.getExpenses(parseInt(groupId));
    setExpenseList(expenses);
    console.log(expenses);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <Toolbar history={history}/>
      </IonHeader>
      <IonContent fullscreen>
        <IonLoading isOpen={isLoading} message={"Loading..."} />
        <IonList lines="none" className="group-container">
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
              author={e.author}
            />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default ExpenseList;
