import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-addremote',
  templateUrl: './addremote.page.html',
  styleUrls: ['./addremote.page.scss'],
})
export class AddremotePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  saveremote() {
  }

  chooseFile($event) 
  {

  }

  onSubmit(form: NgForm) 
  {
    console.log(form);
  }

}
