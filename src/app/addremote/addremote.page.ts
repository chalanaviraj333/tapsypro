import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import firebase from 'firebase/app';


interface Remote {
  tapsycode: string;
  boxNo: number;
  inbuildChip: string;
  inbuildblade: string;
  remotetype: string;
  notes: Array<string>;
  compitablecars: Array<Object>;
}

interface Model {
  brand: string;
  model: string;
  icon: string;
  startyear: number;
  endyear: number;
}

@Component({
  selector: 'app-addremote',
  templateUrl: './addremote.page.html',
  styleUrls: ['./addremote.page.scss'],
})
export class AddremotePage implements OnInit {

  public carbrands = [];
  public allcars: Model[] = [];
  public selectedcarbrandmodels: Model[] = [];
  public selectedcarmodelyears: Array<number>;
  public remotetype = "";

  constructor(private http: HttpClient) { 

    let allcarbrandswithduplicates = [];
    this.remotetype = "bladed";
    

    this.http.get<{ [key: string]: Model}>('https://tapsystock-a6450-default-rtdb.firebaseio.com/car-model.json')
    .subscribe(resData => {
      for (const key in resData) {
        allcarbrandswithduplicates.push(resData[key].brand);
        this.allcars.push(resData[key]);
      }
      this.carbrands= allcarbrandswithduplicates.filter(function(elem, index, self) {
        return index === self.indexOf(elem);
      });

      console.log(this.carbrands);

  });
  }

  ngOnInit() {
  }

  onChangeBrand(selectedcarbrand){
    this.selectedcarbrandmodels = [];
    this.allcars.forEach(car => {
        if (car.brand == selectedcarbrand.target.value)
        {
          this.selectedcarbrandmodels.push(car);
        }
    });
  }

  onChangeModel(selectedcarmodel){
    this.selectedcarmodelyears = [];
    let selectedmodel: Model;
    this.allcars.forEach(car => {
      if (car.model == selectedcarmodel.target.value)
      {
        selectedmodel = car;
      }
    });
    for (let i = selectedmodel.startyear; i <= selectedmodel.endyear; i++) {
      this.selectedcarmodelyears.push(i);
    }
    console.log(this.selectedcarmodelyears);
  }

 
  // onSubmit(form: NgForm) 
  // {

  //   return this.http.post('https://tapsystock-a6450-default-rtdb.firebaseio.com/car-brand.json', {name:form.value.carbrand, icon:form.value.iconname}).subscribe(
  //     resData => {
  //       console.log(resData);
  //     }
  //   );
  // }

}
