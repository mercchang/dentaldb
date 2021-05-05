import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
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

  constructor(private docService: DoctorService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.getDoctors();
    this.createFormGroup();
  }

  createFormGroup(){
    this.doctorForm = new FormGroup({
      FirstName: new FormControl(null, [Validators.required]),
      LastName: new FormControl(null, [Validators.required]),
      Address: new FormControl(null, [Validators.required]),
      Phone: new FormControl(null, [Validators.required])
    })
  }

  editFormGroup(id, firstName, lastName, address, phone){
    this.displayEdit = true;
    this.doctorForm = new FormGroup({
      DoctorId: new FormControl(id),
      FirstName: new FormControl(firstName, [Validators.required]),
      LastName: new FormControl(lastName, [Validators.required]),
      Address: new FormControl(address, [Validators.required]),
      Phone: new FormControl(phone, [Validators.required])
    })
  }

  saveNewDoctor(){
    let newDoctor = new Doctor(this.doctorForm.value.FirstName, 
      this.doctorForm.value.LastName, this.doctorForm.value.Address, this.doctorForm.value.Phone);

      this.docService.createDoctor(newDoctor).toPromise().then(d =>{
        this.displayCreate = false;
        this.doctorForm.reset();
        this.getDoctors();
      })
  }

  getDoctors(){
    this.docService.getDoctors().toPromise().then((d:Doctor[]) => {
      this.doctors = d;
    })
  }

  createDoctor(){
    this.createFormGroup();
    this.displayCreate = true;
  }

  editDoctor(d:Doctor){
    this.editFormGroup(d.DoctorId, d.FirstName, d.LastName, d.Address, d.Phone);
    this.displayEdit = true;
  }

  updateDoctor(){
    let updatedDoctor = new Doctor(this.doctorForm.value.FirstName, 
      this.doctorForm.value.LastName, this.doctorForm.value.Address, this.doctorForm.value.Phone);

    this.docService.editDoctor(this.doctorForm.value.DoctorId, updatedDoctor).toPromise().then(d =>{
      console.log(this.doctorForm.value.DoctorId);
      this.doctorForm.reset();
      this.displayEdit = false;
      this.getDoctors();
    })
  }

  cancelCreate(){
    this.doctorForm.reset();
    this.displayCreate = false;
  }

  cancelEdit(){
    this.doctorForm.reset();
    this.displayEdit = false;
  }

  deleteDoctor(id:number){
    console.log(id);
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this Doctor?',
      accept: () => {
        this.docService.deleteDoctor(id).toPromise().then(t => {
          this.getDoctors();
        })
      },
      reject: () => {

      }
    });
  }
}
