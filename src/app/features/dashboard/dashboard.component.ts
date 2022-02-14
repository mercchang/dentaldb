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
    this.cazeService.getCazes().toPromise().then((c:Caze[]) => {
      this.cazes = c;
      // this.weekDate = this.currentDate - 7;
      console.log(this.currentDate);

      for(let i=0;i < this.cazes.length; i++)
      {
        if(c[i].Rush == true)
          this.rushCazes.push(c[i]);

        //this.dateString = this.datePipe.transform(this.currentDate, 'yyyy-MM-dd');

        console.log("receive date" + c[i].ReceiveDate);
        console.log(typeof c[i].ReceiveDate);
        console.log("current date" + this.currentDate);

        var receiveDate = new Date(c[i].ReceiveDate);

        if(receiveDate < this.currentDate)
        {
          this.weekCazes.push(c[i]);
          console.log(true);
        }
      }
      console.log(this.weekCazes);
    })
  }
}
