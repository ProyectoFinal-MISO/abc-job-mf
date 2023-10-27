import { AcademicInformation } from "./academic-information";
import { AditionalInformation } from "./aditional-information";
import { Language } from "./language";
import { PersonalInformationTechnicalResource } from "./personal-information-technical-resource";
import { PersonalSkill } from "./personal-skill";
import { ProfessionalExperience } from "./professional-experience";
import { ProgrammingLanguage } from "./programming-language";
import { User } from "./user";

export interface TechnicalResource extends User {
    email?:string;
    personalInformation:PersonalInformationTechnicalResource;
    academicInformation:Array<AcademicInformation>;
    professionalExperience:Array<ProfessionalExperience>;    
    programmingLanguages:Array<ProgrammingLanguage>;
    languages:Array<Language>;
    personalSkills:Array<PersonalSkill>;
    aditionalInformation:AditionalInformation;
}