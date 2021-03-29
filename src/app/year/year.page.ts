import { Component, OnInit } from '@angular/core';
import { NavparamService } from '../navparam.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-year',
  templateUrl: './year.page.html',
  styleUrls: ['./year.page.scss'],
})
export class YearPage implements OnInit {

  car: any;
  years: number[] = [];


  constructor(
    private navParamService: NavparamService, private router: Router
  ) {

    this.car = this.navParamService.getNavData();
  }

  ngOnInit() {

    for (let i = this.car.startyear; i <= this.car.endyear; i++) {
      this.years.push(i);
    }

  }

  onSelect(year) {
    let car = { brand: this.car.brand, model: this.car.model, year: year, type: this.car.type };
    this.navParamService.setNavData(car);
    this.router.navigateByUrl('result');
  }

}
