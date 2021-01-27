import { Component, OnInit } from '@angular/core';
import { NavparamService } from '../navparam.service';

@Component({
  selector: 'app-remotedetails',
  templateUrl: './remotedetails.page.html',
  styleUrls: ['./remotedetails.page.scss'],
})
export class RemotedetailsPage implements OnInit {

  public selectedremote: Object;

  constructor(private navParamService: NavparamService) { 

    this.selectedremote = this.navParamService.getNavData();

    
  }

  ngOnInit() {
  }

}
