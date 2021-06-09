import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api/confirmationservice';
import { Caze } from 'src/app/core/models/caze.model';
import { Doctor } from 'src/app/core/models/doctor.model';
import { ToothType } from 'src/app/core/models/tooth-type.model';
import { CazeService } from 'src/app/core/services/Caze.service';
import { DoctorService } from 'src/app/core/services/doctor.service';
import { PatientService } from 'src/app/core/services/patient.service';
import { ToothService } from 'src/app/core/services/tooth.service';
import { ToothtypeService } from 'src/app/core/services/toothtype.service';

@Component({
  selector: 'app-caze-form',
  templateUrl: './caze-form.component.html',
  styleUrls: ['./caze-form.component.scss']
})
export class CazeFormComponent implements OnInit {
  displayCreate: boolean = false;
  displayEdit: boolean = false;
  cazes: Caze[];
  doctor: Doctor;
  lastName: string;
  doctors: Doctor[];
  types: ToothType[];
  selectedDoctor: Doctor;
  cazeForm: FormGroup;
  patientForm: FormGroup;
  toothForm: FormGroup;
  price: string;
  
  constructor(private cazeService: CazeService, private docService:DoctorService, private patientService:PatientService, 
    private toothService:ToothService, private toothTypeService:ToothtypeService, private router:Router) { }

  ngOnInit(): void {
    this.getTypes();
    this.getDoctors();
    this.getCazes();
    this.createFormGroup();
  }

  createFormGroup(){
    this.cazeForm = new FormGroup({
      DoctorId: new FormControl(null, [Validators.required]),
      ReceiveDate: new FormControl(null, [Validators.required]),
      DueDate : new FormControl(null, [Validators.required]),
      Price: new FormControl(null, [Validators.required]),
      Remake: new FormControl(null, [Validators.required]),
      Rush: new FormControl(null, [Validators.required]),
      DoctorName: new FormControl(null, [Validators.required]),
      PatientFName: new FormControl(null, [Validators.required]),
      PatientLName: new FormControl(null, [Validators.required]),
      PatientPhone: new FormControl(null, [Validators.required]),
      PatientAddress: new FormControl(null, [Validators.required]),
      PatientDoctor: new FormControl(null, [Validators.required])
    })
    this.patientForm = new FormGroup({
      CazeId: new FormControl(null, [Validators.required]),
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

  saveNewCaze(){
    let n: string = "";

    //console.log(n);
    // let newCaze = new Caze(this.cazeForm.value.DoctorId, this.cazeForm.value.ReceiveDate, this.cazeForm.value.DueDate, 
    //   this.cazeForm.value.Price, this.cazeForm.value.Remake, this.cazeForm.value.Rush, n);

    // this.docService.getDoctor(this.cazeForm.value.DoctorId).toPromise().then(d => {
    //   //console.log(d.DoctorId);
    //   //console.log(d);
    //   n = d.LastName;
    //   newCaze.Doctor = d;
    //   newCaze.DoctorName = newCaze.Doctor.LastName;
    //   //console.log(JSON.stringify(newCaze.Doctor));
    //   console.log(JSON.stringify(newCaze.Doctor.LastName));
    //   console.log(Object.keys(d))
    // })
      
    //let newTooth = new Tooth(this.toothForm.value.ToothTypeId, this.toothForm.value.ToothNumber, this.toothForm.value.Shade);
      //console.log(newCaze);
      
      // this.cazeService.createCaze(newCaze).toPromise().then(c =>{
      //   this.displayCreate = false;
      //   this.cazeForm.reset();
      //   this.getCazes();
      //   this.router.navigate(['/cases/']);
      // })
    
    
    // let newPatient = new Patient(newCaze.CazeId, this.patientForm.value.FirstName, this.patientForm.value.LastName, this.patientForm.value.Phone, 
    //   this.patientForm.value.Address);

    // this.patientService.createPatient(newPatient).toPromise().then(p =>{
    //   this.patientForm.reset();
    // })

    // this.toothService.createTooth(newTooth).toPromise().then(tooth =>{
    //   this.toothForm.reset();
    // })
  }

  getDoctors(){
    this.docService.getDoctors().toPromise().then((d:Doctor[]) => {
      this.doctors = d;
      //console.log(this.doctors);
    })
  }

  getTypes(){
    this.toothTypeService.getTypes().toPromise().then((t:ToothType[]) => {
      this.types = t;
    })
  }

  getCazes(){
    this.cazeService.getCazes().toPromise().then((c:Caze[]) => {
      this.cazes = c;
    })
  }

  createCaze(){
    this.createFormGroup();
    this.displayCreate = true;
  }

  cancelCreate(){
    this.cazeForm.reset();
    this.displayCreate = false;
  }
}
