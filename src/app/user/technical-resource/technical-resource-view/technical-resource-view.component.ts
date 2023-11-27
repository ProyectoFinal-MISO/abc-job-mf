import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray, UntypedFormArray} from '@angular/forms';
import { ActivatedRoute, NavigationStart, NavigationExtras, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { UserSessionDto } from 'src/app/shared/model/user-session';
import { TechnicalResource } from 'src/app/shared/model/technical-resource';
import { TechnicalResourceService } from '../technical-resource.service';
import { UserSessionService } from 'src/app/shared/user-session/user-session.service';
import { AcademicInformation } from 'src/app/shared/model/academic-information';
import { Language } from 'src/app/shared/model/language';import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-technical-resource-view',
  templateUrl: './technical-resource-view.component.html',
  styleUrls: ['./technical-resource-view.component.scss']
})
export class TechnicalResourceViewComponent {
  helper = new JwtHelperService();
  userData: FormGroup;
  token: string | null;
  carga: boolean = false;
  user: TechnicalResource;
  localStageData: any;
  countries: any = [];
  states: any = [];
  cities: any= [];
  typesIdentification: any = [];
  genres: any = [];
  closeResult = '';
  url!: string;
  transferAvailabilities: any = [];
  datos: any;
  userId: number;
  educationLevels: any = [];
  professionalSectors: any = [];
  languages: any = [];

  constructor(
    private userService: TechnicalResourceService,
    private userSessionService: UserSessionService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private sharedService: SharedService,
    private route: ActivatedRoute
  ) {
    this.sharedService.setSite('View Profile');
   }

  ngOnInit(): void {
    this.transferAvailabilities = [{val:0, valaux:false, name:'No'},{val:1, valaux:true, name:'Yes'}];
    const userId = this.route.snapshot.paramMap.get('id');
    this.token = localStorage.getItem('token');
    this.userService.getUser(userId).subscribe(data => {
      this.user = data;
      if (this.token) {
        this.getProfessionalSectors();
        this.getEducationLevels();
        this.getLanguages();
        this.cleanData();
      } else {
      }
    });   
  }

  getCountries() {
    this.sharedService.getCountries().subscribe({
      next: (result:any) => {
        if(result){
          this.countries = result;          
        }
      },
      error: (e0:any) => {
        this.toastr.error(`Error`, e0, {
          progressBar: true,
        });
      }
    });
  }

  getStates() {
    this.sharedService.getStatesByCountry(Number(this.userData.get('personalInformation.country')?.value?.id)).subscribe({
      next: (result:any) => {
        if(result){
          this.states = result;
        }
      },
      error: (e0:any) => {
        this.toastr.error(`Error`, e0, {
          progressBar: true,
        });
      }
    });
  }

  getCities() {
    this.sharedService.getCitiesByState(Number(this.userData.get('personalInformation.state')?.value?.id)).subscribe({
      next: (result:any) => {
        if(result){
          this.cities = result;
        }
      },
      error: (e0:any) => {
        this.toastr.error(`Error`, e0, {
          progressBar: true,
        });
      }
    });
  }

  getTypesIdentification() {
    this.sharedService.getTypesIdentification().subscribe({
      next: (result:any) => {
        if(result){
          this.typesIdentification = result;
        }
      },
      error: (e0:any) => {
        this.toastr.error(`Error`, e0, {
          progressBar: true,
        });
      }
    });
  }

  getGenres() {
    this.sharedService.getGenres().subscribe({
      next: (result:any) => {
        if(result){
          this.genres = result;
           this.genres.filter((x:any) => x === this.user.personalInformation.genre.replace('"',""))
        }
      },
      error: (e0:any) => {
        this.toastr.error(`Error`, e0, {
          progressBar: true,
        });
      }
    });
  }

  getProfessionalSectors() {
    this.sharedService.getProfessionalSectors().subscribe({
      next: (result:any) => {
        if(result){
          this.professionalSectors = result;
          this.user.academicInformation.forEach( (x:AcademicInformation) => {
            const objAux = this.professionalSectors.find((y:any) => y.id ===x.professionalSector);
            x.professionalSector = objAux?objAux.name:x.professionalSector; 
          });
        }
      },
      error: (e0:any) => {
        this.toastr.error(`Error`, e0, {
          progressBar: true,
        });
      }
    });
  }

  getEducationLevels() {
    this.sharedService.getEducationLevels().subscribe({
      next: (result:any) => {
        if(result){
          this.educationLevels = result;
          this.user.academicInformation.forEach( (x:AcademicInformation) => {
            if(x.educationLevel){
              x.educationLevel =  this.educationLevels[Number(x.educationLevel)-1];
            }
          });
        }
      },
      error: (e0:any) => {
        this.toastr.error(`Error`, e0, {
          progressBar: true,
        });
      }
    });
  }

  getLanguages() {
    this.sharedService.getLanguages().subscribe({
      next: (result:any) => {
        if(result){
          this.languages = result;
          this.user.languages.forEach( (x:Language) => {
            const objAux = this.languages.find((y:any) => y.id ===x.id);
            x.language = objAux?objAux.name:x.language;
          });
        }
      },
      error: (e0:any) => {
        this.toastr.error(`Error`, e0, {
          progressBar: true,
        });
      }
    });
  }

  cleanData(){
    this.user.personalInformation.genre = this.user.personalInformation.genre.replaceAll('"',"").replaceAll('\\"',"");
    this.user.personalInformation.typeIdentification = this.user.personalInformation.typeIdentification.replaceAll('"',"").replaceAll('\\"',"");
    const aiAux = this.transferAvailabilities.find((x:any) => x.valaux ===this.user.aditionalInformation?.transferAvailability);
    this.user.aditionalInformation.transferAvailability = aiAux?aiAux.name:this.user.aditionalInformation.transferAvailability;
  }

  onUpdate(){
    this.router.navigate([`/technical-resource/update/` + this.user.id]);
  }

  onDelete(){
    this.router.navigate([`/technical-resource/delete/` + this.user.id]);
  }
}
