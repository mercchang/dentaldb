import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { Case } from 'src/app/core/models/case.model';
import { Doctor } from 'src/app/core/models/doctor.model';
import { Patient } from 'src/app/core/models/patient.model';
import { ToothType } from 'src/app/core/models/tooth-type.model';
import { Tooth } from 'src/app/core/models/tooth.model';
import { CaseService } from 'src/app/core/services/case.service';
import { DoctorService } from 'src/app/core/services/doctor.service';
import { PatientService } from 'src/app/core/services/patient.service';
import { ToothService } from 'src/app/core/services/tooth.service';
import { ToothtypeService } from 'src/app/core/services/toothtype.service';

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

  constructor(private caseService: CaseService, private docService:DoctorService, private patientService:PatientService, 
    private toothService:ToothService, private toothTypeService:ToothtypeService, private confirmationService: ConfirmationService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getTypes();
    this.getDoctors();
    this.getCases();
    this.createFormGroup();
  }

  createFormGroup(){
    // this.caseForm = new FormGroup({
    //   DoctorId: new FormControl(null, [Validators.required]),
    //   //CreatedDate: new FormControl(null, [Validators.required]),
    //   ReceiveDate: new FormControl(null, [Validators.required]),
    //   DueDate: new FormControl(null, [Validators.required]),
    //   Price: new FormControl(null, [Validators.required]),
    //   Remake: new FormControl(null, [Validators.required]),
    //   Rush: new FormControl(null, [Validators.required])
    // })
    // this.patientForm = new FormGroup({
    //   CaseId: new FormControl(null, [Validators.required]),
    //   FirstName: new FormControl(null, [Validators.required]),
    //   LastName: new FormControl(null, [Validators.required]),
    //   Phone: new FormControl(null, [Validators.required]),
    //   Address: new FormControl(null, [Validators.required])
    // })
    // this.toothForm = new FormGroup({
    //   ToothNumber: new FormControl(null, [Validators.required]),
    //   Shade: new FormControl(null, [Validators.required])
    // })

    this.caseForm = this.fb.group({
      DoctorId: new FormControl(null, [Validators.required]),
      ReceiveDate: new FormControl(null, [Validators.required]),
      DueDate: new FormControl(null),
      Price: new FormControl(null),
      Remake: new FormControl(null),
      Rush: new FormControl(null),
      patientInfo: this.fb.group({
        CaseId: new FormControl(null, [Validators.required]),
        FirstName: new FormControl(null, [Validators.required]),
        LastName: new FormControl(null, [Validators.required]),
        Phone: new FormControl(null, [Validators.required]),
        Address: new FormControl(null, [Validators.required])
      }),
      toothInfo: this.fb.group({
        ToothTypeId: new FormControl(null, [Validators.required]),
        ToothNumber: new FormControl(null, [Validators.required]),
        Shade: new FormControl(null, [Validators.required])
      })
    });
  }

  editFormGroup(id, doctorId, receiveDate, dueDate, price, remake, rush, firstName, lastName, phone, address, toothTypeId, toothNum, shade){
    this.displayEdit = true;
    this.caseForm = new FormGroup({
      CaseId: new FormControl(id),
      DoctorId: new FormControl(doctorId, [Validators.required]),
      ReceiveDate: new FormControl(receiveDate, [Validators.required]),
      DueDate: new FormControl(dueDate, [Validators.required]),
      Price: new FormControl(price, [Validators.required]),
      Remake: new FormControl(remake, [Validators.required]),
      Rush: new FormControl(rush, [Validators.required])
    })
    this.patientForm = new FormGroup({
      CaseId: new FormControl(null, [Validators.required]),
      FirstName: new FormControl(firstName, [Validators.required]),
      LastName: new FormControl(lastName, [Validators.required]),
      Phone: new FormControl(phone, [Validators.required]),
      Address: new FormControl(address, [Validators.required])
    })
    this.toothForm = new FormGroup({
      ToothTypeId: new FormControl(null, [Validators.required]),
      ToothNumber: new FormControl(toothNum, [Validators.required]),
      Shade: new FormControl(shade, [Validators.required])
    })
  }

  saveNewCase(){
    let newCase = new Case(this.caseForm.value.DoctorId, this.caseForm.value.ReceiveDate, this.caseForm.value.DueDate, 
      this.caseForm.value.Price, this.caseForm.value.Remake, this.caseForm.value.Rush);

    let newPatient = new Patient(newCase.CaseId, this.patientForm.value.FirstName, this.patientForm.value.LastName, this.patientForm.value.Phone, 
      this.patientForm.value.Address);

    let newTooth = new Tooth(this.toothForm.value.ToothTypeId, this.toothForm.value.ToothNumber, this.toothForm.value.Shade);

    this.caseService.createCase(newCase).toPromise().then(t =>{
      this.displayCreate = false;
      this.caseForm.reset();
      this.getCases();
    })

    this.patientService.createPatient(newPatient).toPromise().then(p =>{
      this.patientForm.reset();
    })

    this.toothService.createTooth(newTooth).toPromise().then(tooth =>{
      this.toothForm.reset();
    })

    console.log(newCase, newPatient, newTooth)
  }

  getDoctors(){
    this.docService.getDoctors().toPromise().then((d:Doctor[]) => {
      this.doctors = d;
    })
  }

  getTypes(){
    this.toothTypeService.getTypes().toPromise().then((t:ToothType[]) => {
      this.types = t;
      console.log(t);
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
    this.editFormGroup(c.CaseId, c.ReceiveDate, c.DueDate, c.Price, c.Remake, c.Rush, 
      c.Doctor.DoctorId, c.Patient.FirstName, c.Patient.LastName, c.Patient.Phone, c.Patient.Address, c.Teeth.ToothTypeId, c.Teeth.ToothNumber, c.Teeth.Shade);
    this.displayEdit = true;
  }

  updateCase(){
    let updatedCase = new Case(this.caseForm.value.DoctorId, this.caseForm.value.ReceiveDate, this.caseForm.value.DueDate, 
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
        //delete patient and tooth as well
        this.caseService.deleteCase(id).toPromise().then(t => {
          this.getCases();
        })
      },
      reject: () => {

      }
    });
  }

}
