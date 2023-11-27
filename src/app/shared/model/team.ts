import { Member } from "./member";

export interface Team {
    projectId?: number;
    teamId?: number;
    teamName: string;
    members?: Array<Member>
}
