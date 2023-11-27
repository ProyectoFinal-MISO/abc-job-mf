import { Component } from '@angular/core';
import { TechnicalResource } from 'src/app/shared/model/technical-resource';
import { CandidateService } from '../candidate.service';
import { ProjectService } from 'src/app/project/project.service';
import { UserSessionService } from 'src/app/shared/user-session/user-session.service';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/shared.service';
import { PrimeNGConfig } from 'primeng/api';
import { ProjectView } from 'src/app/shared/model/project-view';
import { Table } from 'primeng/table';
import { TechnicalResourceService } from 'src/app/user/technical-resource/technical-resource.service';
import { ProgrammingLanguages } from 'src/app/shared/model/programming-language';
import { PersonalSkill } from 'src/app/shared/model/personal-skill';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-find-candidate',
  templateUrl: './find-candidate.component.html',
  styleUrls: ['./find-candidate.component.scss']
})
export class FindCandidateComponent {

  technicalResources: TechnicalResource[]=[];
  personalSkills: any[] = [];
  technicalSkills: any[] = [];
  loading: boolean = true;
  activityValues: number[] = [0, 100];
  projects!: ProjectView[];
  projectFilter: ProjectView;
  project: ProjectView;
  usserSessionData:any;

  constructor(private projectService: ProjectService, 
    private userSessionService: UserSessionService,
    private userService: TechnicalResourceService,
    private candidateService: CandidateService,
    private router: Router,
    private sharedService: SharedService,
    private toastr: ToastrService,
    private primengConfig: PrimeNGConfig) {
      this.sharedService.setSite('Select Candidates');
      this.usserSessionData =  this.userSessionService.getUserSession();
    }

  ngOnInit() {
    if(!this.sharedService.getMockMode()){
      this.projectService.getProjectByCompany(this.usserSessionData.id).subscribe((data:any) => {        
        if (data) {
          this.projects = data;
        } else {
          
        }
      });
    } else {
      this.projects = [{
        projectId:1,
        companyId: 1,
        details: "loreim ipsuem",
        personalSkills:[],
        projectName: "Vanguard",
        roles:[],
        teamName: "Macondo",
        technicalSkills:[]
      },
      {
        projectId:2,
        companyId: 1,
        details: "loreim ipsuem",
        personalSkills:[],
        projectName: "Cranberry",
        roles:[],
        teamName: "DevHorses",
        technicalSkills:[]
      },{
        projectId:3,
        companyId: 1,
        details: "loreim ipsuem",
        personalSkills:[],
        projectName: "Cretta",
        roles:[],
        teamName: "Apolo",
        technicalSkills:[]
      },{
        projectId:4,
        companyId: 1,
        details: "loreim ipsuem",
        personalSkills:[],
        projectName: "Epsilon",
        roles:[],
        teamName: "Marmot",
        technicalSkills:[]
      },{
        projectId:5,
        companyId: 1,
        details: "loreim ipsuem",
        personalSkills:[],
        projectName: "Avva",
        roles:[],
        teamName: "Delta",
        technicalSkills:[]
      },{
        projectId:6,
        companyId: 1,
        details: "loreim ipsuem",
        personalSkills:[],
        projectName: "Anubis",
        roles:[],
        teamName: "Nilo",
        technicalSkills:[]
      }];
      this.loading = false;
    }
  }

  clear(table: Table) {
      table.clear();
  }

