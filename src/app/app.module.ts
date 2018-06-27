import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { HttpModule } from '@angular/http';
 
import { AppComponent } from './app.component';
import { Model } from './services/model';
import { TextService } from './services/textService';

import { ExternalData } from './external/httpData';
import { PeriodsService } from './services/createPeriods';
import { SelectComponent } from './components/select/select.component';
import { DataQueryService } from './services/dataQuery';
import { CommonsService } from './services/common';
import { MathCalc } from './commonUtil/mathService';
import { TusindtalsSep } from './commonUtil/pipeTusindTal';
import { TableComponent } from './components/table/table.component';
import { IntervalService } from './services/intervalService';
import { IntervalComponent } from './components/interval/interval.component';
import { CalculationsComponent } from './components/calculations/calculations.component';
import { CapitalLetter } from './commonUtil/capitalLetter';

@NgModule({
  declarations: [
    AppComponent,
    SelectComponent,
    TusindtalsSep,
    TableComponent,
    IntervalComponent,
    CalculationsComponent,
    CapitalLetter
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule //,
    //InMemoryWebApiModule.forRoot(ExternalData)
  ],
  providers: [
    MathCalc,
    PeriodsService,
    Model,
    TextService,
    DataQueryService,
    CommonsService,
    IntervalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
