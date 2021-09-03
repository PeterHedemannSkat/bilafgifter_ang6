import { Component, OnInit } from "@angular/core";
import { Model } from "./services/model";

import { TextService } from "./services/textService";
import { optionsTxt } from "./commonUtil/interfaces";
import { DataQueryService } from "./services/dataQuery";
import { CommonsService } from "./services/common";
import { IntervalService } from "./services/intervalService";
import { PeriodsService } from "./services/createPeriods";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "app";

  constructor(
    public parameter: Model,
    public text: TextService,
    public table: DataQueryService,
    public common: CommonsService,
    public interval: IntervalService,
    private test: PeriodsService
  ) {}

  /**
   * I service ligger options propertien
   * Denne opdateres (via change event) hver gang user ændrer værdien i en select, dvs. hele select listen laves påny
   * med mindre Ang tjekker at der ikke er nogen forandringer
   *
   * options opdateres vha metoden i select:
   * getOptions
   * Denne metode er bare filter, der løber gennem
   * parameter i parametre.ts, der indeholder
   *  -id på parameter-værdien
   * - logik om en given option-id skal vises => fn() --- denne er afhængig af andre select værdier og looper gennem samme array
   * - en value parameter, der er bundet til select-værdierne i GUIen
   *
   */

  ngOnInit() {
    this.text.initTxtSelect();
    this.table.setAllData();
  }

  showDifferences() {
    return true;
  }

  optionText(year: number) {
    switch (year) {
      case 2020:
        return "2020 og til 14. februar 2021";
      case 2021:
        return "2021 – fra 15. februar";
      default:
        return year.toString();
    }
  }
}
