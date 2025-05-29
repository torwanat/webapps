import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-back',
  templateUrl: './back.component.html',
  styleUrls: ['./back.component.css']
})
export class BackComponent {
  constructor(private location: Location){

  }

  goBack(){
    this.location.back();
  }
}
