import { CodeUser } from "./UserType";
export type ScratchCode = {
    id:number;
    userId?:string|null;
    code:string;
    value:string;
    redeemed :boolean;
    createdAt?: Date|null;
    redeemedAt?: Date|null;
    owner?:CodeUser
};