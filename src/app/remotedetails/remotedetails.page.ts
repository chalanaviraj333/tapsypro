import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavparamService } from '../navparam.service';

interface Car {
  brand: string;
  model: string;
  startyear: number;
  endyear: number;
}

interface Remote {
  tapsycode: string;
  boxnumber: number;
  inbuildchip: string;
  inbuildblade: string;
  remotetype: string;
  image: string;
  notes: string;
  compitablecars: Array<Car>;
}

@Component({
  selector: 'app-remotedetails',
  templateUrl: './remotedetails.page.html',
  styleUrls: ['./remotedetails.page.scss'],
})
export class RemotedetailsPage implements OnInit {

  public selectedremote: Remote;
  lowstockYes = false;
  lowstockButton = true;

  constructor(private navParamService: NavparamService, private http: HttpClient) {

    this.selectedremote = this.navParamService.getNavData();
    

  }

  _lowStock() {
    this.http.post('https://tapsystock-a6450-default-rtdb.firebaseio.com/lowstockremotes.json', this.selectedremote).subscribe(
        resData => {
          console.log(resData);
        }
      );

      this.lowstockYes = true;
  }

  ngOnInit() {

    this.http.get<{ [key: string]: Remote }>('https://tapsystock-a6450-default-rtdb.firebaseio.com/lowstockremotes.json')
      .subscribe(resData => {
        for (const key in resData) {
          if (resData[key].boxnumber == this.selectedremote.boxnumber)
          {
            this.lowstockYes = true;
          }
        }
        
      });


  }

}
