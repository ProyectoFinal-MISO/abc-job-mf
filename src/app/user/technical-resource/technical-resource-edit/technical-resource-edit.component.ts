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
import { Location, formatDate } from '@angular/common';
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
  selector: 'app-technical-resource-edit',
  templateUrl: './technical-resource-edit.component.html',
  styleUrls: ['./technical-resource-edit.component.scss']
})
export class TechnicalResourceEditComponent {

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
  educationLevels: any = [];
  professionalSectors: any = [];
  languagesArray: any = [];

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
    this.sharedService.setSite('Edit Profile');
  }

  createForm(){
    this.userForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      userType: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
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
    debugger
    const userId = this.route.snapshot.paramMap.get('id');
    this.createForm();
    this.token = localStorage.getItem('token');
    this.userService.getUser(userId).subscribe(data => {
      this.user = data;
      if (this.token) {
        this.getAllData();
      } else {
      }
    });
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
      id:myObjAux?.id?myObjAux?.id:'',
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
      id:myObjAux?.id?myObjAux?.id:'',
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
      id:myObjAux?.id?myObjAux?.id:'',
      language:myObjAux?.language,
      score:myObjAux?.score.toString()
    })
    );
  }

  addPersonalSkills(data:any) {
    const myObjAux = data as PersonalSkill;
    this.getPersonalSkills.push(this.formBuilder.group({
      id:myObjAux?.id?myObjAux?.id:'',
      name:myObjAux?.name,
      score:myObjAux?.score.toString()
    })
    );
  }

  async getCountries() {
    this.sharedService.getCountries().subscribe({
      next: (result:any) => {
        if(result){
          this.countries = result;
          this.user.personalInformation.country = this.countries.find((x:any) => x.id ===this.user.personalInformation.country);
          this.userForm.get('personalInformation.country')?.setValue(this.user.personalInformation.country);
          this.userForm.get('personalInformation.country')?.updateValueAndValidity();
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
    this.sharedService.getStatesByCountry(Number(this.user.personalInformation.country)).subscribe({
      next: (result:any) => {
        if(result){
          this.states = result;
          this.user.personalInformation.state = this.states.find((x:any) => x.id ===this.user.personalInformation.state);
          this.userForm.get('personalInformation.state')?.setValue(this.user.personalInformation.state);
          this.userForm.get('personalInformation.state')?.updateValueAndValidity();
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
    this.sharedService.getCitiesByState(Number(this.user.personalInformation.state)).subscribe({
      next: (result:any) => {
        if(result){
          this.cities = result;
          this.user.personalInformation.city = this.cities.find((x:any) => x.id ===this.user.personalInformation.city);
          this.userForm.get('personalInformation.city')?.setValue(this.user.personalInformation.city);
          this.userForm.get('personalInformation.city')?.updateValueAndValidity();
        }
      },
      error: (e0:any) => {
        this.toastr.error(`Error`, e0, {
          progressBar: true,
        });
      }
    });
  }

  async getTypesIdentification() {
    this.sharedService.getTypesIdentification().subscribe({
      next: (result:any) => {
        if(result){
          this.typesIdentification = result;
          this.user.personalInformation.typeIdentification = this.typesIdentification.find((x:any) => x ===this.user.personalInformation.typeIdentification.replaceAll('"',"").replaceAll('\\"',""));
          this.userForm.get('personalInformation.typeIdentification')?.setValue(this.user.personalInformation.typeIdentification);
          this.userForm.get('personalInformation.typeIdentification')?.updateValueAndValidity();
        }
      },
      error: (e0:any) => {
        this.toastr.error(`Error`, e0, {
          progressBar: true,
        });
      }
    });
  }

  async getGenres() {
    this.sharedService.getGenres().subscribe({
      next: (result:any) => {
        if(result){
          this.genres = result;
          this.user.personalInformation.genre = this.genres.find((x:any) => x ===this.user.personalInformation.genre.replaceAll('"',"").replaceAll('\\"',""));
          this.userForm.get('personalInformation.genre')?.setValue(this.user.personalInformation.genre);
          this.userForm.get('personalInformation.genre')?.updateValueAndValidity();      
        }
      },
      error: (e0:any) => {
        this.toastr.error(`Error`, e0, {
          progressBar: true,
        });
      }
    });
  }
  
  async getProfessionalSectors() {
    this.sharedService.getProfessionalSectors().subscribe({
      next: (result:any) => {
        if(result){
          this.professionalSectors = result;
          this.user.academicInformation.forEach( (x:AcademicInformation) => {
            x.professionalSector = this.professionalSectors.find((y:any) => y.id ===x.professionalSector);
          });
          if(this.userForm.get('academicInformation')?.value.length > 0){
            this.userForm.get('academicInformation')?.setValue(this.user.academicInformation);
            this.userForm.get('academicInformation')?.updateValueAndValidity();
          }else{
            this.user.academicInformation.forEach( (x:AcademicInformation) => {
              this.addAcademicInformation(x);
            });
          } 

        }
      },
      error: (e0:any) => {
        this.toastr.error(`Error`, e0, {
          progressBar: true,
        });
      }
    });
  }

  async getEducationLevels() {
    this.sharedService.getEducationLevels().subscribe({
      next: (result:any) => {
        if(result){
          this.educationLevels = result;
          this.user.academicInformation.forEach( (x:AcademicInformation) => {
            if(x.educationLevel){
              x.educationLevel = this.educationLevels.find((y:any) => y === x.educationLevel.replaceAll('"',"").replaceAll('\\"',""));
            }
          });
          if(this.userForm.get('academicInformation')?.value.length > 0){
            this.userForm.get('academicInformation')?.setValue(this.user.academicInformation);
            this.userForm.get('academicInformation')?.updateValueAndValidity();
          }else{
            this.user.academicInformation.forEach( (x:AcademicInformation) => {
              this.addAcademicInformation(x);
            });
          } 
        }
      },
      error: (e0:any) => {
        this.toastr.error(`Error`, e0, {
          progressBar: true,
        });
      }
    });
  }

  async getLanguagesArray() {
   await this.sharedService.getLanguages().subscribe({
      next: (result:any) => {
        if(result){
          this.languagesArray = result;
          this.user.languages.forEach( (x:Language) => {
            x.language = this.languagesArray.find((y:any) => y.id ===x.id);
          });
          if(this.userForm.get('languages')?.value.length > 0){
            this.userForm.get('languages')?.setValue(this.user.languages);
            this.userForm.get('languages')?.updateValueAndValidity();
          }else{
            this.user.languages.forEach( (x:Language) => {
              this.addLanguages(x);
            });
          }          
        }
      },
      error: (e0:any) => {
        this.toastr.error(`Error`, e0, {
          progressBar: true,
        });
      }
    });
  }

  async cleanData(){
    this.transferAvailabilities = [{val:0, valaux:false, name:'No'},{val:1, valaux:true, name:'Yes'}];
   
    this.userForm.get('username')?.setValue(this.user.username);
    this.userForm.get('username')?.updateValueAndValidity();
    this.userForm.get('userType')?.setValue(this.user.userType);
    this.userForm.get('userType')?.updateValueAndValidity();
    this.userForm.get('email')?.setValue(this.user.email);
    this.userForm.get('email')?.updateValueAndValidity();

    this.userForm.get('personalInformation.photo')?.setValue(this.user.personalInformation.photo);
    this.userForm.get('personalInformation.photo')?.updateValueAndValidity();

    this.userForm.get('personalInformation.name')?.setValue(this.user.personalInformation.name);
    this.userForm.get('personalInformation.name')?.updateValueAndValidity();

    this.userForm.get('personalInformation.lastName')?.setValue(this.user.personalInformation.lastName);
    this.userForm.get('personalInformation.lastName')?.updateValueAndValidity();
    
    this.userForm.get('personalInformation.birthdate')?.setValue(this.user.personalInformation.birthdate? formatDate(new Date(this.user.personalInformation.birthdate), "yyyy-MM-dd", "en"): this.user.personalInformation.birthdate);
    this.userForm.get('personalInformation.birthdate')?.updateValueAndValidity();

    this.userForm.get('personalInformation.identification')?.setValue(this.user.personalInformation.identification);
    this.userForm.get('personalInformation.identification')?.updateValueAndValidity();

    this.userForm.get('personalInformation.phoneNumber')?.setValue(this.user.personalInformation.phoneNumber);
    this.userForm.get('personalInformation.phoneNumber')?.updateValueAndValidity();

    this.userForm.get('personalInformation.mobileNumber')?.setValue(this.user.personalInformation.mobileNumber);
    this.userForm.get('personalInformation.mobileNumber')?.updateValueAndValidity();

    this.userForm.get('personalInformation.address')?.setValue(this.user.personalInformation.address);
    this.userForm.get('personalInformation.address')?.updateValueAndValidity();

    this.userForm.get('additionalInformation.driverLicense')?.setValue(this.user.aditionalInformation.driverLicense);
    this.userForm.get('additionalInformation.driverLicense')?.updateValueAndValidity();

    this.userForm.get('additionalInformation.vehicle')?.setValue(this.user.aditionalInformation.vehicule);
    this.userForm.get('additionalInformation.vehicle')?.updateValueAndValidity();

    this.user.aditionalInformation.transferAvailability = this.transferAvailabilities.find((x:any) => x.valaux ===this.user.aditionalInformation?.transferAvailability);
        
    this.userForm.get('additionalInformation.transferAvailability')?.setValue(this.user.aditionalInformation.transferAvailability);
    this.userForm.get('additionalInformation.transferAvailability')?.updateValueAndValidity();

    if(this.userForm.get('professionalExperience')?.value.length > 0){
      this.userForm.get('professionalExperience')?.setValue(this.user.professionalExperience);
      this.userForm.get('professionalExperience')?.updateValueAndValidity();
    }else{
      this.user.professionalExperience.forEach( (x:ProfessionalExperiences) => {
        this.addProfessionalExperience(x);
      });
    }

    if(this.userForm.get('programmingLanguages')?.value.length > 0){
      this.userForm.get('programmingLanguages')?.setValue(this.user.programmingLanguages);
      this.userForm.get('programmingLanguages')?.updateValueAndValidity();
    }else{
      this.user.programmingLanguages.forEach( (x:ProgrammingLanguages) => {
        this.addProgrammingLanguages(x);
      });
    } 

    if(this.userForm.get('personalSkills')?.value.length > 0){
      this.userForm.get('personalSkills')?.setValue(this.user.personalSkills);
      this.userForm.get('personalSkills')?.updateValueAndValidity();
    }else{
      this.user.personalSkills.forEach( (x:PersonalSkill) => {
        this.addPersonalSkills(x);
      });
    }
  }

  async getAllData(){
    await this.getCountries();
    await this.getStates();
    await this.getCities();
    await this.getTypesIdentification();
    await this.getGenres();
    await this.getProfessionalSectors();
    await this.getEducationLevels();
    await this.getLanguagesArray();
    await this.cleanData();
  }

  async updateUser() {
    let userAux = { ...this.userForm.value };
    userAux.personalInformation.city = userAux?.personalInformation?.city?.id ?? '';
    userAux.personalInformation.state = userAux?.personalInformation?.state?.id ?? '';
    userAux.personalInformation.country = userAux?.personalInformation?.country?.id ?? '';
    userAux.additionalInformation.transferAvailability = userAux?.additionalInformation?.transferAvailability?.val ?? '';

    await userAux.academicInformation.forEach((obj:any) => {
      obj.professionalSector = obj.professionalSector?.id ?? '';
    });

    await userAux.languages.forEach((obj:any) => {
      obj.language = obj.language?.id ?? '';
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
