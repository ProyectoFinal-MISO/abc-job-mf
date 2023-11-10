import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { UserSessionDto } from 'src/app/shared/model/user-session';
import { EmployeeService } from '../employee.service';
import { UserSessionService } from 'src/app/shared/user-session/user-session.service';

@Component({
  selector: 'app-employee-delete',
  templateUrl: './employee-delete.component.html',
  styleUrls: ['./employee-delete.component.scss']
})
export class EmployeeDeleteComponent {
  @Input() userSessionDto!: UserSessionDto;

  helper = new JwtHelperService();
  userDeleteForm: FormGroup;
  token: string | null;
  localStageData: any;
  closeResult = '';
  url!: string;
  userId: number;

  constructor(
    private userService: EmployeeService,
    private userSessionService: UserSessionService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) { }

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
    this.token = localStorage.getItem('token');
    if (this.token) {
      this.userSessionDto = this.localStageData?.data as UserSessionDto;
      this.router.navigate([`/employee/delete/` + userId]);
    } else {
      this.router.navigate([`/home`]);
    }
  }

  async deleteUser() {
    let userAux = { ...this.userDeleteForm.value };
    this.token = localStorage.getItem('token');
    if (this.token) {
      const decodedToken = this.helper.decodeToken(this.token);
      this.userSessionService.getUserMe().subscribe({
        next: (response: any) => {
          if (response.username == userAux.username) {
            this.userService.deleteUser(decodedToken.sub).subscribe({
              next: (response: any) => {
                this.userSessionService.sendMessage(true);
                this.userSessionService.saveUserLocal(response);
                this.toastr.success(`delete succesful`, 'Success', {
                  progressBar: true,
                });
                this.router.navigate([`/home`]);
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
      });
    }

  }
}
