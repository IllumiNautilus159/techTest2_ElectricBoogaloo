import type { ScratchCode } from "./ScratchCode";

export type CodeUser = {
    id:number;
    name:string;
    email:string;
    password:string;
    codes?: ScratchCode[]
}
