import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
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
  url: string = "data:image/png;base64,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"

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
      confirmPassword: [''],
      userType: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      personalInformation: this.formBuilder.group({
        name: ['', [Validators.required]],
        photo:[''],
        lastName: ['', [Validators.required]],
        typeIdentification: ['', [Validators.required]],
        identification: ['', [Validators.required]],
        phoneNumber: [''],
        mobileNumber: [''],
        city: [''],
        state: [''],
        country: [''],
        address: ['']
      })
    });
    this.carga = true;
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
    this.user =  this.userForm.value;
    localStorage.clear();
    console.log()
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
    this.userForm.value.Photo = file;
    if (file) this.saveFile(file);
  }

  saveFile(file: File) {
    const reader = new FileReader();
    reader.onloadend = () => {
      console.log("reader.result", reader.result);
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

  getCountries() {
    this.sharedService.getCountries().subscribe(countries => {
      this.countries = countries;
      this.getTypesIdentification();
    });
  }

  getStates() {
    let idCountry = Number(this.userForm.get('personalInformation.country')?.value?.id)
    this.sharedService.getStatesByCountry(idCountry).subscribe(states =>{
      this.states = states;
    });
  }

  getCities() {
    let stateId = Number(this.userForm.get('personalInformation.state')?.value?.id);
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
