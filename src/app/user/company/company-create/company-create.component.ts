import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { Company } from 'src/app/shared/model/company';
import { UserSessionDto } from 'src/app/shared/model/user-session';
import { UserSessionService } from 'src/app/shared/user-session/user-session.service';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-company-create',
  templateUrl: './company-create.component.html',
  styleUrls: ['./company-create.component.scss']
})
export class CompanyCreateComponent {
  @Input() userType!: string;
  @Input() userSessionDto!: UserSessionDto;
  
  helper = new JwtHelperService();
  userForm: FormGroup;
  token: string | null;  
  carga: boolean = false;
  user: Company;

  constructor(
    private userService: CompanyService,
    private userSessionService: UserSessionService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {
  }

  createForm(){
    this.userForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(4),],],
      confirmPassword: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(4),],],
      userType: ['', [Validators.required]],      
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
      personalInformation: this.formBuilder.group({
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
