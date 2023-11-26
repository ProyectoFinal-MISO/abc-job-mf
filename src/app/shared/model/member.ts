import { PersonalSkill } from "./personal-skill";
import { ProgrammingLanguages } from "./programming-language";

export interface Member {
    teamId?: number;
    userId?: number;
    isIntern: boolean;    
    role: number;
    name?: string;
    company?: string;
    personalSkills?: Array<PersonalSkill>
    technicalSkills?: Array<ProgrammingLanguages>
    photo?: string;
}
