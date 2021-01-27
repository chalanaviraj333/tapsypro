import { Component, OnInit, ViewChild } from '@angular/core';
import { NavparamService } from '../navparam.service';
import { Router } from '@angular/router';
import { IonSearchbar } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  @ViewChild('search', { static: false }) search: IonSearchbar;

  public brands: Array<Object> = [];
  private searchedItem: any;

  constructor(
    private navParamService: NavparamService,
    private router: Router
  ) {

    this.brands= [
      {name:"ALFA ROMEO", icon:"alfaromeo.png"},
      {name:"AUDI", icon:"audi.png"},
      {name:"BMW", icon:"bmw.png"},
      {name:"CHERY", icon:"chery.png"},
      {name:"CHRYSLER", icon:"chrysler.png"},
      {name:"CITROEN", icon:"citroen.png"},
      {name:"DAEWOO", icon:"daewoo.png"},
      {name:"DAIHATSU", icon:"daihatsu.png"},
      {name:"DODGE", icon:"dodge.png"},
      {name:"FIAT", icon:"fiat.png"},
      {name:"FORD", icon:"ford.png"},
      {name:"HOLDEN", icon:"holden.png"},
      {name:"GREAT WALL", icon:"greatwall.png"},
      {name:"HONDA", icon:"honda.png"},
      {name:"HUMMER", icon:"hummer.png"},
      {name:"HYUNDAI", icon:"hyundai.png"},
      {name:"ISUZU", icon:"isuzu.png"},
      {name:"JAGUAR", icon:"jaguar.png"},
      {name:"JEEP", icon:"jeep.png"},
      {name:"KIA", icon:"kia.png"},
      {name:"LAND ROVER", icon:"landrover.png"},
      {name:"RANGE ROVER", icon:"landrover.png"},
      {name:"LDV", icon:"ldv.png"},
      {name:"LEXUS", icon:"lexus.png"},
      {name:"MAZDA", icon:"mazda.png"},
      {name:"BENZ", icon:"benz.png"},
      {name:"MINI", icon:"mini.png"},
      {name:"NISSAN", icon:"nissan.png"},
      {name:"OPEL", icon:"opel.png"},
      {name:"PEUGEOT", icon:"peugeot.png"},
      {name:"PROTON", icon:"proton.png"},
      {name:"RENAULT", icon:"renault.png"},
      {name:"SAAB", icon:"saab.png"},
      {name:"SKODA", icon:"skoda.png"},
      {name:"SUBARU", icon:"subaru.png"},
      {name:"SUZUKI", icon:"suzuki.png"},
      {name:"TOYOTA", icon:"toyota.png"},
      {name:"VOLKS WAGEN", icon:"volkswagen.png"},
      {name:"VOLVO", icon:"volvo.png"},
      
    ];

    this.searchedItem = this.brands;
       
  }

  ngOnInit() {

  }

  onClick(x){
    this.navParamService.setNavData(x);
    this.router.navigateByUrl('model');
  }

  _ionChange(event){
    const val = event.target.value;

    this.searchedItem = this.brands;
    
    if (val && val.trim() != '') {
      this.searchedItem = this.searchedItem.filter((item: any) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

}
