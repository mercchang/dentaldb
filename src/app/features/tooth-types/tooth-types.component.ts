import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
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

  constructor(private ttService: ToothtypeService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.getTypes();
    this.createFormGroup();
  }

  createFormGroup(){
    this.toothTypeForm = new FormGroup({
      Name: new FormControl(null, [Validators.required]),
      Price: new FormControl(null, [Validators.required]),
      Description: new FormControl(null, [Validators.required])
    })
  }

  editFormGroup(id, name, price, description){
    this.displayEdit = true;
    this.toothTypeForm = new FormGroup({
      ToothTypeId: new FormControl(id),
      Name: new FormControl(name, [Validators.required]),
      Price: new FormControl(price, [Validators.required]),
      Description: new FormControl(description, [Validators.required])
    })
  }

  saveNewType(){
    let newType = new ToothType(this.toothTypeForm.value.Name, 
      this.toothTypeForm.value.Price, this.toothTypeForm.value.Description);

      this.ttService.createToothType(newType).toPromise().then(t =>{
        this.displayCreate = false;
        this.toothTypeForm.reset();
        this.getTypes();
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
      console.log(this.toothTypes)
    });
  }

  createType(){
    this.createFormGroup();
    this.displayCreate = true;
  }

  editType(t:ToothType){
    this.editFormGroup(t.ToothTypeId, t.Name, t.Price, t.Description);
    this.displayEdit = true;
  }

  updateType(){
    let updatedType = new ToothType(this.toothTypeForm.value.Name, 
      this.toothTypeForm.value.Price, this.toothTypeForm.value.Description);

    this.ttService.editToothType(this.toothTypeForm.value.ToothTypeId, updatedType).toPromise().then(t =>{
      console.log(this.toothTypeForm.value.ToothTypeId);
      this.toothTypeForm.reset();
      this.displayEdit = false;
      this.getTypes();
    })
  }

  cancelCreate(){
    this.toothTypeForm.reset();
    this.displayCreate = false;
  }

  cancelEdit(){
    this.toothTypeForm.reset();
    this.displayEdit = false;
  }

  deleteType(id:number){
    console.log(id);
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this type?',
      accept: () => {
        this.ttService.deleteToothType(id).toPromise().then(t => {
          this.getTypes();
        })
      },
      reject: () => {

      }
    });
  }
}
