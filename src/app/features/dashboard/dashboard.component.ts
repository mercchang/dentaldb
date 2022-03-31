import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
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

  weekDate: moment.Moment;
  newDate: Date;

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

      // cases due this week: get 7 days from monday-friday
      let week = moment().add(7, 'days')
      this.weekDate = moment(week, "MM-DD-YYYY")
      
      for(let i=0;i < this.cazes.length; i++) {
        // rush cases: check if rush is true
        if(this.cazes[i].Rush == true)
          this.rushCazes.push(this.cazes[i]);

        // if case date is before weekdate & status is not delivered, push to weekcases
        let d: any = this.cazes[i].DueDate  // set to 'any' so moment will work
        let tcheck = moment(d.toDate(), "MM-DD-YYYY").isBefore(this.weekDate); //check if date is before week

        if(tcheck && this.cazes[i].Status != "Delivered") {
          this.weekCazes.push(this.cazes[i]);
        }
        
        // outgoing cases: check for complete cases
        if(this.cazes[i].Status == "Complete")
        this.outCazes.push(this.cazes[i]);
      }
      // console.log(this.weekCazes)
      // console.log(this.rushCazes)
      // console.log(this.outCazes)
    });
  }
}
