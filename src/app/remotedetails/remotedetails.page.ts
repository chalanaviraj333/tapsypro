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

  constructor(private navParamService: NavparamService) { 

    this.selectedremote = this.navParamService.getNavData();
    
  }

  ngOnInit() {
  }

}
