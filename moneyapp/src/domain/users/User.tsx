export class User {
    constructor(
        public pk: number,
        public name: string,
        public email: string,
        public balance: number,
    ) {}
}