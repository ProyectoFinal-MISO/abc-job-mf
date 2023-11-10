import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray, UntypedFormArray } from '@angular/forms';
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
import { AcademicInformation } from 'src/app/shared/model/academic-information';
import { ProfessionalExperiences } from 'src/app/shared/model/professional-experience';
import { Language } from 'src/app/shared/model/language';
import { PersonalSkill } from 'src/app/shared/model/personal-skill';
import { ProgrammingLanguages } from 'src/app/shared/model/programming-language';
import { ProfessionalExperienceComponent } from '../../professional-experience/professional-experience.component';
import { ProgrammingLanguageComponent } from '../../programming-language/programming-language.component';
import { LanguageComponent } from '../../language/language.component';
import { PersonalSkillComponent } from '../../personal-skill/personal-skill.component';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-technical-resource-delete',
  templateUrl: './technical-resource-delete.component.html',
  styleUrls: ['./technical-resource-delete.component.scss']
})
export class TechnicalResourceDeleteComponent {
  @Input() userSessionDto!: UserSessionDto;

  helper = new JwtHelperService();
  userForm: FormGroup;
  token: string | null;
  carga: boolean = false;
  user: TechnicalResource;
  myUser: UserSessionDto;
  userSessionForm: FormGroup;
  localStageData: any;
  genres: any = [];
  closeResult = '';
  url!: string;
  datos: any;
  userId: number;

  constructor(
    private userService: TechnicalResourceService,
    private userSessionService: UserSessionService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private sharedService: SharedService,
    private route: ActivatedRoute
  ) { }

  createForm() {
    this.userForm = this.formBuilder.group({
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
      const decodedToken = this.helper.decodeToken(this.token);
      this.userSessionDto = this.localStageData?.data as UserSessionDto;
      this.router.navigate([`/technical-resource/delete/` + userId]);
    } else {
      this.router.navigate([`/home`]);
    }
  }

  async deleteUser() {
    let userAux = { ...this.userForm.value };
    console.log(this)
    this.token = localStorage.getItem('token');
    if (this.token) {
      const decodedToken = this.helper.decodeToken(this.token);
      console.log(localStorage)
      console.log(this)
      console.log(userAux)


      if (this.userSessionDto.username == userAux.username && this.userSessionDto.username == userAux.password) {
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
          complete: () => console.log('delete0'),
        });
      } else {
        this.toastr.error(`Username or password are invalid`, 'Error', {
          progressBar: true,
        });
      }
    }

  }
}
