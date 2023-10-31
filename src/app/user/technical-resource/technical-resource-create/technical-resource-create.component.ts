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
import { ProfessionalExperience } from 'src/app/shared/model/professional-experience';
import { Language } from 'src/app/shared/model/language';
import { PersonalSkill } from 'src/app/shared/model/personal-skill';
import { ProgrammingLanguage } from 'src/app/shared/model/programming-language';
import { ProfessionalExperienceComponent } from '../../professional-experience/professional-experience.component';
import { ProgrammingLanguageComponent } from '../../programming-language/programming-language.component';
import { LanguageComponent } from '../../language/language.component';
import { PersonalSkillComponent } from '../../personal-skill/personal-skill.component';

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
  countries: any = [{id:1, code:'COL', name: 'Colombia', parentId:0}, {id:2, code:'USA', name: 'Unit States', parentId:0}, {id:3, code:'MEX', name: 'México', parentId:0}];
  states: any = [{id:1, code:'CUN', name:'Cundinamarca', parentId:1}, {id:3, code:'ANT', name:'Antioquia', parentId:1}, {id:3, code:'VAL', name:'Valle', parentId:1}, {id:4, code:'FLD', name:'Florida', parentId:2}, {id:5, code:'WAS', name:'Washington', parentId:2}];
  cities: any = [{id:1, code:'BOG', name:'Bogotá', parentId:1}, {id:2, code:'ZIP', name:'Zipaquirá', parentId:1}, {id:3, code:'MED', name:'Medellín', parentId:2}, {id:4, code:'ITA', name:'Itagüí', parentId:2}, {id:5, code:'CAL', name:'Cali', parentId:3}, {id:6, code:'MIA', name:'Miami', parentId:4}, {id:7, code:'WHA', name:'Washington', parentId:5}];
  typesIdentification: any = ['CC', 'CE', 'PASSPORT', 'NIT'];
  genres: any = ['MALE', 'FEMALE', 'OTHER'];
  closeResult = '';
  url!: string;

  constructor(
    private userService: TechnicalResourceService,
    private userSessionService: UserSessionService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private location: Location,
    private modalService: NgbModal
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
        age: [0, [Validators.required, Validators.min(18)]],
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
      aditionalInformation: this.formBuilder.group({
        driverLicense: [''],
        transferAvailability: [''],
        vehicule: ['']
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
    const myObjAux = data as ProfessionalExperience;
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
    const myObjAux = data as ProgrammingLanguage;
    this.getProgrammingLanguages.push(this.formBuilder.group({
      name:myObjAux?.name,
      score:myObjAux?.score
    })
    );
  }

  addLanguages(data:any) {
    const myObjAux = data as Language;
    this.getLanguages.push(this.formBuilder.group({
      language:myObjAux?.language,
      score:myObjAux?.score
    })
    );
  }

  addPersonalSkills(data:any) {
    const myObjAux = data as PersonalSkill;
    this.getPersonalSkills.push(this.formBuilder.group({
      name:myObjAux?.name,
      score:myObjAux?.score
    })
    );
  }

  addUser() {
    this.user =  this.userForm.value;
    localStorage.clear();
    this.userService.addUser(this.user).subscribe((res:any) => {
      localStorage.setItem('token', res.token);
      const decodedToken = this.helper.decodeToken(res.token);
      this.userService.getUser(decodedToken.sub).subscribe((response:any) => {
        this.userSessionService.saveUserLocal(response);
        this.router.navigate([`/home`]);
        this.toastr.success(`Ingreso correcto`, 'Success', {
          progressBar: true,
        });
      });
    });
  }
}
