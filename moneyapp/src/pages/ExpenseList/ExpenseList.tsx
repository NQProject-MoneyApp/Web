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
import FlexSpacer from "../../components/common/Spacer";
import Toolbar from "../../components/Toolbar";
import { Expense } from "../../domain/expenses/Expense";
import { User } from "../../domain/users/User";
import ExpenseComponent from "./ExpenseComponent";

import "./ExpenseList.css";

const ExpenseList: React.FC = () => {
  const expenses: Expense[] = [
    {
      pk: 1,
      name: "Whisky",
      amount: 10,
      groupId: 1,
    },
    {
      pk: 2,
      name: "Dirty Vegan Dancer",
      amount: 12,
      groupId: 1,
    },
    {
      pk: 3,
      name: "Faloviec",
      amount: 120,
      groupId: 1,
    },
  ];

  return (
    <IonPage>
      <IonHeader>
        <Toolbar />
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          {expenses.map((e) => {
            return (
              <ExpenseComponent
                key={e.pk}
                title={e.name}
                amount={e.amount}
                author="Unknown"
              />
            );
          })}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default ExpenseList;
