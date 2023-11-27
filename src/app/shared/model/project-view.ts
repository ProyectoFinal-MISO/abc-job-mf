import { Project } from "./project";
import { Tag } from "./tag";
import { Team } from "./team";

export interface ProjectView extends Project, Team {    
    personalSkills:Array<Tag>;
    technicalSkills:Array<Tag>;
    roles:Array<Tag>;  
}