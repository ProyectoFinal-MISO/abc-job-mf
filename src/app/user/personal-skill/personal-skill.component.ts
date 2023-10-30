import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-personal-skill',
  templateUrl: './personal-skill.component.html',
  styleUrls: ['./personal-skill.component.scss']
})
export class PersonalSkillComponent {

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
      name: ["", [Validators.required, Validators.minLength(2)]],
      score: ["", [Validators.required]]
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
}
