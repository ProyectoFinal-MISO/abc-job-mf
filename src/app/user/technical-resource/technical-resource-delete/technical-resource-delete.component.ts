import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { UserSessionDto } from 'src/app/shared/model/user-session';
import { TechnicalResourceService } from '../technical-resource.service';
import { UserSessionService } from 'src/app/shared/user-session/user-session.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-technical-resource-delete',
  templateUrl: './technical-resource-delete.component.html',
  styleUrls: ['./technical-resource-delete.component.scss']
})
export class TechnicalResourceDeleteComponent {
  helper = new JwtHelperService();
  userDeleteForm: FormGroup;
  localStageData: any;
  closeResult = '';
  url!: string;
  userId: number;

  constructor(
    private userService: TechnicalResourceService,
    private userSessionService: UserSessionService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,    
    private sharedService: SharedService
  ) { 
    this.sharedService.setSite('Delete Profile');
  }

  createForm() {
    this.userDeleteForm = this.formBuilder.group({
      aceptTerms: ['', [Validators.required]],
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(4)]],
      confirmPassword: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(4)]],
    });
  }

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    this.createForm();
  }

  async deleteUser() {
    let userAux = { ...this.userDeleteForm.value };    
    if (this.userSessionService.getUserToken()) {
      if (this.userSessionService.getUserSession().username == userAux.username) {
        this.userService.deleteUser(this.userSessionService.getUserSession().userId).subscribe({
          next: (response: any) => {
            this.userSessionService.sendMessage(true);
            this.userSessionService.saveUserLocal(response);
            this.toastr.success(`delete succesful`, 'Success', {
              progressBar: true,
            });
            this.userSessionService.closeSession();
            this.router.navigate([`/login`]);
          },
          error: (e0: any) => {
            this.toastr.error(`delete fail`, 'Error, ' + e0, {
              progressBar: true,
            });
          },
          complete: () => {
            console.log('delete0')
            this.userSessionService.closeSession();
          },
        });
      } else {
        this.toastr.error(`Username is incorrect`, 'Error', {
          progressBar: true,
        });
      }
    }
  }
}
