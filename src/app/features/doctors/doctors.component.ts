import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Doctor } from 'src/app/core/models/doctor.model';
import { DoctorService } from 'src/app/core/services/doctor.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.scss']
})
export class DoctorsComponent implements OnInit {
  displayCreate: boolean = false;
  displayEdit: boolean = false;
  doctors: Doctor[];
  doctorForm: FormGroup;
  docNum: number;
  editId: string;

  constructor(private docService: DoctorService, private confirmationService: ConfirmationService, private messageService: MessageService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getDoctors();
    this.createFormGroup();
  }

  createFormGroup(){
    this.doctorForm = this.formBuilder.group({
      DocNumber: this.docNum,
      FirstName: new FormControl(null, [Validators.required]),
      LastName: new FormControl(null, [Validators.required]),
      Address: new FormControl(null, [Validators.required]),
      Phone: new FormControl(null, [Validators.required])
    })
  }

  editFormGroup(doc: Doctor){
    this.doctorForm = this.formBuilder.group({
      FirstName: new FormControl(doc.FirstName, [Validators.required]),
      LastName: new FormControl(doc.LastName, [Validators.required]),
      Address: new FormControl(doc.Address, [Validators.required]),
      Phone: new FormControl(doc.Phone, [Validators.required])
    })
  }

  createDoctor(){
    this.createFormGroup();
    this.displayCreate = true;
  }

  saveNewDoctor(){
    this.docService.createDoctor(this.doctorForm.value);
    this.displayCreate = false;
    this.showSuccessfulCreate();
  }

  getDoctors(){
    this.docService.getDoctors().subscribe(res => {
      this.doctors = res.map( e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as {}
        } as unknown as Doctor;
      })
      // find max doctor number
      this.docNum = 0;
      for (let i = 0; i < this.doctors.length; i++) {
        if (this.doctors[i].DocNumber > this.docNum) {
          this.docNum = this.doctors[i].DocNumber;
        }
      }
      // assign newest doctor number
      this.docNum += 1;
    });
  }

  editDoctor(d:Doctor){
    this.displayEdit = true;
    if(d) {
      let docEdit: any;
      this.displayEdit = true;
      this.editId = d.id;
      this.docService.getDoctor(d.id).subscribe(res => {
        docEdit = res;
        this.editFormGroup(docEdit);
      })
    }
  }

  updateDoctor(){
    this.docService.editDoctor(this.doctorForm.value, this.editId);
    this.displayEdit = false;
    this.showSuccessfulEdit();
  }

  cancelCreate(){
    this.doctorForm.reset();
    this.displayCreate = false;
  }

  cancelEdit(){
    this.doctorForm.reset();
    this.displayEdit = false;
  }

  deleteDoctor(doc:Doctor){
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this Doctor?',
      accept: () => {
        this.docService.deleteDoctor(doc)
        this.showSuccessfulDelete()
      },
      reject: () => {

      }
    });
  }

  showSuccessfulCreate() {
    this.messageService.add({key:'create', severity:'success', summary: 'Success', detail: 'Doctor added!'});
  }

  showSuccessfulEdit() {
    this.messageService.add({key:'update', severity:'success', summary: 'Success', detail: 'Doctor saved!'});
  }

  showSuccessfulDelete() {
    this.messageService.add({key:'delete', severity:'warn', summary: 'Delete', detail: 'Doctor has been deleted'});
  }
}
