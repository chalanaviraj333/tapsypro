import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-addcarbrand',
  templateUrl: './addcarbrand.page.html',
  styleUrls: ['./addcarbrand.page.scss'],
})
export class AddcarbrandPage implements OnInit {

  constructor(private http: HttpClient) { }


  ngOnInit() {
  }

  onSubmit(form: NgForm) 
  {

    return this.http.post('https://tapsystock-a6450-default-rtdb.firebaseio.com/car-brand.json', {name:form.value.carbrand, icon:form.value.iconname}).subscribe(
      resData => {
        console.log(resData);
      }
    );
  }

}
