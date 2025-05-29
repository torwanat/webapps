import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { FetchServiceService } from '../fetch-service.service';

@Component({
  selector: 'app-years',
  templateUrl: './years.component.html',
  styleUrls: ['./years.component.css']
})
export class YearsComponent {
  public title: string;
  public displayTitle: string;
  public yearsArr: Array<String> = [];
  public libraryData?: any;

  constructor(private route: ActivatedRoute, private service: FetchServiceService, private router: Router){
    this.title = route.snapshot.paramMap.get("years")!;
    this.displayTitle = this.title.replace("_", " ");
    const yearSubject = service.fetchYear();
    yearSubject.subscribe((data) => {
      this.libraryData = data;
      console.log(data);
      this.getYears();
    });    
  }

  getYears(){
    this.yearsArr = [];
      if(Object.prototype.hasOwnProperty.call(this.libraryData.czasopisma.lata, this.title)){
        const tempArr: Array<String> = (this.libraryData.czasopisma.lata[this.title].text).split(',');
        for(let i = 0; i < tempArr.length; i++){
          this.yearsArr.push(tempArr[i]);
        }
    }
    if(this.yearsArr.length === 0){
      this.router.navigate(["/", "lib"]);
    }
  }
  
}
