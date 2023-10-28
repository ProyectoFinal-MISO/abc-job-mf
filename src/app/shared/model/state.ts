import { City } from "./city";

export interface State{
    id:number;
    code:string;
    name:string;
    countryId?:number;
    cities?:Array<City>;
}