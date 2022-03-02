import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { Caze } from 'src/app/core/models/caze.model';
import { Doctor } from 'src/app/core/models/doctor.model';
import { ToothType } from 'src/app/core/models/tooth-type.model';
import { CazeService } from 'src/app/core/services/Caze.service';
import { DoctorService } from 'src/app/core/services/doctor.service';
import { ToothtypeService } from 'src/app/core/services/toothtype.service';
import { map } from 'rxjs/operators';

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
  cazeNumber: number;
  lastName: string;
  docName: string;
  doctors: Doctor[];
  types: ToothType[];
  selectedDoctor: Doctor;
  cazeForm: FormGroup;
  statusForm: FormGroup;
  price: string;

  constructor(private cazeService: CazeService, private docService:DoctorService, private toothTypeService:ToothtypeService, 
    private confirmationService: ConfirmationService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getTypes();
    this.getDoctors();
    this.getCazes();
    this.createFormGroup();
  }

  createFormGroup(){
    this.cazeForm = this.formBuilder.group({
      CazeNum: this.cazeNumber,
      ReceiveDate: new FormControl(null, [Validators.required]),
      DueDate : new FormControl(null, [Validators.required]),
      Price: new FormControl(null, [Validators.required]),
      Remake: new FormControl(null, [Validators.required]),
      Rush: new FormControl(null, [Validators.required]),
      DoctorName: new FormControl(null, [Validators.required]),
      PatientFirstName: new FormControl(null, [Validators.required]),
      PatientLastName: new FormControl(null, [Validators.required]),
      Tooth: new FormControl(null, [Validators.required]),
      Shade: new FormControl(null, [Validators.required]),
      TType: new FormControl(null, [Validators.required]),
      Status: new FormControl(null, [Validators.required])
    })
  }

  // editFormGroup(id, doctorId, receiveDate, dueDate, price, remake, rush, doctorName, firstName, lastName, fullName, address, phone, toothNum, shade, tType, status){
  //   this.cazeForm = new FormGroup({
  //     CazeId: new FormControl(id),
  //     DoctorId: new FormControl(doctorId, [Validators.required]),
  //     // ReceiveDate: new FormControl(receiveDate, [Validators.required]),
  //     // DueDate: new FormControl(dueDate, [Validators.required]),
  //     Price: new FormControl(price, [Validators.required]),
  //     Remake: new FormControl(remake, [Validators.required]),
  //     Rush: new FormControl(rush, [Validators.required]),
  //     DoctorName: new FormControl(doctorName, [Validators.required]),
  //     PatientFirstName: new FormControl(firstName, [Validators.required]),
  //     PatientLastName: new FormControl(lastName, [Validators.required]),
  //     PatientFullName: new FormControl(fullName, [Validators.required]),
  //     PatientAddress: new FormControl(address, [Validators.required]),
  //     PatientPhone: new FormControl(phone, [Validators.required]),
  //     Tooth: new FormControl(toothNum, [Validators.required]),
  //     Shade: new FormControl(shade, [Validators.required]),
  //     TType: new FormControl(tType, [Validators.required]),
  //     Status: new FormControl(status, [Validators.required])
  //   })
  // }

  saveNewCaze(){
    this.cazeService.createCaze(this.cazeForm.value);
    this.displayCreate = false;
  }

  getDoctors(){
    this.docService.getDoctors().subscribe(res => {
      this.doctors = res.map( e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as {}
        } as unknown as Doctor;
      })
    });
  }

  getTypes(){
    this.toothTypeService.getTypes().subscribe(res => {
      this.types = res.map( e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as {}
        } as unknown as ToothType;
      })
    });
  }

  getCazes(){
    this.cazeService.getCazes().subscribe(res => {
      this.cazes = res.map( e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as {}
        } as unknown as Caze;
      })
      // find max case number
      this.cazeNumber = 0;
      for (let i = 0; i < this.cazes.length; i++) {
        if (this.cazes[i].CazeNum > this.cazeNumber) {
          this.cazeNumber = this.cazes[i].CazeNum;
        }
      }
      // assign newest case number
      this.cazeNumber += 1;
      console.log(this.cazeNumber)
    });
  }

  createCaze(){
    this.createFormGroup();
    this.displayCreate = true;
  }

  // editCaze(c:Caze){
  //   console.log(c)
  //   this.editFormGroup(c.CazeId, c.DoctorId, c.ReceiveDate, c.DueDate, c.Price, c.Remake, c.Rush, 
  //     c.DoctorName, c.PatientFirstName, c.PatientLastName, c.PatientFullName, 
  //     c.PatientAddress, c.PatientPhone, c.Tooth, c.Shade, c.TType, c.Status);
  //   this.displayEdit = true;
  // }

  changeStatus(c:Caze){
    c.Status = !c.Status;
    console.log(c.Status);
    //this.updateCaze(c);
  }

  // updateCaze(caze?){
  //   forkJoin([
  //     this.toothTypeService.getTypes().toPromise().then((t:ToothType[]) => {
  //       this.types = t; //get price
  //       for(let i = 0; i < this.types.length; i++)
  //       {
  //         if (this.types[i].Name == this.cazeForm.value.TType)
  //           this.price = this.types[i].Price;
  //       }
  //     }),
  //     this.docService.getDoctors().toPromise().then((d:Doctor[]) => {
  //       this.doctors = d; // get doctor name
  //       for(let i = 0; i < this.doctors.length; i++)
  //       {
  //         if (this.doctors[i].DoctorId == this.cazeForm.value.DoctorId)
  //           this.docName = this.doctors[i].LastName;
  //       }
  //     })
  //   ]).subscribe(results => {
  //     var updatedCaze;
  //     if(caze)
  //     {
  //       updatedCaze = new Caze(caze.CazeId, caze.DoctorId, caze.ReceiveDate, caze.DueDate, 
  //       caze.price, caze.Remake, caze.Rush, caze.docName, caze.PatientFirstName, caze.PatientLastName,
  //       caze.PatientFullName, caze.PatientAddress, caze.PatientPhone, caze.Tooth, 
  //       caze.Shade.toUpperCase(), caze.TType, caze.Status);
  //     }
  //     else
  //     {
  //       updatedCaze = new Caze(this.cazeForm.value.CazeId ,this.cazeForm.value.DoctorId, this.cazeForm.value.ReceiveDate, this.cazeForm.value.DueDate, 
  //       this.price, this.cazeForm.value.Remake, this.cazeForm.value.Rush, this.docName, this.cazeForm.value.PatientFirstName, this.cazeForm.value.PatientLastName,
  //       this.cazeForm.value.PatientFullName, this.cazeForm.value.PatientAddress, this.cazeForm.value.PatientPhone, this.cazeForm.value.Tooth, 
  //       this.cazeForm.value.Shade.toUpperCase(), this.cazeForm.value.TType, this.cazeForm.value.Status);
  //     }
      
  //     updatedCaze.PatientFullName = updatedCaze.PatientLastName + ", " + updatedCaze.PatientFirstName;

  //     console.log(updatedCaze);
  //     this.cazeService.editCaze(this.cazeForm.value.CazeId ? this.cazeForm.value.CazeId:updatedCaze.CazeId, updatedCaze).toPromise().then(c =>{
  //       this.cazeForm.reset();
  //       this.displayEdit = false;
  //       this.getCazes();
  //     })
  //   })
  // }

  cancelCreate(){
    this.cazeForm.reset();
    this.displayCreate = false;
  }

  // cancelEdit(){
  //   this.cazeForm.reset();
  //   this.displayEdit = false;
  // }

  deleteCaze(c:Caze){
    // this.confirmationService.confirm({
    //   message: 'Are you sure you want to delete this Caze?',
    //   accept: () => {
    //     //delete patient and tooth as well
    //     this.cazeService.deleteCaze(id).toPromise().then(t => {
    //       this.getCazes();
    //     })
    //   },
    //   reject: () => {

    //   }
    // });

    if(confirm("Are you sure you want to delete this Caze for patient " + c.PatientFullName + "?")) {
      this.cazeService.deleteCaze(c)
    }

  }

}
