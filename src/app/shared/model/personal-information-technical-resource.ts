import { PersonalInformation } from "./personal-information";

export interface PersonalInformationTechnicalResource extends PersonalInformation{
    lastName:string;
    age:number;
    genre:string;
}