import { Component, OnInit } from '@angular/core';
import { ITS_JUST_ANGULAR } from '@angular/core/src/r3_symbols';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { Caze } from 'src/app/core/models/caze.model';
import { Doctor } from 'src/app/core/models/doctor.model';
import { Patient } from 'src/app/core/models/patient.model';
import { ToothType } from 'src/app/core/models/tooth-type.model';
import { Tooth } from 'src/app/core/models/tooth.model';
import { CazeService } from 'src/app/core/services/Caze.service';
import { DoctorService } from 'src/app/core/services/doctor.service';
import { PatientService } from 'src/app/core/services/patient.service';
import { ToothService } from 'src/app/core/services/tooth.service';
import { ToothtypeService } from 'src/app/core/services/toothtype.service';

@Component({
  selector: 'app-Cazes',
  templateUrl: './cazes.component.html',
  styleUrls: ['./cazes.component.scss']
})
export class CazesComponent implements OnInit {
  displayCreate: boolean = false;
  displayEdit: boolean = false;
  cazes: Caze[];
  doctor: Doctor;
  lastNames: string[];
  doctors: Doctor[];
  types: ToothType[];
  selectedDoctor: Doctor;
  cazeForm: FormGroup;
  patientForm: FormGroup;
  toothForm: FormGroup;
  price: string;

  constructor(private cazeService: CazeService, private docService:DoctorService, private patientService:PatientService, 
    private toothService:ToothService, private toothTypeService:ToothtypeService, private confirmationService: ConfirmationService, private fb: FormBuilder) { }

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
      Rush: new FormControl(null, [Validators.required])
    })
    // this.patientForm = new FormGroup({
    //   CazeId: new FormControl(null, [Validators.required]),
    //   FirstName: new FormControl(null, [Validators.required]),
    //   LastName: new FormControl(null, [Validators.required]),
    //   Phone: new FormControl(null, [Validators.required]),
    //   Address: new FormControl(null, [Validators.required])
    // })
    // this.toothForm = new FormGroup({
    //   ToothNumber: new FormControl(null, [Validators.required]),
    //   Shade: new FormControl(null, [Validators.required])
    // })

    // this.CazeForm = this.fb.group({
    //   DoctorId: new FormControl(null, [Validators.required]),
    //   ReceiveDate: new FormControl(null, [Validators.required]),
    //   DueDate: new FormControl(null),
    //   Price: new FormControl(null),
    //   Remake: new FormControl(null),
    //   Rush: new FormControl(null),
    //   patientInfo: this.fb.group({
    //     CazeId: new FormControl(null, [Validators.required]),
    //     FirstName: new FormControl(null, [Validators.required]),
    //     LastName: new FormControl(null, [Validators.required]),
    //     Phone: new FormControl(null, [Validators.required]),
    //     Address: new FormControl(null, [Validators.required])
    //   }),
    //   toothInfo: this.fb.group({
    //     ToothTypeId: new FormControl(null, [Validators.required]),
    //     ToothNumber: new FormControl(null, [Validators.required]),
    //     Shade: new FormControl(null, [Validators.required])
    //   })
    // });
  }

  editFormGroup(id, doctorId, receiveDate, dueDate, price, remake, rush, firstName, lastName, phone, address, toothTypeId, toothNum, shade){
    this.displayEdit = true;
    this.cazeForm = new FormGroup({
      CazeId: new FormControl(id),
      DoctorId: new FormControl(doctorId, [Validators.required]),
      ReceiveDate: new FormControl(receiveDate, [Validators.required]),
      DueDate: new FormControl(dueDate, [Validators.required]),
      Price: new FormControl(price, [Validators.required]),
      Remake: new FormControl(remake, [Validators.required]),
      Rush: new FormControl(rush, [Validators.required])
    })
    this.patientForm = new FormGroup({
      CazeId: new FormControl(id, [Validators.required]),
      FirstName: new FormControl(firstName, [Validators.required]),
      LastName: new FormControl(lastName, [Validators.required]),
      Phone: new FormControl(phone, [Validators.required]),
      Address: new FormControl(address, [Validators.required])
    })
    this.toothForm = new FormGroup({
      ToothTypeId: new FormControl(toothTypeId, [Validators.required]),
      ToothNumber: new FormControl(toothNum, [Validators.required]),
      Shade: new FormControl(shade, [Validators.required])
    })
  }

  saveNewCaze(){
    let newCaze = new Caze(this.cazeForm.value.DoctorId, this.cazeForm.value.ReceiveDate, this.cazeForm.value.DueDate, 
      this.cazeForm.value.Price, this.cazeForm.value.Remake, this.cazeForm.value.Rush);

    //let newTooth = new Tooth(this.toothForm.value.ToothTypeId, this.toothForm.value.ToothNumber, this.toothForm.value.Shade);
      //console.log(newCaze);
      
    this.cazeService.createCaze(newCaze).toPromise().then(c =>{
      console.log(c);
      this.displayCreate = false;
      this.cazeForm.reset();
      this.getCazes();
    }), err=> {
      console.log("Error:", err);
    }
    
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
      console.log(this.doctors);
      this.getLastNames(this.doctors);
    })
  }

  getDoctor(id:number){
    this.docService.getDoctor(id).toPromise().then((doc:Doctor) => {
      this.doctor = doc;
    })
  }

  getLastNames(d:Doctor[]){
    for(let i = 0; i < d.length; i++)
    {
      this.lastNames[i] = d[i].LastName.toString();
      //console.log(this.lastNames[i])
      
    }
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

  editCaze(c:Caze, t:Tooth){
    this.editFormGroup(c.CazeId, c.ReceiveDate, c.DueDate, c.Price, c.Remake, c.Rush, 
      c.DoctorId, c.Patient.FirstName, c.Patient.LastName, c.Patient.Phone, c.Patient.Address, c.Teeth.ToothTypeId, c.Teeth.ToothNumber, c.Teeth.Shade);
    this.displayEdit = true;
  }

  updateCaze(){
    let updatedCaze = new Caze(this.cazeForm.value.DoctorId, this.cazeForm.value.ReceiveDate, this.cazeForm.value.DueDate, 
      this.cazeForm.value.Price, this.cazeForm.value.Remake, this.cazeForm.value.Rush);

    this.cazeService.editCaze(this.cazeForm.value.CazeId, updatedCaze).toPromise().then(c =>{
      console.log(this.cazeForm.value.CazeId);
      this.cazeForm.reset();
      this.displayEdit = false;
      this.getCazes();
    })
  }

  cancelCreate(){
    this.cazeForm.reset();
    this.displayCreate = false;
  }

  cancelEdit(){
    this.cazeForm.reset();
    this.displayEdit = false;
  }

  deleteCaze(id:number){
    console.log(id);
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this Caze?',
      accept: () => {
        //delete patient and tooth as well
        this.cazeService.deleteCaze(id).toPromise().then(t => {
          this.getCazes();
        })
      },
      reject: () => {

      }
    });
  }

}
