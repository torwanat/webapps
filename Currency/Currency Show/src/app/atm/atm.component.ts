import { Component } from '@angular/core';

@Component({
  selector: 'app-atm',
  templateUrl: './atm.component.html',
  styleUrls: ['./atm.component.css']
})
export class ATMComponent {
  public value: string = "";
  private dots: number = 0;

  checkDots(e: KeyboardEvent): boolean{
    this.dots = 0;
    for(let i = 0; i < this.value.length; i++){
      if(this.value[i] === "."){
        this.dots++;
      }
    }
    if(e.charCode === 46){
      this.dots++;
      if(this.dots > 1){
        return false;
      }
    }
    return true;
  }
}
