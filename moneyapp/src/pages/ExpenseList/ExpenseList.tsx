import {
  IonButton,
  IonCard,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonRow,
  IonText,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Toolbar from "../../components/Toolbar";
import { Expense } from "../../domain/expenses/Expense";
import ApiClient from "../../services/ApiClient";
import ExpenseComponent from "./ExpenseComponent";

import "./ExpenseList.css";

interface RouteParams {
  groupId: string
}



const ExpenseList: React.FC = () => {

  const { groupId } = useParams<RouteParams>();
  
  const [expenseList, setExpenseList] = useState(new Array<Expense>());

  const fetchExpenses = async () => {
    const expenses = await ApiClient.instance.getExpenses(parseInt(groupId));
    setExpenseList(expenses);
    console.log(expenses);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <Toolbar />
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          {expenseList.map((e) => (
            <ExpenseComponent
              key={e.id}
              title={e.name}
              amount={e.amount}
              author="Unknown"
            />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default ExpenseList;
