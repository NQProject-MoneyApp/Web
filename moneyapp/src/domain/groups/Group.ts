
// export enum MoneyAppIcon {
//     hamburger = 1,
//     beerHamburger = 2,
//     bowl = 3,
//     drinks = 4,
//     coffee = 5,
//     beers = 6,
//     kite = 7,
// }

import { User } from "../users/User";



type Group = {
    id: number,
    name: string,
    totalCost: number,
    userBalance: number,
    createDate: Date,
    icon: number,
    members: User[],
    isFavourite: boolean,
};

export default Group;