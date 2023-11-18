import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidationErrors} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/app/shared/model/employee';
import { UserSessionDto } from 'src/app/shared/model/user-session';
import { UserSessionService } from 'src/app/shared/user-session/user-session.service';
import { EmployeeService } from '../employee.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.scss']
})
export class EmployeeCreateComponent {
  @Input() userType!: string;
  @Input() userSessionDto!: UserSessionDto;

  userForm: FormGroup;
  token: string | null;
  carga: boolean = false;
  user: Employee;
  url!: string;
  isDisabled: boolean = false;

  countries: any = [];
  states: any = [];
  cities: any= [];
  typesIdentification: any = [];

  constructor(
    private userService: EmployeeService,
    private sharedService: SharedService,
    private userSessionService: UserSessionService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {
  }

  createForm(){
    this.userForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
      password: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(4),],],
      confirmPassword: ['', [Validators.required]],
      userType: ['EMPLOYEE', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      personalInformation: this.formBuilder.group({
        name: ['', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]],
        photo:[''],
        lastName: ['', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]],
        typeIdentification: ['', [Validators.required]],
        identification: ['', [Validators.required, Validators.pattern("[0-9]*"), Validators.maxLength(10), Validators.minLength(8)]],
        phoneNumber: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern("[0-9]*")]],
        mobileNumber: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern("[0-9]*")]],
        city: ['', [Validators.required]],
        state: ['', [Validators.required]],
        country: ['', [Validators.required]],
        address: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(5)]]
      })
    }, {
      validators: this.confirmarContraseñaValidator
    });
    this.carga = true;
  }

  confirmarContraseñaValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    const errors: ValidationErrors = {};
    if (password !== confirmPassword) {
      errors['noCoincide'] = true;
    }
    return Object.keys(errors).length === 0 ? null : errors;
  }

  ngOnInit() {
    this.token = localStorage.getItem('token');
    if (this.token) {
      this.router.navigate([`/home`]);
      //this.router.navigate([`/carreras/${decodedToken.sub}/${this.token}`]);
    } else {
      this.getCountries();
    }
  }

  addUser() {
    if (this.userForm.valid) {
      this.isDisabled = true;
      this.user = this.userForm.value;
      this.user.personalInformation.photo = this.url;
      localStorage.clear();
      //console.log(this.user)
      this.userService.addUser(this.user).subscribe((response) => {
        this.router.navigate([`/login`]);
      }, (error) =>{
        this.isDisabled = false;
      })
    } else {
      console.log('Formulario inválido');
      this.markFormGroupTouched(this.userForm);
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
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

  handleFileInput(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    const file = files[0];
    if (file){
      const reader = new FileReader();
      reader.onloadend = () => {
        this.url = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  clearFile() {
    this.url = "";
  }

  getCountries() {
    this.sharedService.getCountries().subscribe(countries => {
      this.countries = countries;
      this.getTypesIdentification();
    });
  }

  getStates() {
    let idCountry = Number(this.userForm.get('personalInformation.country')?.value)
    this.sharedService.getStatesByCountry(idCountry).subscribe(states =>{
      this.states = states;
    });
  }

  getCities() {
    let stateId = Number(this.userForm.get('personalInformation.state')?.value);
    this.sharedService.getCitiesByState(stateId).subscribe(cities => {
      this.cities = cities;
    });
  }

  getTypesIdentification() {
    this.sharedService.getTypesIdentification().subscribe(types => {
      this.typesIdentification = types
      this.createForm();
    });
  }
}
