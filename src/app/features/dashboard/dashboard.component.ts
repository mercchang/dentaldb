import { Component, OnInit } from '@angular/core';
import { Caze } from 'src/app/core/models/caze.model';
import { CazeService } from 'src/app/core/services/Caze.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  cazes: Caze[];
  rushCazes: Caze[] = [];
  weekCazes: Caze[] = [];
  newCazes: Caze[] = [];
  outCazes: Caze[] = [];

  currentDate = new Date;
  weekDate: Date;
  newDate: Date;
  dateString: String;

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

      // rush cases
      for(let i=0;i < this.cazes.length; i++)
      {
        if(this.cazes[i].Rush == true)
          this.rushCazes.push(this.cazes[i]);
      }

      // cases due this week
      //this.weekDate = this.currentDate - 7;

      // new cases
      //this.weekDate = this.currentDate - 7;

      // outgoing cases
      for(let i=0;i < this.cazes.length; i++)
      {
        if(this.cazes[i].Status == "Complete")
          this.outCazes.push(this.cazes[i]);
      }
    });
  }
}
