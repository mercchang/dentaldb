import { Component, OnInit } from '@angular/core';
import { Caze } from 'src/app/core/models/caze.model';
import { CazeService } from 'src/app/core/services/Caze.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {
  cazes: Caze[];
  constructor(private cazeService: CazeService) { }

  ngOnInit(): void {
    this.getCazes();
  }

  getCazes(){
    this.cazeService.getCazes().subscribe(res => {
      this.cazes = res.map( e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as {}
        } as unknown as Caze;
      })
    });
  }
}
