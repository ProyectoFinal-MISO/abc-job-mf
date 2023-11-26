import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Interview } from '../interview';
import { InterviewService } from '../interview.service';
import { ToastrService } from 'ngx-toastr';
import { UserSessionService } from 'src/app/shared/user-session/user-session.service';

@Component({
  selector: 'app-interview-list',
  templateUrl: './interview-list.component.html',
  styleUrls: ['./interview-list.component.scss']
})
export class InterviewListComponent implements OnInit {

  meets: Interview[] = [];
  is_charge: Boolean = false;
  token:String | null;
  userId:number;

  constructor(
    private router: Router,
    private interviewService: InterviewService,
    private toastr: ToastrService,
    private userSessionService: UserSessionService
  ) { }

  getMeets(): void {
    this.interviewService.getInterviews().subscribe((meets) => {
      this.meets = meets;
      this.is_charge = true;
    });
  }

  ngOnInit() {
    this.token = localStorage.getItem('token');
    if (this.token) {
      console.log('por aca')
      this.userSessionService.getUserMe().subscribe(user => {
        this.userId = user.id!;
        this.getMeets();
      })
    } else {
      console.log('sin token')
      this.router.navigate([`/login`]);
    }
  }

  confirmMeet(id_guest:number, estado:string): void{
    this.interviewService.confirmMeet(id_guest, estado).subscribe((guest)=>{
      this.toastr.success(`confirm succesful`, 'Success', {
        progressBar: true,
      });
      this.getMeets()
    });
  }

  scoreMeet(id_guest:number, score:number): void{
    this.interviewService.scoreMeet(id_guest, score).subscribe((guest)=>{
      this.toastr.success(`score succesful`, 'Success', {
        progressBar: true,
      });
      this.getMeets()
    });
  }

  calcularDiferenciaEnHorasYMinutos(fechaFinal:Date, fechaInicial:Date): string {
    const diferenciaEnMilisegundos = fechaFinal.getTime() - fechaInicial.getTime();
    const minutosTotales = diferenciaEnMilisegundos / (1000 * 60);

    const horas = Math.floor(minutosTotales / 60);
    const minutos = Math.floor(minutosTotales % 60);

    if (horas === 0) {
      return `${minutos} minutos`;
    } else {
      return `${horas} horas y ${minutos} minutos`;
    }
  }



}