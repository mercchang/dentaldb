import { Component, OnInit } from '@angular/core';
import { ToothType } from 'src/app/core/models/tooth-type.model';
import { ToothtypeService } from 'src/app/core/services/toothtype.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tooth-form',
  templateUrl: './tooth-form.component.html',
  styleUrls: ['./tooth-form.component.scss']
})
export class ToothFormComponent implements OnInit {
  types: ToothType[];
  
  constructor(private typeService: ToothtypeService) { }

  ngOnInit(): void {
    this.getTypes();
  }

  getTypes(){
    this.typeService.getTypes().toPromise().then((t:ToothType[]) => {
      this.types = t;
      console.log(t);
    })
  }
}
