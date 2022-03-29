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

  currentDate: any;
  weekDate: any;
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

      // cases due this week: get 7 days from monday-friday
      let week = moment().add(7, 'days')
      let today = moment()
      this.currentDate = moment(today).format("DD-MM-YYYY")
      this.weekDate = moment(week).format("DD-MM-YYYY")
      
      for(let i=0;i < this.cazes.length; i++) {
        // rush cases: check if rush is true
        if(this.cazes[i].Rush == true)
          this.rushCazes.push(this.cazes[i]);

        // if case date is before weekdate & status is not delivered, push to weekcases
        let tempDueDate = moment(this.cazes[i].DueDate).format("DD-MM-YYYY")
        if(tempDueDate > this.weekDate && this.cazes[i].Status != "Delivered")
          this.weekCazes.push(this.cazes[i]);

        // outgoing cases: check for complete cases
        if(this.cazes[i].Status == "Complete")
        this.outCazes.push(this.cazes[i]);
      }
      console.log(this.weekCazes)
      console.log(this.rushCazes)
      console.log(this.outCazes)
    });
  }
}
