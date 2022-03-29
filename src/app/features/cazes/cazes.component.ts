import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Caze } from 'src/app/core/models/caze.model';
import { Doctor } from 'src/app/core/models/doctor.model';
import { ToothType } from 'src/app/core/models/tooth-type.model';
import { CazeService } from 'src/app/core/services/Caze.service';
import { DoctorService } from 'src/app/core/services/doctor.service';
import { ToothtypeService } from 'src/app/core/services/toothtype.service';
import { ConfirmationService, MessageService } from 'primeng/api';

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
  cazeEdit: any;
  cazeNumber: number;
  lastName: string;
  docName: string;
  doctors: Doctor[];
  types: ToothType[];
  selectedDoctor: Doctor;
  cazeForm: FormGroup;
  editId: string;
  price: string;
  status: string[] = ["Received", "In Progress", "Complete", "Shipped", "Delivered"];
  receiveDate: Date;
  dueDate: Date;
  stat: string;

  constructor(private cazeService: CazeService, private docService:DoctorService, private messageService: MessageService,
    private toothTypeService:ToothtypeService, private formBuilder: FormBuilder, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.getTypes();
    this.getDoctors();
    this.getCazes();
    this.createFormGroup();
  }

  createFormGroup(){
    this.cazeForm = this.formBuilder.group({
      CazeNum: this.cazeNumber,
      ToothTypeId: new FormControl(null, [Validators.required]),
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
      Status: new FormControl("Received", [Validators.required])
    })
  }

  editFormGroup(c: Caze, received: Date, due: Date){
    this.cazeForm = this.formBuilder.group({
      CazeNum: new FormControl(c.CazeNum, [Validators.required]),
      ToothTypeId: new FormControl(c.ToothTypeId, [Validators.required]),
      ReceiveDate: new FormControl(received, [Validators.required]),
      DueDate : new FormControl(due, [Validators.required]),
      Price: new FormControl(c.Price, [Validators.required]),
      Remake: new FormControl(c.Remake, [Validators.required]),
      Rush: new FormControl(c.Rush, [Validators.required]),
      DoctorName: new FormControl(c.DoctorName, [Validators.required]),
      PatientFirstName: new FormControl(c.PatientFirstName, [Validators.required]),
      PatientLastName: new FormControl(c.PatientLastName, [Validators.required]),
      Tooth: new FormControl(c.Tooth, [Validators.required]),
      Shade: new FormControl(c.Shade, [Validators.required]),
      TType: new FormControl(c.TType, [Validators.required]),
      Status: new FormControl(c.Status, [Validators.required])
    })
  }

  saveNewCaze(){
    for (let i = 0; i < this.types.length; i++) {
      if (this.cazeForm.value.ToothTypeId == this.types[i].ToothTypeId) {
        this.cazeForm.value.TType = this.types[i].Name;
        this.cazeForm.value.Price = this.types[i].Price;
      }
    }
    this.cazeService.createCaze(this.cazeForm.value);
    this.displayCreate = false;
    this.showSuccessfulCreate();
  }

  createCaze(){
    this.createFormGroup();
    this.displayCreate = true;
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
    });
  }

  editCaze(c:Caze){
    if(c) {
      this.displayEdit = true;
      this.editId = c.id;
      this.cazeService.getCaze(c.id).subscribe(res => {
        this.cazeEdit = res;
        this.receiveDate = this.cazeEdit.ReceiveDate.toDate();
        this.dueDate = this.cazeEdit.DueDate.toDate();
        this.stat = this.cazeEdit.Status;
        //console.log(this.receiveDate + " & " + this.dueDate);
        this.editFormGroup(this.cazeEdit, this.receiveDate, this.dueDate);
      })
    }
  }

  updateCaze(){
    //price check
    for (let i = 0; i < this.types.length; i++) {
      if (this.cazeForm.value.ToothTypeId == this.types[i].ToothTypeId) {
        this.cazeForm.value.TType = this.types[i].Name;
        this.cazeForm.value.Price = this.types[i].Price;
      }
    }
    this.cazeService.editCaze(this.cazeForm.value, this.editId);
    this.displayEdit = false;
    this.showSuccessfulEdit();
  }

  cancelCreate(){
    this.cazeForm.reset();
    this.displayCreate = false;
  }

  cancelEdit(){
    this.cazeForm.reset();
    this.displayEdit = false;
  }

  deleteCaze(c:Caze){
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this Case?',
      accept: () => {
        this.cazeService.deleteCaze(c)
        this.showSuccessfulDelete()
      },
      reject: () => {

      }
    });
  }

  showSuccessfulCreate() {
    this.messageService.add({key:'create', severity:'success', summary: 'Success', detail: 'Case created!'});
  }

  showSuccessfulEdit() {
    this.messageService.add({key:'update', severity:'success', summary: 'Success', detail: 'Case saved!'});
  }

  showSuccessfulDelete() {
    this.messageService.add({key:'delete', severity:'warn', summary: 'Delete', detail: 'Case has been deleted'});
  }
}
