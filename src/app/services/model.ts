import { Injectable } from "@angular/core";
import { general, periodOptions } from "../commonUtil/interfaces";
import { PeriodsService } from "./createPeriods";

@Injectable()
export class Model {
  years = [2018, 2017];
  year = 2018;
  parameter: any[] = [
    {
      id: "type",
      fn: () => {
        return true;
      },
      value: "car",
      options: () => {
        const options = [
          "car",
          "van",
          "taxi",
          "trailer",
          "mc",
          "camper",
          "bus"
        ];
        return {
          options: options,
          data: null,
          id: "type"
        };
      }
    },
    {
      id: "fuel",
      fn: () => {
        const vehicles = this.valuePropIsEither("type", [
            "van",
            "car",
            "veteranbil",
            "taxi",
            "mc",
            "bus",
            "trailer"
          ]),
          lilleTruck = this.valueIs("weightTruck") === "lessThan12t";

        return vehicles || lilleTruck;
      },
      options: () => {
        const options = ["benzin", "diesel"];

        return {
          options: options,
          data: null,
          id: "fuel"
        };
      },
      value: "benzin"
    },
    {
      id: "particle",
      fn: () => {
        const type = this.valueIs("type"),
          isCar_or_Van = this.valuePropIsEither("type", [
            "van",
            "car",
            "veteranbil",
            "taxi"
          ]);

        return isCar_or_Van && this.valueIs("fuel") === "diesel";
      },
      value: null,
      options: () => {
        return {
          options: ["ja", "nej"],
          data: null,
          id: "particle"
        };
      }
    },
    {
      id: "period",
      fn: () => {
        const type = this.valueIs("type"),
          isCar_or_Van = this.valuePropIsEither("type", ["van", "car", "taxi"]);

        return isCar_or_Van;
      },
      value: "1",
      options: () => {
        const type = this.valueIs("type");

        return {
          options: null,
          data: this.periods.getPeriodOptions(type),
          id: "period"
        };
      }
    },
    {
      id: "subperiod",
      dynamic: true,
      fn: () => {
        const type = this.valueIs("type"),
          period = this.valueIs("period"),
          isCar_or_Van = this.valuePropIsEither("type", ["van", "car", "taxi"]);

        if (isCar_or_Van && period !== null) {
          const values =
            type === "car" || type === "taxi" ? [2, 4] : [2, 4, 6, 8];

          return values.indexOf(Number(period)) > -1;
        }

        return false;
      },
      value: null,
      options: () => {
        return {
          options: null,
          data: this.getSubPeriods(),
          id: "subperiod"
        };
      }
    },
    {
      id: "valgfri",
      fn: () => {
        const period = this.valueIs("period"),
          sub = this.valueIs("subperiod");

        return (
          period === "4" &&
          sub === "2" &&
          this.valuePropIsEither("type", ["car", "taxi"])
        );
      },
      value: null,
      options: () => {
        return {
          options: ["ejerafgift", "vaegtafgift"],
          data: null,
          id: "valgfri"
        };
      }
    },
    {
      id: "privatanvendelse",
      fn: () => {
        const isVan = this.valueIs("type") === "van",
          periodIsCorrect =
            (this.valueIs("period") && Number(this.valueIs("period")) <= 7) ||
            (this.valueIs("period") === "8" &&
              this.valueIs("subperiod") === "2");

        return isVan && periodIsCorrect;
      },
      value: null,
      options: () => {
        return {
          options: ["privat", "blandet", "erhverv"],
          data: null,
          id: "privatanvendelse"
        };
      }
    },
    {
      id: "vaegtVareBil",
      fn: () => {
        const isVan = this.valueIs("type") === "van",
          isNotErhverv = this.valuePropIsEither("privatanvendelse", [
            "blandet",
            "privat"
          ]),
          periodIsCorrect =
            Number(this.valueIs("period")) < 4 ||
            (this.valueIs("period") === "4" &&
              this.valueIs("subperiod") === "2");

        return isVan && periodIsCorrect && isNotErhverv;
      },
      value: null,
      options: () => {
        return {
          options: ["moreThan3t", "lessThan3t"],
          data: null,
          id: "vaegtVareBil"
        };
      }
    },
    {
      id: "weightTruck",
      fn: () => {
        return this.valueIs("type") === "truck";
      },
      value: null,
      options: () => {
        return {
          options: ["moreThan12t", "lessThan12t"],
          data: null,
          id: "weightTruck"
        };
      }
    },
    {
      id: "typeLargeTruck",
      fn: () => {
        return this.valueIs("weightTruck") === "moreThan12t";
      },
      value: null,
      options: () => {
        return {
          options: ["regTruck", "vogntog"],
          data: null,
          id: "typeLargeTruck"
        };
      }
    },
    {
      id: "sammenkobling",
      fn: () => {
        return (
          this.valueIs("weightTruck") === "moreThan12t" &&
          this.valueIs("typeLargeTruck") === "vogntog" && 
          this.valueIs("hej") === "hej"
        );
      },
      value: null,
      options: () => {
        return {
          options: ["godkendt", "ikke_godkendt"],
          data: null,
          id: "sammenkobling"
        };
      }
    },
    {
      id: "smallTruckType",
      fn: () => {
        return this.valueIs("weightTruck") === "lessThan12t";
      },
      value: null,
      options: () => {
        return {
          options: ["motorkoeretoej", "paahaengskoeretoej"],
          data: null,
          id: "smallTruckType"
        };
      }
    },
    {
      id: "akslerRegTruck",
      fn: () => {
        return this.valuePropIsEither("type", ["truck", "bus"]);
      },
      value: null,
      options: () => {
        const truckType = this.valueIs("weightTruck"),
          typeLarge = this.valueIs("typeLargeTruck");

        let mapper;

        if (
          typeLarge === "vogntog" ||
          truckType === "lessThan12t" ||
          this.valueIs("type") === "bus"
        ) {
          mapper = [2, 3];
        } else {
          mapper = [2, 3, 4];
        }

        return {
          options: null,
          data: mapper,
          id: "akslerRegTruck"
        };
      }
    },
    {
      id: "akslerVogntog",
      fn: () => {
        return (
          this.valueIs("weightTruck") === "moreThan12t" &&
          this.valueIs("sammenkobling") === "ikke_godkendt"
        );
      },
      value: null,
      options: () => {
        return {
          options: ["1", "2", "3"],
          data: null,
          id: "akslerVogntog"
        };
      }
    },
    {
      id: "euroStandard",
      fn: () => {
        return this.valueIs("weightTruck") === "moreThan12t";
      },
      value: null,
      options: () => {
        return {
          options: ["ikkeEuro", "euro1", "euro2"],
          data: null,
          id: "euroStandard"
        };
      }
    },

    {
      id: "affjedringstype",
      fn: () => {
        return this.valueIs("weightTruck") === "moreThan12t";
      },
      value: null,
      options: () => {
        return {
          options: ["luft", "anden"],
          data: null,
          id: "affjedringstype"
        };
      }
    }
  ];

