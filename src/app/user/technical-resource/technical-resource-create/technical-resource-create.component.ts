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
  selector: 'app-technical-resource-create',
  templateUrl: './technical-resource-create.component.html',
  styleUrls: ['./technical-resource-create.component.scss']
})
export class TechnicalResourceCreateComponent {
  @Input() userSessionDto!: UserSessionDto;

  helper = new JwtHelperService();
  userForm: FormGroup;
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

  constructor(
    private userService: TechnicalResourceService,
    private userSessionService: UserSessionService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private location: Location,
    private modalService: NgbModal,
    private sharedService: SharedService
  ) {
    this.localStageData = location.getState(); // do what you want
  }

  createForm(){
    this.userForm = this.formBuilder.group({
      username: [this.userSessionDto.username, [Validators.required, Validators.email]],
      password: [this.userSessionDto.password, [Validators.required, Validators.maxLength(50), Validators.minLength(4)]],
      confirmPassword: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(4)]],
      userType: [this.userSessionDto.userType, [Validators.required]],
      email: [this.userSessionDto.username, [Validators.required, Validators.email]],
      personalInformation: this.formBuilder.group({
        photo: [''],
        name: ['', [Validators.required, Validators.minLength(1)]],
        lastName: ['', [Validators.required, Validators.minLength(1)]],
        birthdate: ['', [Validators.required, Validators.min(18)]],
        genre: [''],
        typeIdentification: ['', [Validators.required]],
        identification: ['', [Validators.required, Validators.minLength(1)]],
        phoneNumber: ['', [Validators.required]],
        mobileNumber: [''],
        city: [''],
        state: [''],
        country: [''],
        address: ['']
      }),
      additionalInformation: this.formBuilder.group({
        driverLicense: [''],
        transferAvailability: [''],
        vehicle: ['']
      }),
      academicInformation: new UntypedFormArray([]),
      professionalExperience: new UntypedFormArray([]),
      programmingLanguages: new UntypedFormArray([]),
      languages: new UntypedFormArray([]),
      personalSkills: new UntypedFormArray([])
    });

    this.userForm.get('academicInformation') as FormArray<FormGroup>;
    this.userForm.get('professionalExperience') as FormArray<FormGroup>;
    this.userForm.get('programmingLanguages') as FormArray<FormGroup>;
    this.userForm.get('languages') as FormArray<FormGroup>;
    this.userForm.get('personalSkills') as FormArray<FormGroup>;
    this.initAcademicInformationFormGroup();
    this.initProfessionalExperienceFormGroup();
    this.readFile();
  }

  ngOnInit() {
    this.token = localStorage.getItem('token');
    if (this.token) {
      const decodedToken = this.helper.decodeToken(this.token);
      this.router.navigate([`/home`]);
      //this.router.navigate([`/carreras/${decodedToken.sub}/${this.token}`]);
    } else {
      if(this.localStageData && this.localStageData?.data && !this.userSessionDto){
          this.userSessionDto = this.localStageData?.data as UserSessionDto;
          this.createForm();
          this.getCountries();
          this.getTypesIdentification();
          this.getGenres();
          this.transferAvailabilities = [{val:0, name:'No'},{val:1, name:'Yes'}];
          this.carga = true;
      }
    }
  }

  get getAcademicInformations() {
    return this.userForm.get('academicInformation') as FormArray<FormGroup>;
  }

  get getProfessionalExperiences() {
    return this.userForm.get('professionalExperience') as FormArray<FormGroup>;
  }

  get getProgrammingLanguages() {
    return this.userForm.get('programmingLanguages') as FormArray<FormGroup>;
  }

  get getLanguages() {
    return this.userForm.get('languages') as FormArray<FormGroup>;
  }

  get getPersonalSkills() {
    return this.userForm.get('personalSkills') as FormArray<FormGroup>;
  }

  initAcademicInformationFormGroup() {
    return this.formBuilder.group({
      schoolName:new FormControl(''),
      educationLevel:new FormControl(''),
      professionalSector:new FormControl(''),
      startDate:new FormControl(''),
      endDate:new FormControl('')
    });
  }

  initProfessionalExperienceFormGroup() {
    return this.formBuilder.group({
      titleJob:new FormControl(''),
      companyName:new FormControl(''),
      details:new FormControl(''),
      startDate:new FormControl(''),
      endDate:new FormControl('')
    });
  }

  initProgrammingLanguagesFormGroup() {
    return this.formBuilder.group({
      name:new FormControl(''),
      score:new FormControl('')
    });
  }

  initLanguagesFormGroup() {
    return this.formBuilder.group({
      language:new FormControl(''),
      score:new FormControl('')
    });
  }

  initPersonalSkillsFormGroup() {
    return this.formBuilder.group({
      name:new FormControl(''),
      score:new FormControl('')
    });
  }

  handleFileInput(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    const file = files[0];
    this.userForm.value.Photo = file;
    if (file) this.saveFile(file);
  }

  saveFile(file: File) {
    const reader = new FileReader();
    reader.onloadend = () => {
      console.log(reader.result);
      this.url = reader.result as string;
      localStorage.setItem('profile', reader.result as string);
    };
   reader.readAsDataURL(file);
  }

  clearFile() {
    localStorage.removeItem('profile');
    this.readFile();
  }

  readFile() {
    const profile = localStorage.getItem('profile');
    if (profile) {
      this.url = profile;
      const contentType = profile.split(';')[0].replace('data:', '');
      const file = new File([profile], 'profile.jpeg', {
        type: contentType,
      });
      this.userForm.value.Photo = file;
    } else {
      this.url = '';
    }
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  showError(error: string) {
    this.toastr.error(error, 'Error');
  }

  showSuccess() {
    this.toastr.success(`Se ha registrado exitosamente`, 'Registro exitoso');
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

  goAddPersonalSkill() {
    this.modalService.open(PersonalSkillComponent, {ariaLabelledBy: 'myModalLabel',  backdrop: 'static' }).result.then((result) => {
      if(result){
        this.addPersonalSkills(result);
      }
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  goAddProfessionalExperience() {
    this.modalService.open(ProfessionalExperienceComponent, {ariaLabelledBy: 'myModalLabel',  backdrop: 'static' }).result.then((result) => {
      if(result){
        this.addProfessionalExperience(result);
      }
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  goAddProgrammingLanguages() {
    this.modalService.open(ProgrammingLanguageComponent, {ariaLabelledBy: 'myModalLabel',  backdrop: 'static' }).result.then((result) => {
      if(result){
        this.addProgrammingLanguages(result);
      }
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  goAddLanguage() {    
    this.modalService.open(LanguageComponent, {ariaLabelledBy: 'myModalLabel',  backdrop: 'static' }).result.then((result) => {
      if(result){
        this.addLanguages(result);
      }
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  goAddAcademicInformation() {
    this.modalService.open(AcademicInformationComponent, {ariaLabelledBy: 'myModalLabel',  backdrop: 'static' }).result.then((result) => {
      if(result){
        this.addAcademicInformation(result);
      }
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  addAcademicInformation(data:any) {
    const myObjAux = data as AcademicInformation;
    this.getAcademicInformations.push(this.formBuilder.group({
      schoolName:myObjAux?.schoolName,
      educationLevel:myObjAux?.educationLevel,
      professionalSector:myObjAux?.professionalSector,
      startDate:myObjAux?.startDate,
      endDate:myObjAux?.endDate
    })
    );
  }

  addProfessionalExperience(data:any) {
    const myObjAux = data as ProfessionalExperiences;
    this.getProfessionalExperiences.push(this.formBuilder.group({
      titleJob:myObjAux?.titleJob,
      companyName:myObjAux?.companyName,
      details:myObjAux?.details,
      startDate:myObjAux?.startDate,
      endDate:myObjAux?.endDate
    })
    );
  }

  addProgrammingLanguages(data:any) {
    const myObjAux = data as ProgrammingLanguages;
    this.getProgrammingLanguages.push(this.formBuilder.group({
      name:myObjAux?.name,
      score:myObjAux?.score.toString()
    })
    );
  }

  addLanguages(data:any) {
    const myObjAux = data as Language;
    this.getLanguages.push(this.formBuilder.group({
      language:myObjAux?.language,
      score:myObjAux?.score.toString()
    })
    );
  }

  addPersonalSkills(data:any) {
    const myObjAux = data as PersonalSkill;
    this.getPersonalSkills.push(this.formBuilder.group({
      name:myObjAux?.name,
      score:myObjAux?.score.toString()
    })
    );
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
    this.sharedService.getStatesByCountry(Number(this.userForm.get('personalInformation.country')?.value?.id)).subscribe({
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
    this.sharedService.getCitiesByState(Number(this.userForm.get('personalInformation.state')?.value?.id)).subscribe({
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

  async addUser() {
    let userAux = { ...this.userForm.value };
    userAux.personalInformation.city = userAux?.personalInformation?.city?.id ? userAux?.personalInformation?.city?.id : '';
    userAux.personalInformation.state = userAux?.personalInformation?.state?.id ? userAux?.personalInformation?.state?.i : '';
    userAux.personalInformation.country = userAux?.personalInformation?.country?.id ? userAux?.personalInformation?.country?.id: '';
    userAux.additionalInformation.transferAvailability = userAux?.additionalInformation?.transferAvailability?.val ? userAux?.additionalInformation?.transferAvailability?.val: '';

    await userAux.academicInformation.forEach((obj:any) => {
      obj.professionalSector = obj.professionalSector?.id ? obj.professionalSector?.id : '';
    });

    await userAux.languages.forEach((obj:any) => {
      obj.language = obj.language?.id ? obj.language?.id : '';
    });
    this.user = userAux;
    localStorage.clear();
    this.userService.addUser(this.user).subscribe({
      next: (result:any) => {
        if(result){
          localStorage.setItem('token', result.token);
          const decodedToken = this.helper.decodeToken(result.token);
          this.userService.getUser(decodedToken.sub).subscribe({
            next: (response:any) => {
              this.userSessionService.sendMessage(true);
              this.userSessionService.saveUserLocal(response);
              this.toastr.success(`login succesful`, 'Success', {
                progressBar: true,
              });
              this.router.navigate([`/home`]);
            },
            error: (e0:any) => {
              this.toastr.error(`login fail`, 'Error, ' + e0, {
                progressBar: true,
              });
            },
            complete: () => console.log('complete0'),
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
}
