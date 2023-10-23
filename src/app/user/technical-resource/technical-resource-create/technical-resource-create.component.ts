import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { UserSessionDto } from 'src/app/shared/model/user-session';
import { TechnicalResource } from 'src/app/shared/model/technical-resource';
import { TechnicalResourceService } from '../technical-resource.service';
import { UserSessionService } from 'src/app/shared/user-session/user-session.service';

@Component({
  selector: 'app-technical-resource-create',
  templateUrl: './technical-resource-create.component.html',
  styleUrls: ['./technical-resource-create.component.scss']
})
export class TechnicalResourceCreateComponent {
  @Input() userType!: string;
  @Input() userSessionDto!: UserSessionDto;
  
  helper = new JwtHelperService();
  userForm: FormGroup;
  token: string | null;  
  carga: boolean = false;
  user: TechnicalResource;

  constructor(
    private userService: TechnicalResourceService,
    private userSessionService: UserSessionService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {
  }

  createForm(){
    this.userForm = this.formBuilder.group({
      username: [this.userSessionDto.username, [Validators.required, Validators.email]],
      password: [this.userSessionDto.password, [Validators.required, Validators.maxLength(50), Validators.minLength(4),],],
      confirmPassword: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(4),],],
      userType: [this.userSessionDto.userType, [Validators.required]],      
      email: [this.userSessionDto.username, [Validators.required, Validators.email]],
      name: ['', [Validators.required]],      
      personalInformation: this.formBuilder.group({
        lastName: [''],
        age: [0],
        genre: [''],
        typeIdentification: ['', [Validators.required]],
        identification: ['', [Validators.required]],
        phoneNumber: [''],
        mobileNumber: [''],
        city: [''],
        state: [''],
        country: [''],
        address: ['']
      }),
      academicInformation: this.formBuilder.group({
        schoolName: ['', [Validators.required]],
        educationLevel: [''],
        professionalSector: [''],
        startDate: [''],
        endDate: ['']
      }),
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
      this.createForm();
      this.carga = true;
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
}
