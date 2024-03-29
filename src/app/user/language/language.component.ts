import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent {

  isDisabled!: boolean;
  modalForm!: FormGroup;
  result: any;
  languages: any = [];

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    public activeModal: NgbActiveModal,
    private sharedService: SharedService) {
      this.isDisabled=false;
  }

  ngOnInit() {
    this.modalForm = this.formBuilder.group({
      language: ["", [Validators.required, Validators.minLength(2)]],
      score: ["", [Validators.required]]
    });
    this.getLanguages();
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

  getLanguages() {
    this.sharedService.getLanguages().subscribe({
      next: (result:any) => {
        if(result){
          this.languages = result;
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
