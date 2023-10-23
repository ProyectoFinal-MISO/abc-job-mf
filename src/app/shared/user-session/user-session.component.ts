import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserSessionService } from './user-session.service';
import { UserSessionDto } from './../model/user-session';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-user-session',
  templateUrl: './user-session.component.html',
  styleUrls: ['./user-session.component.scss']
})
export class UserSessionComponent {
  helper = new JwtHelperService();
  userSessionForm: FormGroup;
  token: string | null;
  myUser: UserSessionDto;
  carga: boolean = false;

  constructor(
    private userSessionService: UserSessionService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.token = null;
    this.userSessionForm = this.formBuilder.group({
      myUser: ['', [Validators.required]],
      myPassword: ['', [Validators.required]],
    });
    this.myUser= {
      id: 0,
      user: '',
      password: '',
      token:''
    };
  }

  error: boolean = false;

  ngOnInit() {
    this.token = localStorage.getItem('token');
    if (this.token) {
      const decodedToken = this.helper.decodeToken(this.token);
      this.router.navigate([`/home`]);
    } else {      
      this.carga = true;
    }
  }

  onLogInMyUser() {
    this.error = false;
    this.myUser = {
      id: 0,
      user: this.userSessionForm.get('myUser')?.value,
      password: this.userSessionForm.get('myPassword')?.value,
      token:''
    };

    this.userSessionService.userLogIn(this.myUser).subscribe((res) => {
      localStorage.setItem('token', res.token);
      const decodedToken = this.helper.decodeToken(res.token);
      this.userSessionService.getUser(decodedToken.sub).subscribe(response => {
        this.userSessionService.sendMessage(true);
        this.userSessionService.saveUserLocal(response);
        this.router.navigate([`/home`]);
        //this.router.navigate([`/home/${decodedToken.sub}/${res.token}`]);        
        this.toastr.success(`login succesful`, 'Success', {
        progressBar: true,
      });
       });
    });
  }

}
