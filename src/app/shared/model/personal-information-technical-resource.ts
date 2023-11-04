import { PersonalInformation } from "./personal-information";

export interface PersonalInformationTechnicalResource extends PersonalInformation{
    lastName:string;
    birthdate?:Date;
    genre:string;
    photo:string;
}