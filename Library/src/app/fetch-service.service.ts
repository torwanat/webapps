import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NgxXmlToJsonService } from 'ngx-xml-to-json';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FetchServiceService {

  public jsonData = new Subject<JSON>;

  constructor(private httpClient: HttpClient, private ngxXmlToJsonService: NgxXmlToJsonService) { }

  fetchData(){
    const params = new HttpParams().set('Content-Type', 'application/xml').set('Access-Control-Allow-Origin', '*');
    this.httpClient.get('https://thingproxy.freeboard.io/fetch/https://mendela.pl/3web/czasopisma.xml', {params}).subscribe((data) => {
    },
    error => {
      const errorData = error.error.text;
      const options = {
        textKey: 'text',
        attrKey: 'attr',
        cdataKey: 'cdata',
      };
      this.jsonData.next(this.ngxXmlToJsonService.xmlToJson(errorData, options));
      
    });
  }

  fetchYear(){
    let yearData = new Subject<JSON>;
    const params = new HttpParams().set('Content-Type', 'application/xml').set('Access-Control-Allow-Origin', '*');
    this.httpClient.get('https://thingproxy.freeboard.io/fetch/https://mendela.pl/3web/czasopisma.xml', {params}).subscribe((data) => {
    },
    error => {      
      const errorData = error.error.text;
      const options = {
        textKey: 'text',
        attrKey: 'attr',
        cdataKey: 'cdata',
      };
      yearData.next(this.ngxXmlToJsonService.xmlToJson(errorData, options));      
    });
    return yearData;
  }

  fetchMagazines(){
    let magazinesData = new Subject<JSON>;
    const params = new HttpParams().set('Content-Type', 'application/xml').set('Access-Control-Allow-Origin', '*');
    this.httpClient.get('https://thingproxy.freeboard.io/fetch/https://mendela.pl/3web/czasopisma.xml', {params}).subscribe((data) => {
    },
    error => {
      const errorData = error.error.text;
      const options = {
        textKey: 'text',
        attrKey: 'attr',
        cdataKey: 'cdata',
      };
      magazinesData.next(this.ngxXmlToJsonService.xmlToJson(errorData, options));
    });
    return magazinesData;
  }
}
