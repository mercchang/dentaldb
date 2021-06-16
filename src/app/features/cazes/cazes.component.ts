import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { Caze } from 'src/app/core/models/caze.model';
import { Doctor } from 'src/app/core/models/doctor.model';
import { ToothType } from 'src/app/core/models/tooth-type.model';
import { CazeService } from 'src/app/core/services/Caze.service';
import { DoctorService } from 'src/app/core/services/doctor.service';
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
  caze: Caze;
  lastName: string;
  docName: string;
  doctors: Doctor[];
  types: ToothType[];
  selectedDoctor: Doctor;
  cazeForm: FormGroup;
  statusForm: FormGroup;
  price: string;

  constructor(private cazeService: CazeService, private docService:DoctorService, private toothTypeService:ToothtypeService, private confirmationService: ConfirmationService) { }

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
      PatientFirstName: new FormControl(null, [Validators.required]),
      PatientLastName: new FormControl(null, [Validators.required]),
      PatientFullName: new FormControl(null, [Validators.required]),
      PatientAddress: new FormControl(null, [Validators.required]),
      PatientPhone: new FormControl(null, [Validators.required]),
      Tooth: new FormControl(null, [Validators.required]),
      Shade: new FormControl(null, [Validators.required]),
      TType: new FormControl(null, [Validators.required]),
      Status: new FormControl(null, [Validators.required])
    })
  }

  editFormGroup(id, doctorId, receiveDate, dueDate, price, remake, rush, doctorName, firstName, lastName, fullName, address, phone, toothNum, shade, tType, status){
    //this.displayEdit = true;
    this.cazeForm = new FormGroup({
      CazeId: new FormControl(id),
      DoctorId: new FormControl(doctorId, [Validators.required]),
      ReceiveDate: new FormControl(receiveDate, [Validators.required]),
      DueDate: new FormControl(dueDate, [Validators.required]),
      Price: new FormControl(price, [Validators.required]),
      Remake: new FormControl(remake, [Validators.required]),
      Rush: new FormControl(rush, [Validators.required]),
      DoctorName: new FormControl(doctorName, [Validators.required]),
      PatientFirstName: new FormControl(firstName, [Validators.required]),
      PatientLastName: new FormControl(lastName, [Validators.required]),
      PatientFullName: new FormControl(fullName, [Validators.required]),
      PatientAddress: new FormControl(address, [Validators.required]),
      PatientPhone: new FormControl(phone, [Validators.required]),
      Tooth: new FormControl(toothNum, [Validators.required]),
      Shade: new FormControl(shade, [Validators.required]),
      TType: new FormControl(tType, [Validators.required]),
      Status: new FormControl(status, [Validators.required])
    })
  }

  saveNewCaze(){
    forkJoin([
      this.toothTypeService.getTypes().toPromise().then((t:ToothType[]) => {
        this.types = t;
        console.log(this.types);
        for(let i = 0; i < this.types.length; i++)
        {
          if (this.types[i].Name == this.cazeForm.value.TType)
          {
            this.price = this.types[i].Price;
          }
        }
      }),
      this.docService.getDoctors().toPromise().then((d:Doctor[]) => {
        this.doctors = d;
        for(let i = 0; i < this.doctors.length; i++)
        {
          if (this.doctors[i].DoctorId == this.cazeForm.value.DoctorId)
          {
            this.docName = this.doctors[i].LastName;
          }
        }
      })
    ]).subscribe(results => {
      let newCaze = new Caze(this.cazeForm.value.DoctorId, this.cazeForm.value.ReceiveDate, this.cazeForm.value.DueDate, 
        this.price, this.cazeForm.value.Remake, this.cazeForm.value.Rush, this.docName, this.cazeForm.value.PatientFirstName, this.cazeForm.value.PatientLastName,
        this.cazeForm.value.PatientFullName, this.cazeForm.value.PatientAddress, this.cazeForm.value.PatientPhone, this.cazeForm.value.Tooth, 
        this.cazeForm.value.Shade.toUpperCase(), this.cazeForm.value.TType, this.cazeForm.value.Status = false);

        newCaze.Status = false;
      this.cazeService.createCaze(newCaze).toPromise().then(c =>{
        this.displayCreate = false;
        this.cazeForm.reset();
        this.getCazes();
      })
    })
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

  editCaze(c:Caze){
    this.editFormGroup(c.CazeId, c.DoctorId, c.ReceiveDate.toDateString, c.DueDate.toDateString, c.Price, c.Remake, c.Rush, 
      c.DoctorName, c.PatientFirstName, c.PatientLastName, c.PatientFullName, 
      c.PatientAddress, c.PatientPhone, c.Tooth, c.Shade, c.TType, c.Status);
    this.displayEdit = true;
  }

  changeStatus(c:Caze){
    let s: Boolean = c.Status;

    switch(s) {
      case true:
        s = false;
        break;
      case false:
        s = true;
        break;
      default:
        s = false;
        break;
    }

    this.editFormGroup(c.CazeId, c.DoctorId, c.ReceiveDate.toDateString, c.DueDate.toDateString, c.Price, c.Remake, c.Rush, 
      c.DoctorName, c.PatientFirstName, c.PatientLastName, c.PatientFullName, 
      c.PatientAddress, c.PatientPhone, c.Tooth, c.Shade, c.TType, s);

    this.updateCaze();
    this.getCazes();
  }

  updateCaze(){
    forkJoin([
      this.toothTypeService.getTypes().toPromise().then((t:ToothType[]) => {
        this.types = t;
        for(let i = 0; i < this.types.length; i++)
        {
          if (this.types[i].Name == this.cazeForm.value.TType)
          {
            this.price = this.types[i].Price;
          }
        }
      }),
      this.docService.getDoctors().toPromise().then((d:Doctor[]) => {
        this.doctors = d;
        for(let i = 0; i < this.doctors.length; i++)
        {
          if (this.doctors[i].DoctorId == this.cazeForm.value.DoctorId)
          {
            this.docName = this.doctors[i].LastName;
          }
        }
      })
    ]).subscribe(results => {
      let updatedCaze = new Caze(this.cazeForm.value.DoctorId, this.cazeForm.value.ReceiveDate, this.cazeForm.value.DueDate, 
        this.price, this.cazeForm.value.Remake, this.cazeForm.value.Rush, this.docName, this.cazeForm.value.PatientFirstName, this.cazeForm.value.PatientLastName,
        this.cazeForm.value.PatientFullName, this.cazeForm.value.PatientAddress, this.cazeForm.value.PatientPhone, this.cazeForm.value.Tooth, 
        this.cazeForm.value.Shade.toUpperCase(), this.cazeForm.value.TType, this.cazeForm.value.Status);

      updatedCaze.PatientFullName = updatedCaze.PatientLastName + ", " + updatedCaze.PatientFirstName;
      this.cazeService.editCaze(this.cazeForm.value.CazeId, updatedCaze).toPromise().then(c =>{
      console.log(this.cazeForm.value.CazeId);
      this.cazeForm.reset();
      this.displayEdit = false;
      this.getCazes();
      })
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
