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
    academicInformation:AcademicInformation;
    professionalExperience:ProfessionalExperience;
    aditionalInformation:AditionalInformation;
    programmingLanguages:Array<ProgrammingLanguage>;
    languages:Array<Language>;
    personalSkills:Array<PersonalSkill>;
}