import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http'
import { AppComponent } from './app.component';
import { ClockComponent } from './clock/clock.component';
import { ATMComponent } from './atm/atm.component';
import { LibraryComponent } from './library/library.component';
import { RouterModule, Routes } from '@angular/router';
import { YearsComponent } from './years/years.component';
import { MagazinesComponent } from './magazines/magazines.component';
import { DisplayComponent } from './display/display.component';
import { BackComponent } from './back/back.component';
const routes: Routes = [
  {path: 'lib/:years/:magazine', component: MagazinesComponent},
  {path: 'lib/:years', component: YearsComponent},
  {path: 'main', component: ATMComponent},
  {path: 'lib', component: LibraryComponent},
  {path: "", redirectTo: "/main", pathMatch: "full"},
  {path: '**', redirectTo: "/lib"}
];

@NgModule({
  declarations: [
    AppComponent,
    ClockComponent,
    ATMComponent,
    LibraryComponent,
    YearsComponent,
    MagazinesComponent,
    DisplayComponent,
    BackComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