  getProject(){
    if(!this.sharedService.getMockMode()){
      this.projectService.getProject(this.projectFilter.projectId).subscribe((data:any) => {        
        if (data) {
          this.project = data;
        // this.cleanData();
        } else {
        }
      });  
    }else{
      this.project = {
        projectId:1,
        companyId: 1,
        details: "Varguard es un proyecto de intercambio de documentos entre transportadoras de mercancía",
        teamId: 1,
        teamName: "Macondo",
        startDate: new Date('2023-01-02'),
        endDate: new Date('2023-12-02'),
        id:1,
        status: true,
        personalSkills:[{id:1, name:"Responsable"}, {id:2, name:"Prompt"}, {id:3, name:"Lead"}, 
        {id:4, name:"Smart"}, {id:5, name:"Patient"}],
        projectName: "Vanguard",
        roles:[{id:1, name:"Developer"}, {id:2, name:"Tester"}, {id:3, name:"Devops"}, 
        {id:4, name:"Leader"}, {id:5, name:"Architect"}, {id:6, name:"Ui/Ux"}],        
        technicalSkills:[{id:1, name:"Python"}, {id:2, name:"SQL"}, {id:3, name:"Angular"}, 
        {id:4, name:"Docker"}, {id:5, name:"C#"}, {id:6, name:"React"}, {id:7, name:"Cypress"},
        {id:8, name:"GCP"}, {id:9, name:"Jira"}, {id:10, name:"Figma"}, {id:11, name:"Pipeline"}, 
        {id:12, name:"JMeter"}],
        members: [
          {id:1, name: "Pepito Perez",teamId: 1, userId:1, role: 1, company:"Endava", isIntern:false, 
          technicalSkills:[{id:1, name:"Python", score:5}, {id:3, name:"Angular", score:3}, {id:4, name:"Docker", score:2}],
          personalSkills:[{id:1, name:"Responsable", score:5}, {id:2, name:"Prompt", score:4}, {id:4, name:"Smart", score:5}]
          }, 
          {id:2, name: "Fulanito Sevilla",teamId: 1, userId:4, role: 2, company:"Endava", isIntern:false, 
          technicalSkills:[{id:7, name:"Cypress", score:5}, {id:12, name:"JMeter", score:3}],
          personalSkills:[{id:1, name:"Responsable", score:5}, {id:2, name:"Prompt", score:4}, {id:4, name:"Smart", score:5}]
          }, 
          {id:3, name: "Kika Dorada",teamId: 1, userId:5, role: 3, company:"Endava", isIntern:true, 
          technicalSkills:[{id:4, name:"Docker", score:4}, {id:11, name:"Pipeline", score:5}],
          personalSkills:[{id:1, name:"Responsable", score:5}, {id:2, name:"Prompt", score:4}, {id:4, name:"Smart", score:5}]
          }, 
          {id:4, name: "Sutanita Veracruz",teamId: 1, userId:6, role: 4, company:"Endava", isIntern:true, 
          technicalSkills:[{id:9, name:"Jira", score:5}],
          personalSkills:[{id:1, name:"Responsable", score:5}, {id:2, name:"Prompt", score:4}, {id:4, name:"Smart", score:5}, 
          {id:5, name:"Patient", score:3}, {id:3, name:"Lead", score:5}]
          }, 
          {id:5, name: "Ali Aranzazu",teamId: 1, userId:7, role: 5, company:"Endava", isIntern:false, 
          technicalSkills:[{id:1, name:"Python", score:4}, {id:3, name:"Angular", score:2}, {id:4, name:"Docker", score:5},{id:8, name:"GCP", score:5}],
          personalSkills:[{id:1, name:"Responsable", score:5}, {id:2, name:"Prompt", score:4}, {id:4, name:"Smart", score:5}]
          }
        ]
      }
      this.loading = true;
      this.technicalSkills = this.project.technicalSkills;
      this.personalSkills = this.project.personalSkills;
      this.getTechnicalResources();
    }
  }

