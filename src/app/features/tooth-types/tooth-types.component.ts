import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToothType } from 'src/app/core/models/tooth-type.model';
import { ToothtypeService } from 'src/app/core/services/toothtype.service';

@Component({
  selector: 'app-tooth-types',
  templateUrl: './tooth-types.component.html',
  styleUrls: ['./tooth-types.component.scss']
})
export class ToothTypesComponent implements OnInit {
  displayCreate: boolean = false;
  displayEdit: boolean = false;
  toothTypes: ToothType[];
  toothTypeForm: FormGroup;
  typeNum: number;
  editId: string;

  constructor(private ttService: ToothtypeService, private confirmationService: ConfirmationService, private messageService: MessageService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getTypes();
    this.createFormGroup();
  }

  createFormGroup(){
    this.toothTypeForm = this.formBuilder.group({
      ToothTypeId: this.typeNum,
      Name: new FormControl(null, [Validators.required]),
      Price: new FormControl(null, [Validators.required]),
      Description: new FormControl(null, [Validators.required])
    })
  }

  editFormGroup(tt:ToothType){
    this.toothTypeForm = this.formBuilder.group({
      Name: new FormControl(tt.Name, [Validators.required]),
      Price: new FormControl(tt.Price, [Validators.required]),
      Description: new FormControl(tt.Description, [Validators.required])
    })
  }

  getTypes(){
    this.ttService.getTypes().subscribe(res => {
      this.toothTypes = res.map( e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as {}
        } as unknown as ToothType;
      })
      // find max doctor number
      this.typeNum = 0;
      for (let i = 0; i < this.toothTypes.length; i++) {
        if (this.toothTypes[i].ToothTypeId > this.typeNum) {
          this.typeNum = this.toothTypes[i].ToothTypeId;
        }
      }
      // assign newest doctor number
      this.typeNum += 1;
    });
  }

  createType(){
    this.createFormGroup();
    this.displayCreate = true;
  }

  saveNewType(){
    this.ttService.createToothType(this.toothTypeForm.value);
    this.displayCreate = false;
    this.showSuccessfulCreate();
  }

  editType(tt:ToothType){
    this.displayEdit = true;
    if(tt) {
      let ttEdit: any;
      this.displayEdit = true;
      this.editId = tt.id;
      this.ttService.getToothType(tt.id).subscribe(res => {
        ttEdit = res;
        this.editFormGroup(ttEdit);
      })
    }
  }

  updateType(){
    this.ttService.editToothType(this.toothTypeForm.value, this.editId);
    this.displayEdit = false;
    this.showSuccessfulEdit();
  }

  cancelCreate(){
    this.toothTypeForm.reset();
    this.displayCreate = false;
  }

  cancelEdit(){
    this.toothTypeForm.reset();
    this.displayEdit = false;
  }

  deleteType(tt:ToothType){
    console.log(tt);
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this type?',
      accept: () => {
        this.ttService.deleteToothType(tt)
        this.showSuccessfulDelete()
      },
      reject: () => {

      }
    });
  }

  showSuccessfulCreate() {
    this.messageService.add({key:'create', severity:'success', summary: 'Success', detail: 'New type added!'});
  }

  showSuccessfulEdit() {
    this.messageService.add({key:'update', severity:'success', summary: 'Success', detail: 'Type saved!'});
  }

  showSuccessfulDelete() {
    this.messageService.add({key:'delete', severity:'warn', summary: 'Delete', detail: 'Type has been deleted'});
  }
}
