import { User } from "../users/User";

export type Expense = {
    readonly pk: number;
    readonly groupId: number;
    readonly name: string;
    readonly amount: number;
   
    // readonly createDate?: Date;
  //   readonly author: User;
  //   readonly participants: User[];
  };
