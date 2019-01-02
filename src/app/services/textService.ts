import { Injectable } from "@angular/core";
import { Model } from "./model";
import {
  optionsTxt,
  periodOptions,
  specialTxt,
  Periods
} from "../commonUtil/interfaces";
import { Http } from "@angular/http";
import { environment } from "../../environments/environment";

@Injectable()
export class TextService {
  constructor(public model: Model, private http: Http) {}

  options: any;

  month = [
    {
      id: 0,
      txt: "januar"
    },
    {
      id: 1,
      txt: "februar"
    },
    {
      id: 2,
      txt: "marts"
    },
    {
      id: 3,
      txt: "april"
    },
    {
      id: 4,
      txt: "maj"
    },
    {
      id: 5,
      txt: "juni"
    },
    {
      id: 6,
      txt: "juli"
    },
    {
      id: 7,
      txt: "august"
    },
    {
      id: 8,
      txt: "september"
    },
    {
      id: 9,
      txt: "oktober"
    },
    {
      id: 10,
      txt: "november"
    },
    {
      id: 11,
      txt: "december"
    }
  ];

  generalTxt = [
    {
      id: "vaegt",
      da: "vægt (kg.)"
    },
    {
      id: "kml",
      da: "km/l"
    },
    {
      id: "vaegtafgift",
      da: "vægtafgift"
    },
    {
      id: "ejerafgift",
      da: "ejerafgift"
    },
    {
      id: "udligning",
      da: "udligningsafgift"
    },
    {
      id: "privatBenyttelsesAfgift",
      da: "privatanvendelsesafgift "
    },
    {
      id: "partikelfilterAfgift",
      da: "partikeludledningstillæg"
    },
    {
      id: "vejbeyttelsesAfgift",
      da: "vejbenyttelsesafgift"
    },
    {
      id: "egenvaegt",
      da: "egenvægt"
    },
    {
      id: "totalvaegt",
      da: "totalvægt"
    },
    {
      id: "prAar",
      da: "pr. år"
    },
    {
      id: "prKvartal",
      da: "pr. kvartal"
    },
    {
      id: "prhalvAar",
      da: "pr. halvår"
    },
    {
      id: "tilOpkravning_1",
      da: "Opkræves i én rate årligt"
    },
    {
      id: "tilOpkravning_2",
      da: "opkræves halvårligt - 2 rater pr år"
    },
    {
      id: "tilOpkravning_4",
      da: "opkræves kvartalsvis - 4 rater pr. år"
    },
    {
      id: "notallCost",
      da: "Bemærk - tabellen ikke omfatter alle omkostninger"
    },
    {
      id: "veteran",
      da:
        "<h3>Bemærk</h3><p>Vægtafgiften for veterankøretøjer er reduceret med 1/4. Datoen regnes for 35 år ...</p>"
    }
  ];

  getIntervalPrYearTxt(num: number) {
    const map = {
      prAar: 1,
      prKvartal: 4,
      prhalvAar: 2
    };

    const id = Object.keys(map).reduce((p, v) => {
      return map[v] === num ? v : p;
    }, "");

    return this.getGeneral(id);
  }

  getGeneral(id: string) {
    const element = this.generalTxt.find(el => id === el.id);

    return element ? element.da : "";
  }

  specialFN: specialTxt[] = [
    {
      id: "period",
      fn: (data: periodOptions[]) => {
        return data.map(el => {
          if (el.fromYear === null && el.split === null) {
            return `før ${el.toYear + 1}`;
          }

          if (el.toYear === null && el.split === null) {
            return `fra ${el.fromYear}`;
          }

          if (el.split) {
            return `${el.split[0].getFullYear()}`;
          }

          if (el.fromYear === el.toYear) {
            return el.fromYear;
          }

          if (el.fromYear !== null && el.toYear !== null) {
            return `${el.fromYear} - ${el.toYear}`;
          }
        });
      }
    },
    {
      id: "subperiod",
      fn: (data: Periods[]) => {
        return data.map(el => {
          return `${this.printdate(el.from)} - ${this.printdate(el.to)}`;
        });
      }
    },
    {
      id: "akslerRegTruck",
      fn: (data: number[]) => {
        const len = data.length;

        return data.map((el, i) => {
          if (i === len - 1) {
            return `${el} aksler og flere`;
          }
          return `${el} aksler`;
        });
      }
    }
  ];

  initTxtSelect() {
    /**
     * Fix bug here :-)
     */

    const structure = this.model.parameter
      .filter(el => !el.dynamic)
      .filter(el => el.options().options)
      .map(el => {
        return {
          id: el.id,
          options: el.options().options.map(el_ => {
            return { txt: "", id: el_ };
          })
        };
      });

    this.options = structure;

    const url = environment.production
      ? "websrv/jsong.ashx?Id=14541"
      : "app/optionsSkatDk";

    this.http
      .get(url)
      .subscribe(el => {
        const a = el.json().map(el_ => {
          const copy = Object.assign(el_);
          copy.options = el_.children.map(el_ => {
            return {
              id: el_.id,
              txt: el_.da
            };
          });

          return copy;
        });

        this.options = a;
      });
  }

  getLabel(id: string) {
    return this.options.find(el => {
      return el.id === id;
    }).da;
  }

  subDate(date: Date) {
    const newDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() - 1
    );

    return newDate;
  }

  printdate(date: Date) {
    return `${date.getDate()}. ${this.findMonth(date.getMonth())}`;
  }

  findMonth(id: number) {
    return this.month.find(el => el.id === id).txt;
  }

  getTxt(options: optionsTxt) {
    if (options.options && options.options.length) {
      const container = this.options.find(el => el.id === options.id).options;

      return options.options.map(el => {
        const map = container.find(el_ => el_.id === el);
        return map ? map.txt : "";
      });
    } else {
      return this.specialFN.find(el => el.id === options.id).fn(options.data);
    }
  }
}
