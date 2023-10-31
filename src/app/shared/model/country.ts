import { State } from "@popperjs/core";

export interface Country{
    id:number;
    code:string;
    name:string;
    states?:Array<State>;
}