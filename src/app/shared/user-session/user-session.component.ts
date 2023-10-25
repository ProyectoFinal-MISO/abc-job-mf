import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserSessionService } from './user-session.service';
import { UserSessionDto } from './../model/user-session';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserType } from '../model/user-type';
import { CarouselModule } from 'primeng/carousel';

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
  error: boolean = false;
  itemsslider: Array<any> = [];
  responsiveOptions: any[];

  constructor(
    private userSessionService: UserSessionService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {
  }

  ngOnInit() {
    this.token = localStorage.getItem('token');
    if (this.token) {
      const decodedToken = this.helper.decodeToken(this.token);
      this.router.navigate([`/home`]);
    } else {         
    this.userSessionForm = this.formBuilder.group({
      myUser: ['', [Validators.required]],
      myPassword: ['', [Validators.required]],
      userType: ['', [Validators.required]]
    });
      this.carga = true;
    }
    this.fillItemsSlider();
    this.fillResponsive();
  }

  signIn(){
    if(this.userSessionForm.get('userType')?.value === UserType.Employee){      
      this.router.navigate([`/signin/employee`]);
    }
    else if (this.userSessionForm.get('userType')?.value === UserType.Company){
      this.router.navigate([`/signin/company`]);
    }
    else{
      this.router.navigate([`/signin/technicalresource`]);
    }
  }

  onLogInMyUser() {
    this.error = false;
    this.myUser = {
      id: 0,
      username: this.userSessionForm.get('myUser')?.value,
      password: this.userSessionForm.get('myPassword')?.value
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

  fillItemsSlider(){
    this.itemsslider = [
      { name:'img001', url: './../../../assets/images/img_slide_001.png'},
      { name:'img002', url: './../../../assets/images/img_slide_002.png'},
      { name:'img003', url: './../../../assets/images/img_slide_003.png'},
      { name:'img004', url: './../../../assets/images/img_slide_004.png'},
      { name:'img005', url: './../../../assets/images/img_slide_005.png'},
    ];
  }

  fillResponsive(){    
    this.responsiveOptions = [
      {
          breakpoint: '1024px',
          numVisible: 3,
          numScroll: 3
      },
      {
          breakpoint: '768px',
          numVisible: 2,
          numScroll: 2
      },
      {
          breakpoint: '560px',
          numVisible: 1,
          numScroll: 1
      }
  ];
  }

}
