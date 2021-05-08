import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { Case } from 'src/app/core/models/case.model';
import { Doctor } from 'src/app/core/models/doctor.model';
import { Patient } from 'src/app/core/models/patient.model';
import { ToothType } from 'src/app/core/models/tooth-type.model';
import { Tooth } from 'src/app/core/models/tooth.model';
import { CaseService } from 'src/app/core/services/case.service';
import { DoctorService } from 'src/app/core/services/doctor.service';

@Component({
  selector: 'app-cases',
  templateUrl: './cases.component.html',
  styleUrls: ['./cases.component.scss']
})
export class CasesComponent implements OnInit {
  displayCreate: boolean = false;
  displayEdit: boolean = false;
  cases: Case[];
  doctors: Doctor[];
  types: ToothType[];
  selectedDoctor: Doctor;
  caseForm: FormGroup;
  patientForm: FormGroup;
  toothForm: FormGroup;

  constructor(private caseService: CaseService, private docService:DoctorService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.getDoctors();
    this.getCases();
    this.createFormGroup();
  }

  createFormGroup(){
    this.caseForm = new FormGroup({
      DoctorId: new FormControl(null, [Validators.required]),
      CreatedDate: new FormControl(null, [Validators.required]),
      ReceiveDate: new FormControl(null, [Validators.required]),
      DueDate: new FormControl(null, [Validators.required]),
      Price: new FormControl(null, [Validators.required]),
      Remake: new FormControl(null, [Validators.required]),
      Rush: new FormControl(null, [Validators.required])
    })
    this.patientForm = new FormGroup({
      FirstName: new FormControl(null, [Validators.required]),
      LastName: new FormControl(null, [Validators.required]),
      Phone: new FormControl(null, [Validators.required]),
      Address: new FormControl(null, [Validators.required])
    })
    this.toothForm = new FormGroup({
      ToothNumber: new FormControl(null, [Validators.required]),
      Shade: new FormControl(null, [Validators.required])
    })
  }

  editFormGroup(id, doctorId, createdDate, receiveDate, dueDate, price, remake, rush, firstName, lastName, phone, address, toothNum, shade){
    this.displayEdit = true;
    this.caseForm = new FormGroup({
      CaseId: new FormControl(id),
      DoctorId: new FormControl(doctorId, [Validators.required]),
      CreatedDate: new FormControl(createdDate, [Validators.required]),
      ReceiveDate: new FormControl(receiveDate, [Validators.required]),
      DueDate: new FormControl(dueDate, [Validators.required]),
      Price: new FormControl(price, [Validators.required]),
      Remake: new FormControl(remake, [Validators.required]),
      Rush: new FormControl(rush, [Validators.required])
    })
    this.patientForm = new FormGroup({
      FirstName: new FormControl(firstName, [Validators.required]),
      LastName: new FormControl(lastName, [Validators.required]),
      Phone: new FormControl(phone, [Validators.required]),
      Address: new FormControl(address, [Validators.required])
    })
    this.toothForm = new FormGroup({
      ToothNumber: new FormControl(toothNum, [Validators.required]),
      Shade: new FormControl(shade, [Validators.required])
    })
  }

  saveNewCase(){
    let newCase = new Case(this.caseForm.value.DoctorId, this.caseForm.value.CreatedDate, this.caseForm.value.ReceiveDate, this.caseForm.value.DueDate, 
      this.caseForm.value.Price, this.caseForm.value.Remake, this.caseForm.value.Rush);

      this.caseService.createCase(newCase).toPromise().then(t =>{
        this.displayCreate = false;
        this.caseForm.reset();
        this.getCases();
      })
  }

  getDoctors(){
    this.docService.getDoctors().toPromise().then((d:Doctor[]) => {
      this.doctors = d;
    })
  }

  getCases(){
    this.caseService.getCases().toPromise().then((c:Case[]) => {
      this.cases = c;
    })
  }

  createCase(){
    this.createFormGroup();
    this.displayCreate = true;
  }

  editCase(c:Case, t:Tooth){
    this.editFormGroup(c.CaseId, c.CreatedDate, c.ReceiveDate, c.DueDate, c.Price, c.Remake, c.Rush, 
      c.Doctor.DoctorId, c.Patient.FirstName, c.Patient.LastName, c.Patient.Phone, c.Patient.Address, c.Teeth.ToothNumber, c.Teeth.Shade);
    this.displayEdit = true;
  }

  updateCase(){
    let updatedCase = new Case(this.caseForm.value.DoctorId, this.caseForm.value.CreatedDate, this.caseForm.value.ReceiveDate, this.caseForm.value.DueDate, 
      this.caseForm.value.Price, this.caseForm.value.Remake, this.caseForm.value.Rush);

    this.caseService.editCase(this.caseForm.value.CaseId, updatedCase).toPromise().then(c =>{
      console.log(this.caseForm.value.CaseId);
      this.caseForm.reset();
      this.displayEdit = false;
      this.getCases();
    })
  }

  cancelCreate(){
    this.caseForm.reset();
    this.displayCreate = false;
  }

  cancelEdit(){
    this.caseForm.reset();
    this.displayEdit = false;
  }

  deleteCase(id:number){
    console.log(id);
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this Case?',
      accept: () => {
        this.caseService.deleteCase(id).toPromise().then(t => {
          this.getCases();
        })
      },
      reject: () => {

      }
    });
  }

}
