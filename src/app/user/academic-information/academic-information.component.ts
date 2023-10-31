import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-academic-information',
  templateUrl: './academic-information.component.html',
  styleUrls: ['./academic-information.component.scss']
})
export class AcademicInformationComponent implements OnInit{

  isDisabled!: boolean;
  modalForm!: FormGroup;
  result: any;
  educationLevels: any = ['MASTER', 'GRADUATE', 'BACHELOR'];
  professionalSectors: any = ['TI', 'HR', 'RETAIL'];

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    public activeModal: NgbActiveModal) {
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
}
