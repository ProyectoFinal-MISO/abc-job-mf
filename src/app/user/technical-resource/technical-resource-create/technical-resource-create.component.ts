import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray} from '@angular/forms';
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
  countries: any = ['Florida', 'South Dakota', 'Tennessee', 'Michigan'];

  constructor(
    private userService: TechnicalResourceService,
    private userSessionService: UserSessionService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private location: Location
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
      academicInformation: this.formBuilder.array([]),
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

  addAcademicInformation() {
    const academicInformation = this.userForm.get('academicInformation') as FormArray;
    academicInformation.push(this.formBuilder.group({
      username: '',
      password: '',
    }));
  }
}
