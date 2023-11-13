import { PersonalInformationEmployee } from "./personal-information-employee";
import { User } from "./user";

export interface Employee extends User {
    email?:string;
    personalInformation:PersonalInformationEmployee;
    location:any;
}
