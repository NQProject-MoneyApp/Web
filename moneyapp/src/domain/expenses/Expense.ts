import { ExpenseType } from "../../services/ApiClient";
import { User } from "../users/User";

export type Expense = {
    readonly id: number;
    readonly groupId: number;
    readonly name: string;
    readonly amount: number;
    readonly type: ExpenseType;
    readonly createDate?: string;
    readonly author: User;
    readonly paidBy: string;
    readonly paidTo: string;
    readonly participants: User[];
  };

  export default Expense;
