import { Component, OnInit } from '@angular/core';
import { NavparamService } from '../navparam.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import firebase from 'firebase/app';
import 'firebase/storage';

interface Model {
  brand: string;
  model: string;
  icon: string;
  startyear: number;
  endyear: number;
}
@Component({
  selector: 'app-model',
  templateUrl: './model.page.html',
  styleUrls: ['./model.page.scss'],
})
export class ModelPage implements OnInit {

  brand: any;
  public models: Array<Model> = [];
  printerror = 'Loading';
  isFetching = true;


  constructor(
    private navParamService: NavparamService, private router: Router, private http: HttpClient
  ) {

    this.brand = this.navParamService.getNavData();

  }

  ngOnInit() {

    this.http.get<{ [key: string]: Model }>('https://tapsystock-a6450-default-rtdb.firebaseio.com/car-model.json')
      .subscribe(resData => {
        for (const key in resData) {
          const iconname = (resData[key].icon);
          if (resData[key].brand == this.brand){
            firebase.storage().ref().child('images/carmodels/' + iconname).getDownloadURL()
            .then(response => {
              this.models.push({ brand: resData[key].brand, model: resData[key].model, startyear: resData[key].startyear, endyear: resData[key].endyear, icon: response })
                this.models.sort((a, b) => (a.model > b.model) ? 1 : -1)
                this.isFetching = false;
        

            })
          
          }
        }
      });
  }



  onClick(x, y, type, startyear, endyear) {


    let car = { brand: this.brand, model: x, type: type, startyear: startyear, endyear: endyear };

    if (y == "All Models") {
      this.navParamService.setNavData(car);
      this.router.navigateByUrl('submodel');
    }
    else {
      this.navParamService.setNavData(car);
      this.router.navigateByUrl('year');

    }

  }

}


