import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserSessionService } from 'src/app/shared/user-session/user-session.service';
import { InterviewService } from '../interview.service';
import { ToastrService } from 'ngx-toastr';
import { Interview } from '../interview';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/user/user.service';
import { UserSimple } from 'src/app/user/user-simple';
import { InterviewCreate } from '../interview-create';
import { DatePipe } from '@angular/common';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-interview-create',
  templateUrl: './interview-create.component.html',
  styleUrls: ['./interview-create.component.css']
})
export class InterviewCreateComponent implements OnInit {

  interviewForm!: FormGroup
  meet!: Interview;
  id_meet:number;
  is_charge: Boolean = false;
  token:String | null;
  userId:number;
  userType:string;
  usersCompany: UserSimple[] = []
  usersResource: UserSimple[] = []
  is_edit = false;
  guests:number[] = []
  guests_name:string[] = []
  meet_create!:InterviewCreate
  is_disabled:Boolean = false
  dateNgb!: NgbDateStruct;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private interviewService: InterviewService,
    private toastr: ToastrService,
    private userSessionService: UserSessionService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.token = localStorage.getItem('token');
    if (this.token) {
      this.userSessionService.getUserMe().subscribe(user => {
        this.userId = user.id!;
        this.userType = user.userType!;
        if(this.userType == 'EMPLOYEE'){
          this.activatedRoute.params.subscribe((params:Params)=>{
            this.id_meet = params.id_meet
            if(this.id_meet){
              this.getInterview(this.id_meet);
              this.is_edit = true;
            }else{
              this.getCompanies();
              this.interviewForm = this.formBuilder.group({
                tittle: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
                description: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(256)]],
                date: ['', [Validators.required]],
                star_hour: ['', [Validators.required]],
                end_hour: ['', [Validators.required]],
                company: [''],
                resource: [''],
                place: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
              });
            }
          });
        }else{
          this.router.navigate([`/interview`])
        }
      })
    } else {
      this.router.navigate([`/login`]);
    }
  }

  getInterview(id_meet:number): void{
    this.interviewService.getInterview(id_meet).subscribe(interview => {
      this.meet = interview;
      let start_date = new Date(this.meet.start_date)
      let end_date = new Date(this.meet.end_date)
      for(let guest of this.meet.guests){
        this.guests_name.push(`${guest.name_user} - ${guest.email_user}`)
      }
      console.log(typeof this.meet.start_date)
      this.dateNgb = {day: start_date.getUTCDate(), month: start_date.getUTCMonth(), year: start_date.getUTCFullYear()};
      this.interviewForm = this.formBuilder.group({
        tittle: [this.meet.tittle, [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
        description: [this.meet.description, [Validators.required, Validators.minLength(5), Validators.maxLength(256)]],
        date: [this.dateNgb, [Validators.required]],
        star_hour: [`${this.datePipe.transform(start_date, 'HH')}:${this.datePipe.transform(start_date, 'mm')}`, [Validators.required]],
        end_hour: [`${this.datePipe.transform(end_date, 'HH')}:${this.datePipe.transform(end_date, 'mm')}`, [Validators.required]],
        company: [''],
        resource: [''],
        place: [this.meet.place, [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      });
      console.log(this.interviewForm.value)
      this.getCompanies()
    })
  }

  getCompanies(): void{
    this.userService.getAllCompany().subscribe(companies => {
      this.usersCompany = companies
      this.getResources()
    })
  }

  getResources(): void{
    this.userService.getAllResource().subscribe(resources => {
      this.usersResource = resources
      this.is_charge = true
    })
  }

  submitInterview(){
    if (this.interviewForm.valid) {
      this.is_disabled=true
      this.meet_create = this.interviewForm.value
      let date = this.interviewForm.get('date')?.value
      this.meet_create.start_date = new Date(`${date.year}-${date.month}-${date.day}T${this.interviewForm.get('star_hour')?.value}:00`)
      this.meet_create.end_date = new Date(`${date.year}-${date.month}-${date.day}T${this.interviewForm.get('end_hour')?.value}:00`)
      this.meet_create.guests = this.guests
      if(this.is_edit){
        console.log('put')
        this.interviewService.updateInterview(this.meet_create, this.id_meet).subscribe(meet => {
          console.log(meet)
          this.router.navigateByUrl('/interview')
          this.toastr.success(`update succesful`, 'Success', {
            progressBar: true,
          });
        }, error =>{
          this.is_disabled = false;
        })
      }else{
        console.log('post')
        this.interviewService.addInterview(this.meet_create).subscribe(meet => {
          console.log(meet)
          this.router.navigateByUrl('/interview')
          this.toastr.success(`create succesful`, 'Success', {
            progressBar: true,
          });
        }, error =>{
          this.is_disabled = false;
        })
      }
    }else {
      console.log('Formulario inválido');
      this.markFormGroupTouched(this.interviewForm);
    }
  }

  cancel(){
    this.router.navigateByUrl(`/interview`);
  }



  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  addResource(label:string){
    let id_resource = this.interviewForm.get(label)?.value
    console.log(id_resource)
    if(id_resource){
      if(this.guests.includes(id_resource)){
        console.log('ya agregado')
      }else{
        this.guests.push(id_resource)
        for(let company of this.usersCompany){
          if(company.userId == id_resource){
            this.guests_name.push(`${company.name} - ${company.identification}`)
          }
        }
        for(let resource of this.usersResource){
          if(resource.userId == id_resource){
            this.guests_name.push(`${resource.name} - ${resource.identification}`)
          }
        }
        console.log(this.guests)
        console.log(this.guests_name)
      }
    }
  }

}
