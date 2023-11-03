import { AcademicInformation } from "./academic-information";
import { AditionalInformation } from "./additional-information";
import { Language } from "./language";
import { PersonalInformationTechnicalResource } from "./personal-information-technical-resource";
import { PersonalSkill } from "./personal-skill";
import { ProfessionalExperiences } from "./professional-experience";
import { ProgrammingLanguages } from "./programming-language";
import { User } from "./user";

export interface TechnicalResource extends User {
    email?:string;
    personalInformation:PersonalInformationTechnicalResource;
    academicInformation:Array<AcademicInformation>;
    professionalExperience:Array<ProfessionalExperiences>;
    programmingLanguages:Array<ProgrammingLanguages>;
    languages:Array<Language>;
    personalSkills:Array<PersonalSkill>;
    aditionalInformation:AditionalInformation;
}
