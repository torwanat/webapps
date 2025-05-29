import { Component, Input } from '@angular/core';
import { CellEnum } from './cellEnum';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})
export class CellComponent {
  @Input() public piece: CellEnum = CellEnum.EMPTY;
  @Input() public row: number = 0;
  @Input() public col: number = 0;
}
