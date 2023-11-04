import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-academic-information',
  templateUrl: './academic-information.component.html',
  styleUrls: ['./academic-information.component.scss']
})
export class AcademicInformationComponent implements OnInit{

  isDisabled!: boolean;
  modalForm!: FormGroup;
  result: any;
  educationLevels: any = [];
  professionalSectors: any = [];

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    public activeModal: NgbActiveModal,
    private sharedService: SharedService
    ) {
      this.isDisabled=false;
  }

  ngOnInit() {
    this.modalForm = this.formBuilder.group({
      schoolName: ["", [Validators.required, Validators.minLength(2)]],
      educationLevel: ["", [Validators.required]],
      professionalSector: ["", [Validators.required]],
      startDate: ["", [Validators.required]],
      endDate: ["", [Validators.required]]
    });
    this.getProfessionalSectors();
    this.getEducationLevels();
  }

  onCancel() {
    this.modalForm.reset();
    this.activeModal.close(null);
   }

  updateForm(){
    this.isDisabled=true;
  }

  onCreate(){
    if(!this.modalForm.invalid) {
      this.toastr.success("Confirmation", "Record added");
      this.activeModal.close(this.modalForm.value);
    }
  }

  changeEducationLevel(e:any) {
    console.log(e.value)
    this.educationLevels.setValue(e.target.value, {onlySelf: true});
  }

  changeProfessionalSector(e:any) {
    console.log(e.value)
    this.professionalSectors.setValue(e.target.value, {onlySelf: true});
  }

  getProfessionalSectors() {
    this.sharedService.getProfessionalSectors().subscribe({
      next: (result:any) => {
        if(result){
          this.professionalSectors = result;
        }
      },
      error: (e0:any) => {
        this.toastr.error(`Error`, e0, {
          progressBar: true,
        });
      }
    });
  }

  getEducationLevels() {
    this.sharedService.getEducationLevels().subscribe({
      next: (result:any) => {
        if(result){
          this.educationLevels = result;
        }
      },
      error: (e0:any) => {
        this.toastr.error(`Error`, e0, {
          progressBar: true,
        });
      }
    });
  }  
}
