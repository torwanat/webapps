import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css']
})
export class ClockComponent implements OnInit {
  public time: Date = new Date;
  
  ngOnInit(): void {
    setInterval(() => {
      this.startClock();
    }, 1000);
  }

  startClock(){
    this.time = new Date;
  }

}
