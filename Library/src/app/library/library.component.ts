import { Component } from '@angular/core';
import { FetchServiceService } from '../fetch-service.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent {
  public libraryData?: any;
  public photosArr: {title: string, src: string}[] = [];

  constructor(private service: FetchServiceService){
    service.fetchData();
    service.jsonData.subscribe((data) => {
      this.libraryData = data;
      this.getPhotos();
    });
  }

  getPhotos(){
    this.photosArr = [];
    for(let magazine in this.libraryData.czasopisma.zmienne){
      if(Object.prototype.hasOwnProperty.call(this.libraryData.czasopisma.zmienne, magazine)){
        if(magazine !== "text"){
          this.photosArr.push({title: magazine, src: this.libraryData.czasopisma.zmienne[magazine].src.text});
        }
      }
    }
    console.log(this.photosArr);
  }
}
