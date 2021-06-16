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

  constructor(private cazeService: CazeService) { }

  ngOnInit(): void {
    this.getCazes();
    this.getRushCazes();
  }

  getCazes(){
    this.cazeService.getCazes().toPromise().then((c:Caze[]) => {
      this.cazes = c;
    })
  }

  getRushCazes(){
    this.cazeService.getCazes().toPromise().then((c:Caze[]) => {
      this.cazes = c;
      for(let i=0;i < this.cazes.length; i++)
      {
        if(c[i].Status == true)
          this.rushCazes.push(c[i]);

          console.log(c[i]);
      }
      //console.log(Object.keys(this.rushCazes));
    })

  }

}