  options = this.getOptions();

  constructor(private periods: PeriodsService) {}

  getOptions() {
    return this.parameter.filter(el => {
      return el.fn();
    });
  }

  allParametersSet() {
    return this.options.every(el => el.value !== null);
  }

  getSubPeriods() {
    const type = this.valueIs("type"),
      periodobj = this.periods.getPeriodOptions(type),
      period = this.valueIs("period");

    if (!periodobj || !period) return;

    const obj = periodobj[Number(period) - 1];

    if (obj) {
      const periods = [],
        splitDates = obj.split,
        year = splitDates[0].getFullYear(),
        lastIndex = splitDates.length - 1;

      periods.push({
        from: new Date(year, 0, 1),
        to: this.subDate(splitDates[0])
      }),
        splitDates.forEach((el, index) => {
          const nextElementIsNotTheLast = index + 1 < splitDates.length;

          if (index === lastIndex) {
            periods.push({ from: el, to: new Date(year, 11, 31) });
          } else if (nextElementIsNotTheLast) {
            periods.push({ from: el, to: splitDates[index + 1] });
          }
        });

      return periods;
    }

    throw Error("periode fejl");
  }

  isNewRules() {
    return (
      this.valueIs("period") === "1" ||
      (this.valueIs("period") === "2" && this.valueIs("subperiod") === "2")
    );
  }

  isPrivatBenyttelsesAfgiftVan() {
    const isVan = this.valueIs("type") === "van",
      period = Number(this.valueIs("period")),
      subPeriod = Number(this.valueIs("subperiod"));

    return (
      (isVan && [1, 2, 3, 4, 5].indexOf(period) > -1) ||
      (period === 6 && subPeriod === 2)
    );
  }

  getAfgiftsType(id: string) {
    const isVan = this.valueIs("type") === "van",
      period = Number(this.valueIs("period")),
      subPeriod = Number(this.valueIs("subperiod")),
      isTaxiOrCar = this.valuePropIsEither("type", ["car", "taxi"]),
      data = [[1, "*"], [2, "*"], [3, "*"]];

    if (isTaxiOrCar) {
      data.push([4, 3]);
    } else {
      data.push([4, 2]);
    }

    const isEjer = !!data.find(el => {
      return el[0] === period && (el[1] === "*" || subPeriod === el[1]);
    });

    const isOther = !(isTaxiOrCar || isVan),
      confirmedIsEjer = isEjer && !isOther,
      confirmedIsVaegtAfgift = !isEjer && !isOther;

    if (isOther) {
      return null;
    }

    if (this.valueIs("type") === "car" && period === 4 && subPeriod === 2) {
      return this.valueIs("valgfri") === id;
    }

    const txtId = [
      {
        id: "vaegtafgift",
        is: confirmedIsVaegtAfgift
      },
      {
        id: "ejerafgift",
        is: confirmedIsEjer
      }
    ];

    const r = txtId.find(el => el.id === id).is;

    return r;
  }

  isVeteranCar() {
    const isCar = this.valueIs("type") === "car",
      period = this.valueIs("period"),
      period_ =
        period === "7" || (period === "8" && this.valueIs("subperiod") === "1");

    return this.valueIs("type") === "veteranbil" || (isCar && period_);
  }

  valueIs(id: string) {
    const obj = this.parameter.find(el => el.id === id);
    return obj ? obj.value : "";
  }

  valuePropIsEither(id: string, values: string[]) {
    const val = this.valueIs(id);
    return values.indexOf(val) > -1;
  }

  allMultipleValues(check: general[]) {
    return check.every(el => {
      return this.valueIs(el.id) === el.value;
    });
  }

  someMultipleValues(check: general[]) {
    return check.some(el => {
      return this.valueIs(el.id) === el.value;
    });
  }

  subDate(date: Date) {
    const newDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() - 1
    );

    return newDate;
  }
}

/* force update */