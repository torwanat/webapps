import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FetchServiceService } from '../fetch-service.service';

@Component({
  selector: 'app-magazines',
  templateUrl: './magazines.component.html',
  styleUrls: ['./magazines.component.css']
})
export class MagazinesComponent {
  public title: string;
  public year: string;
  public libraryData: any;
  public displayTitle: string;
  public dataArr: {logo: string, format: string, name: string, issue: string, from: string, editor: string, scan: string, pages: string, publisher: string, urlName: string}[] = [];

  constructor(private route: ActivatedRoute, private service: FetchServiceService, private router: Router){
    this.title = route.snapshot.paramMap.get("years")!;
    this.year = route.snapshot.paramMap.get("magazine")!;
    this.displayTitle = this.title.replace("_", " ");
    const magazineSubject = service.fetchMagazines();
    magazineSubject.subscribe((data) => {
      this.libraryData = data;
      this.getData();
    });
  }

  getData(){
    this.dataArr = [];
    for(let magazine in this.libraryData.czasopisma[this.title]){
        try{
          if(magazine !== "text" && this.year === "all"){
            let temp = this.libraryData.czasopisma[this.title][magazine];
            this.dataArr.push({logo: temp.miniaturka.text, format: temp.format.text, name: temp.nazwa.text, issue: temp.numer.text, from: temp.podeslal.text, editor: temp.przetworzenie.text, scan: temp.skan.text, pages: temp.stron.text, publisher: temp.wydawca.text, urlName: this.title});          
          }else if(magazine !== "text" && (this.libraryData.czasopisma[this.title][magazine].attr.rok) === this.year){
            let temp = this.libraryData.czasopisma[this.title][magazine];
            this.dataArr.push({logo: temp.miniaturka.text, format: temp.format.text, name: temp.nazwa.text, issue: temp.numer.text, from: temp.podeslal.text, editor: temp.przetworzenie.text, scan: temp.skan.text, pages: temp.stron.text, publisher: temp.wydawca.text, urlName: this.title});          
          }
        }catch{
          continue;
        }
    }
    if(this.dataArr.length === 0){
      this.router.navigate(["/", "lib"]);
    }
  }

}
