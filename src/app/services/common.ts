import { Injectable } from "@angular/core";
import { Model } from "./model";
import { DataQueryService } from "./dataQuery";
import { IntervalService } from "./intervalService";

@Injectable()
export class CommonsService {
  constructor(public model: Model, public dataquery: DataQueryService) {}

  updateModel() {
    this.dataquery.setNewTablesOnChange();
  }

  selectchange(id: string) {
    const index = this.model.parameter.findIndex(el => {
      return el.id === id;
    });

    this.model.parameter.forEach((el, i) => {
      if (!el.fn()) {
        el.value = null;
      }
    });

    this.model.options = this.model.getOptions();

    if (this.model.allParametersSet()) {
      this.updateModel();
    }
  }

  getIdforHeader(tableId: string) {
    const constainsUdligning = !!tableId.match(/udligning/),
      lookup = constainsUdligning ? "udligning" : "other";

    const text = {
      other: this.printOtherType(),
      udligning: "udligning"
    };

    return text[lookup];
  }

  specialTxtCases() {
    return [
      {
        id: "veteran",
        fn: () => {
          return this.model.isVeteranCar();
        }
      }
    ].reduce((p, v) => {
      return v.fn() ? v.id : p;
    }, "");
  }

  private printOtherType() {
    if (this.model.valuePropIsEither("type", ["car", "van", "taxi"])) {
      return this.model.getAfgiftsType("vaegtafgift")
        ? "vaegtafgift"
        : "ejerafgift";
    } else {
      return "vaegtafgift";
    }
  }
}
