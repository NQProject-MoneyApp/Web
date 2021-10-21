import { User } from "../users/User";

export type Expense = {
    readonly id: number;
    readonly groupId: number;
    readonly name: string;
    readonly amount: number;
   
    readonly createDate?: string;
    readonly author: User;
    readonly participants: User[];
  };

  export default Expense;