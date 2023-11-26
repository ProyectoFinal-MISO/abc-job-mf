export interface Project {
    id?: number;
    projectName: string;
    companyId: number;
    details: string;
    startDate?:Date;
    endDate?:Date;
    status?:Boolean;
}
