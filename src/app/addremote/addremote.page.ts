import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-addremote',
  templateUrl: './addremote.page.html',
  styleUrls: ['./addremote.page.scss'],
})
export class AddremotePage implements OnInit {

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
