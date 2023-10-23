import { PersonalInformation } from "./personal-information";
import { User } from "./user";

export interface Company extends User {
    email?:string;
    personalInformation:PersonalInformation;
}