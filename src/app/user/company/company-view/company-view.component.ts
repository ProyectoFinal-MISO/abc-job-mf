import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray, UntypedFormArray} from '@angular/forms';
import { ActivatedRoute, NavigationStart, NavigationExtras, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { UserSessionDto } from 'src/app/shared/model/user-session';
import { Company } from 'src/app/shared/model/company';
import { CompanyService } from '../company.service';
import { UserSessionService } from 'src/app/shared/user-session/user-session.service';
import { Location } from '@angular/common';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AcademicInformationComponent } from '../../academic-information/academic-information.component';
import { AcademicInformation } from 'src/app/shared/model/academic-information';
import { ProfessionalExperiences } from 'src/app/shared/model/professional-experience';
import { Language } from 'src/app/shared/model/language';
import { PersonalSkill } from 'src/app/shared/model/personal-skill';
import { ProgrammingLanguages } from 'src/app/shared/model/programming-language';
import { ProfessionalExperienceComponent } from '../../professional-experience/professional-experience.component';
import { ProgrammingLanguageComponent } from '../../programming-language/programming-language.component';
import { LanguageComponent } from '../../language/language.component';
import { PersonalSkillComponent } from '../../personal-skill/personal-skill.component';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-company-view',
  templateUrl: './company-view.component.html',
  styleUrls: ['./company-view.component.scss']
})
export class CompanyViewComponent {
  @Input() userSessionDto!: UserSessionDto;

  helper = new JwtHelperService();
  userData: FormGroup;
  token: string | null;
  carga: boolean = false;
  user: Company;
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

  constructor(
    private userService: CompanyService,
    private userSessionService: UserSessionService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private sharedService: SharedService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.transferAvailabilities = [{val:0, valaux:false, name:'No'},{val:1, valaux:true, name:'Yes'}];
    const userId = this.route.snapshot.paramMap.get('id');
    this.token = localStorage.getItem('token');
    this.userService.getUser(userId).subscribe(data => {
      this.user = data;
      if (this.token) {
      } else {
      }
    });   
  }



















  changeCountry(e:any) {
    console.log(e.value)
    this.countries.setValue(e.target.value, {onlySelf: true});
  }

  changeState(e:any) {
    console.log(e.value)
    this.states.setValue(e.target.value, {onlySelf: true});
  }

  changeCity(e:any) {
    console.log(e.value)
    this.cities.setValue(e.target.value, {onlySelf: true});
  }

  changeTypeIdentification(e:any) {
    console.log(e.value)
    this.typesIdentification.setValue(e.target.value, {onlySelf: true});
  }

  changeGenre(e:any) {
    console.log(e.value)
    this.genres.setValue(e.target.value, {onlySelf: true});
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
        }
      },
      error: (e0:any) => {
        this.toastr.error(`Error`, e0, {
          progressBar: true,
        });
      }
    });
  }

}
