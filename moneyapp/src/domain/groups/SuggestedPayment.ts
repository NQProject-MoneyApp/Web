import { User } from "../users/User";



type SuggestedPayment = {
    paidBy: User,
    paidTo: User,
    amount: number,
};

export default SuggestedPayment;