 async getTechnicalResources(){
  let i=0;
  let j=0; 
    if(!this.sharedService.getMockMode()){
      this.userService.getUsers().subscribe((data:any) => {        
        if (data) {
          this.technicalResources = data;
        // this.cleanData();
        } else {
        }
      });  
    }else{
      this.technicalResources = [
        { id:1,
          username: "recursotecnico3@test.com",
          userType: "PERSON",
          email: "recursotecnico3@test.com",
          personalInformation: {
            photo: "",
            name: "Lalo",
            lastName: "Lolez",
            birthdate: new Date("1992-03-01"),
            genre: "MALE",
            typeIdentification: "CC",
            identification: "1111111111",
            phoneNumber: "3111111111",
            mobileNumber: "3111111111",
            city: "2",
            state: "2",
            country: "1",
            address: "CL 55 25 46 AP 101 ED RESTREPO"
          },
          aditionalInformation: {
            driverLicense: "753951",
            transferAvailability: 1,
            vehicule: "auto"
          },
          academicInformation: [
            {
              schoolName: "U Caldas",
              educationLevel: "PROFESSIONAL",
              professionalSector: "2",
              startDate: new Date("2009-08-10"),
              endDate: new Date("2015-01-30")
            }
          ],
          professionalExperience: [
            {
              titleJob: "Senior Technician",
              companyName: "Endava",
              details: "Desarrollador fullstack para el cliente Kinetic Advantage para los proyectos Vanguard y Darkhorse",
              startDate: new Date("2021-11-22"),
              endDate: new Date("2023-11-22")
            }
          ],
          programmingLanguages: [
            {name: "C#", score: 5},
            {name: "Java", score: 4}
          ],
          languages: [
            {language: "1", score: 1},
            {language: "2", score: 3}
          ],
          personalSkills: [
            {name: "Smart", score: 4},
            {name: "Patient", score: 5}
          ],
          technicalSkillsFilter: "",
          personalSkillsFilter:""
        },
        {
          id:2,
          username: "candidata@test.com",
          userType: "PERSON",
          email: "candidata@test.com",
          personalInformation: {
            photo: "",
            name: "Lupe",
            lastName: "Monterrey",
            birthdate: new Date("1992-03-01"),
            genre: "FEMALE",
            typeIdentification: "CC",
            identification: "1111111111",
            phoneNumber: "3111111111",
            mobileNumber: "3111111111",
            city: "2",
            state: "2",
            country: "1",
            address: "CL 55 25 46 AP 101 ED RESTREPO"
          },
          aditionalInformation: {
            driverLicense: "753951",
            transferAvailability: 1,
            vehicule: "auto"
          },
          academicInformation: [
            {
              schoolName: "U Caldas",
              educationLevel: "PROFESSIONAL",
              professionalSector: "2",
              startDate: new Date("2009-08-10"),
              endDate: new Date("2015-01-30")
            }
          ],
          professionalExperience: [
            {
              titleJob: "Senior Technician",
              companyName: "Endava",
              details: "Desarrollador fullstack para el cliente Kinetic Advantage para los proyectos Vanguard y Darkhorse",
              startDate: new Date("2021-11-22"),
              endDate: new Date("2023-11-22")
            }
          ],
          programmingLanguages: [
            {name: "Python", score: 5},
            {name: "Docker", score: 5}
          ],
          languages: [
            {language: "1", score: 1},
            {language: "2", score: 3}
          ],
          personalSkills: [
            {name: "Smart", score: 5},
            {name: "Patient", score: 5}
          ],
          technicalSkillsFilter: "",
          personalSkillsFilter:""
        },
        {
          id:3,
          username: "test001@test.com",
          userType: "PERSON",
          email: "test001@test.com",
          personalInformation: {
            photo: "",
            name: "Juanito",
            lastName: "Juarez",
            birthdate: new Date("1992-03-01"),
            genre: "MALE",
            typeIdentification: "CC",
            identification: "1111111111",
            phoneNumber: "3111111111",
            mobileNumber: "3111111111",
            city: "2",
            state: "2",
            country: "1",
            address: "CL 55 25 46 AP 101 ED RESTREPO"
          },
          aditionalInformation: {
            driverLicense: "753951",
            transferAvailability: 1,
            vehicule: "auto"
          },
          academicInformation: [
            {
              schoolName: "U Caldas",
              educationLevel: "PROFESSIONAL",
              professionalSector: "2",
              startDate: new Date("2009-08-10"),
              endDate: new Date("2015-01-30")
            }
          ],
          professionalExperience: [
            {
              titleJob: "Senior Technician",
              companyName: "Endava",
              details: "Desarrollador fullstack para el cliente Kinetic Advantage para los proyectos Vanguard y Darkhorse",
              startDate: new Date("2021-11-22"),
              endDate: new Date("2023-11-22")
            }
          ],
          programmingLanguages: [
            {name: "Jira", score: 4},
            {name: "Docker", score: 5}
          ],
          languages: [
            {language: "1", score: 1},
            {language: "2", score: 3}
          ],
          personalSkills: [
            {name: "Smart", score: 5},
            {name: "Lead", score: 5}
          ],
          technicalSkillsFilter: "",
          personalSkillsFilter:""
        },
        {
          id:4,
          username: "lola@test.com",
          userType: "PERSON",
          email: "lola@test.com",
          personalInformation: {
            photo: "",
            name: "Lola",
            lastName: "Tabio",
            birthdate: new Date("1992-03-01"),
            genre: "FEMALE",
            typeIdentification: "CC",
            identification: "1111111111",
            phoneNumber: "3111111111",
            mobileNumber: "3111111111",
            city: "2",
            state: "2",
            country: "1",
            address: "CL 55 25 46 AP 101 ED RESTREPO"
          },
          aditionalInformation: {
            driverLicense: "753951",
            transferAvailability: 1,
            vehicule: "auto"
          },
          academicInformation: [
            {
              schoolName: "U Caldas",
              educationLevel: "PROFESSIONAL",
              professionalSector: "2",
              startDate: new Date("2009-08-10"),
              endDate: new Date("2015-01-30")
            }
          ],
          professionalExperience: [
            {
              titleJob: "Senior Technician",
              companyName: "Endava",
              details: "Desarrollador fullstack para el cliente Kinetic Advantage para los proyectos Vanguard y Darkhorse",
              startDate: new Date("2021-11-22"),
              endDate: new Date("2023-11-22")
            }
          ],
          programmingLanguages: [
            {name: "Angular", score: 4},
            {name: "React", score: 3}
          ],
          languages: [
            {language: "1", score: 1},
            {language: "2", score: 3}
          ],
          personalSkills: [
            {name: "Smart", score: 1},
            {name: "Patient", score: 5}
          ],
          technicalSkillsFilter: "",
          personalSkillsFilter:""
        },
        {
          id:5,
          username: "ali@test.com",
          userType: "PERSON",
          email: "ali@test.com",
          personalInformation: {
            photo: "",
            name: "Ali",
            lastName: "Alferez",
            birthdate: new Date("1992-03-01"),
            genre: "MALE",
            typeIdentification: "CC",
            identification: "1111111111",
            phoneNumber: "3111111111",
            mobileNumber: "3111111111",
            city: "2",
            state: "2",
            country: "1",
            address: "CL 55 25 46 AP 101 ED RESTREPO"
          },
          aditionalInformation: {
            driverLicense: "753951",
            transferAvailability: 1,
            vehicule: "auto"
          },
          academicInformation: [
            {
              schoolName: "U Caldas",
              educationLevel: "PROFESSIONAL",
              professionalSector: "2",
              startDate: new Date("2009-08-10"),
              endDate: new Date("2015-01-30")
            }
          ],
          professionalExperience: [
            {
              titleJob: "Senior Technician",
              companyName: "Endava",
              details: "Desarrollador fullstack para el cliente Kinetic Advantage para los proyectos Vanguard y Darkhorse",
              startDate: new Date("2021-11-22"),
              endDate: new Date("2023-11-22")
            }
          ],
          programmingLanguages: [
            {name: "Php", score: 5},
            {name: "Python", score: 5}
          ],
          languages: [
            {language: "1", score: 1},
            {language: "2", score: 3}
          ],
          personalSkills: [
            {name: "Smart", score: 5}
          ],
          technicalSkillsFilter: "",
          personalSkillsFilter:""
        }
      ];
      
      await this.technicalResources.forEach((obj:TechnicalResource) => {    
        i=0;
        j=0;    
         obj.programmingLanguages.forEach((obj2:ProgrammingLanguages) => {
          if(i===0){
          obj.technicalSkillsFilter = obj2.name;
          }else{
          obj.technicalSkillsFilter = obj.technicalSkillsFilter + ", " + obj2.name;
          }
          i++;
        });
        obj.personalSkills.forEach((obj2:PersonalSkill) => {
          if(j===0){
            obj.personalSkillsFilter = obj2.name;
            }else{
              obj.personalSkillsFilter = obj.personalSkillsFilter + ", " + obj2.name;
            }
            j++;        
       });
        
      });
      this.loading = false;
    }
  }

  async SelectUser(user:TechnicalResource) {
    if(!this.sharedService.getMockMode()){
    const candidate = {
      userId : user.id,
      projectId : this.project.id
    }
    this.candidateService.requestByCompany(candidate).subscribe({
          next: (response: any) => {
            this.toastr.success(`User was requested`, 'Success', {
              progressBar: true,
            });
          },
          error: (e0: any) => {
            this.toastr.error(`Error with your request`, 'Error, ' + e0, {
              progressBar: true,
            });
          },
          complete: () => {
            console.log('delete0')
          }
    });
  }else{
    this.toastr.success(`User was requested`, 'Success', {
      progressBar: true,
    });
  }    
  }
}
