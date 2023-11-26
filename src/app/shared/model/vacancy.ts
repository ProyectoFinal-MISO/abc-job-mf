export interface Vacancy {
    projectId?: number;
    name: string;
    details: string;
    places?: number;
    roles: Array<number>;
    technicalSkills: Array<number>;
    softSkills: Array<number>;
}
