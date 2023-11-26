import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, UntypedFormArray, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ModalDismissReasons, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from 'src/app/shared/shared.service';
import { UserService } from 'src/app/user/user.service';
import { PersonalSkillComponent } from 'src/app/user/personal-skill/personal-skill.component';
import { ProgrammingLanguageComponent } from 'src/app/user/programming-language/programming-language.component';
import { ProgrammingLanguages } from 'src/app/shared/model/programming-language';
import { PersonalSkill } from 'src/app/shared/model/personal-skill';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent {

  isDisabled!: boolean;
  modalForm!: FormGroup;
  result: any;
  users: any = [];
  roles: any = [];
  photo!: string;
  closeResult = '';

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    public activeModal: NgbActiveModal,
    private sharedService: SharedService,
    private userService: UserService,
    private modalService: NgbModal
    ) {
      this.isDisabled=false;
  }

  ngOnInit() {
    this.modalForm = this.formBuilder.group({
      name: ["", [Validators.required, Validators.minLength(2)]],
      company: ["", [Validators.required]],
      role: ["", [Validators.required]],
      personalSkills: new UntypedFormArray([]),
      technicalSkills: new UntypedFormArray([])
    });
    this.modalForm.get('technicalSkills') as FormArray<FormGroup>;
    this.modalForm.get('personalSkills') as FormArray<FormGroup>;
    this.getRoles();
    this.getUsers();
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

  get getTechnicalSkills() {
    return this.modalForm.get('technicalSkills') as FormArray<FormGroup>;
  }

  get getPersonalSkills() {
    return this.modalForm.get('personalSkills') as FormArray<FormGroup>;
  }
  
  handleFileInput(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    const file = files[0];
    this.modalForm.value.Photo = file;
    if (file) this.saveFile(file);
  }

  saveFile(file: File) {
    const reader = new FileReader();
    reader.onloadend = () => {
      console.log(reader.result);
      this.photo = reader.result as string;
      localStorage.setItem('profile', reader.result as string);
    };
   reader.readAsDataURL(file);
  }

  clearFile() {
    localStorage.removeItem('profile');
    this.readFile();
  }

  readFile() {
    const profile = localStorage.getItem('profile');
    if (profile) {
      this.photo = profile;
      const contentType = profile.split(';')[0].replace('data:', '');
      const file = new File([profile], 'profile.jpeg', {
        type: contentType,
      });
      this.modalForm.value.Photo = file;
    } else {
      this.photo = '';
    }
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  showError(error: string) {
    this.toastr.error(error, 'Error');
  }

  showSuccess() {
    this.toastr.success(`Se ha registrado exitosamente`, 'Registro exitoso');
  }

  getRoles() {
    this.sharedService.getRoles().subscribe({
      next: (result:any) => {
        if(result){
          this.roles = result;
        }
      },
      error: (e0:any) => {
        this.toastr.error(`Error`, e0, {
          progressBar: true,
        });
      }
    });
  }

  getUsers() {
    this.userService.getUsers().subscribe({
      next: (result:any) => {
        if(result){
          this.users = result;
        }
      },
      error: (e0:any) => {
        this.toastr.error(`Error`, e0, {
          progressBar: true,
        });
      }
    });
  }

  
  goAddPersonalSkill() {
    this.modalService.open(PersonalSkillComponent, {ariaLabelledBy: 'myModalLabel',  backdrop: 'static' }).result.then((result) => {
      if(result){
        this.addPersonalSkills(result);
      }
      this.closeResult = `Closed with: ${result}`;
    }, (reason:any) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  goAddTechnicalSkills() {
    this.modalService.open(ProgrammingLanguageComponent, {ariaLabelledBy: 'myModalLabel',  backdrop: 'static' }).result.then((result) => {
      if(result){
        this.addTechnicalSkills(result);
      }
      this.closeResult = `Closed with: ${result}`;
    }, (reason:any) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  addTechnicalSkills(data:any) {
    const myObjAux = data as ProgrammingLanguages;
    this.getTechnicalSkills.push(this.formBuilder.group({
      name:myObjAux?.name,
      score:myObjAux?.score.toString()
    })
    );
  }

  addPersonalSkills(data:any) {
    const myObjAux = data as PersonalSkill;
    this.getPersonalSkills.push(this.formBuilder.group({
      name:myObjAux?.name,
      score:myObjAux?.score.toString()
    })
    );
  }
}
