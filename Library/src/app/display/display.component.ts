import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent {
  @Input() data?: {logo: string, format: string, name: string, issue: string, from: string, editor: string, scan: string, pages: string, publisher: string, urlName: string};

  constructor(){
  }
}
