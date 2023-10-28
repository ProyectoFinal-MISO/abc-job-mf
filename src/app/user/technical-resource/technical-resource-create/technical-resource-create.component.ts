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
  academicInformations: FormArray<FormGroup>;

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
      academicInformation: new UntypedFormArray([]),
      
      professionalExperience: this.formBuilder.group({
        titleJob: [''],
        companyName: [''],
        details: [''],
        startDate: [''],
        endDate: ['']
      }),
      aditionalInformation: this.formBuilder.group({
        driverLicense: [''],
        transferAvailability: [''],
        vehicule: ['']
      }),
      programmingLanguages: this.formBuilder.array([this._createFormArrayControls()]),
      languages: this.formBuilder.array([this._createFormArrayControls()]),
      personalSkills: this.formBuilder.array([this._createFormArrayControls()])
    });
    
    this.userForm.get('academicInformation') as FormArray;
    this.addAcademicInformationFormGroup();
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

  showError(error: string) {
    this.toastr.error(error, 'Error');
  }

  showSuccess() {
    this.toastr.success(`Se ha registrado exitosamente`, 'Registro exitoso');
  }

  private _createFormArrayControls(): FormControl{
    return this.formBuilder.control('', Validators.required)
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

  goAddAcademicInformation() {
    this.modalService.open(AcademicInformationComponent, {ariaLabelledBy: 'myModalLabel',  backdrop: 'static' }).result.then((result) => {
      this.academicInformations.push(this.formBuilder.group(result));
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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

  get getAcademicInformations() {
    return this.userForm.get('academicInformation') as FormArray<FormGroup>;
  }

  addAcademicInformationFormGroup() {
    return this.formBuilder.group({
      schoolName:new FormControl(''),
      educationLevel:new FormControl(''),
      professionalSector:new FormControl(''),
      startDate:new FormControl(''),
      endDate:new FormControl('')
    });
  }
}
