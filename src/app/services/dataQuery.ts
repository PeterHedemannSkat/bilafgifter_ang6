import { Injectable } from '@angular/core';
import { Model } from './model';
import { HttpModule, Http } from '@angular/http';
import { data } from '../external/tables';
import { IntervalService } from './intervalService';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable()
export class DataQueryService {
  table = [
    {
      modelFit: () => {
        const correctType = this.model.valuePropIsEither('type', [
            'car',
            'van',
            'taxi'
          ]),
          isDiesel = this.model.valueIs('fuel') === 'diesel',
          type = this.model.valueIs('type'),
          isNewestPeriod = this.model.isNewRules() && this.dif;

        return correctType && isDiesel && isNewestPeriod;
      },
      rowIds: () => {
        return `car|van*nyeregler*ejerafgift*udligning`;
      }
    },
    {
      modelFit: () => {
        const correctType = this.model.valuePropIsEither('type', [
            'car',
            'van',
            'taxi'
          ]),
          isNewestPeriod = this.model.isNewRules() && this.dif;

        return correctType && isNewestPeriod;
      },
      rowIds: () => {
        const type = this.model.valueIs('type');

        const type_ = ['car', 'van'].indexOf(type) > -1 ? type : 'car';
        const fuel_specialCase =
          this.model.valueIs('type') === 'van'
            ? `*${this.model.valueIs('fuel')}`
            : '';

        return `${type_}*nyeregler*ejerafgift*forbrugsafgift${fuel_specialCase}`;
      }
    },
    {
      modelFit: () => {
        const correctType = this.model.valuePropIsEither('type', [
            'car',
            'van',
            'taxi'
          ]),
          isDiesel = this.model.valueIs('fuel') === 'diesel',
          isRegular = !this.model.isNewRules() || this.dif === false;

        return correctType && isDiesel && isRegular;
      },
      rowIds: () => {
        const isEjerafgift = this.model.getAfgiftsType('ejerafgift'),
          vehicle = isEjerafgift ? 'car!van' : this.model.valueIs('type'),
          afgifttype = isEjerafgift ? 'ejerafgift' : 'vaegtafgift';

        return `${vehicle}*${afgifttype}*udligning`;
      }
    },
    {
      modelFit: () => {
        const correctType = this.model.valuePropIsEither('type', [
            'car',
            'van',
            'taxi'
          ]),
          isRegular = !this.model.isNewRules() || this.dif === false;

        return correctType && isRegular;
      },
      rowIds: () => {
        const isEjerafgift = this.model.getAfgiftsType('ejerafgift'),
          vehicle = isEjerafgift ? 'car!van' : this.model.valueIs('type'),
          afgifttype = isEjerafgift ? 'ejerafgift' : 'vaegtafgift',
          saerlig =
            !isEjerafgift && this.model.valueIs('type') === 'car'
              ? this.model.valueIs('fuel') === 'diesel'
                ? '*kvartal'
                : '*halvaar'
              : '';

        return `${vehicle}*${afgifttype}*forbrugsafgift${saerlig}`;
      }
    },
    {
      modelFit: () => {
        return this.model.valueIs('type') === 'veteranbil';
      },
      rowIds: () => {
        const period =
          this.model.valueIs('fuel') === 'diesel' ? '*kvartal' : '*halvaar';

        return `car*vaegtafgift*forbrugsafgift${period}`;
      }
    },
    {
      modelFit: () => {
        return this.model.allMultipleValues([
          { id: 'type', value: 'veteranbil' },
          { id: 'fuel', value: 'diesel' }
        ]);
      },
      rowIds: () => {
        return `car*vaegtafgift*udligning`;
      }
    },
    {
      modelFit: () => {
        return this.model.valueIs('typeLargeTruck') === 'regTruck';
      },
      rowIds: () => {
        const axels = (
            Number(this.model.valueIs('akslerRegTruck')) + 1
          ).toString(),
          affjedring = this.model.valueIs('affjedringstype');

        return `largeTruck|regular*aksler_${axels}`;
      }
    },
    {
      modelFit: () => {
        return this.model.valueIs('typeLargeTruck') === 'vogntog';
      },
      rowIds: () => {
        const axelsVogntog =
          this.model.valueIs('sammenkobling') === 'godkendt'
            ? '2'
            : this.model.valueIs('akslerVogntog');

        const axelsReg = Number(this.model.valueIs('akslerRegTruck')) + 1;

        return `largeTruck|vogntog*aksler_${axelsReg}*akslerVogntog_${axelsVogntog}`;
      }
    },
    {
      modelFit: () => {
        return this.model.valueIs('weightTruck') === 'lessThan12t';
      },
      rowIds: () => {
        const type = this.model.valueIs('smallTruckType'),
          aksler = Number(this.model.valueIs('akslerRegTruck')) + 1;

        return `smallTruck*vaegtafgift*type_${type}*aksler_${aksler}`;
      }
    },
    {
      modelFit: () => {
        return (
          this.model.valueIs('weightTruck') === 'lessThan12t' &&
          this.model.valueIs('fuel') === 'diesel'
        );
      },
      rowIds: () => {
        const type = this.model.valueIs('smallTruckType'),
          aksler = Number(this.model.valueIs('akslerRegTruck')) + 1;

        return `smallTruck*udligning*type_${type}*aksler_${aksler}`;
      }
    },
    {
      modelFit: () => {
        return (
          this.model.valueIs('type') === 'mc' &&
          this.model.valueIs('fuel') === 'diesel'
        );
      },
      rowIds: () => {
        return `mc*udligning`;
      }
    },
    {
      modelFit: () => {
        return this.model.valueIs('type') === 'mc';
      },
      rowIds: () => {
        return `mc*vaegtafgift`;
      }
    },
    {
      modelFit: () => {
        return this.model.valuePropIsEither('type', ['camper']);
      },
      rowIds: () => {
        const vehicle = this.model.valueIs('type');

        return `simpleTable*${vehicle}`;
      }
    },
    {
      modelFit: () => {
        return this.model.valueIs('type') === 'trailer';
      },
      rowIds: () => {
        const fuel = this.model.valueIs('fuel');

        return `trailer*${fuel}`;
      }
    },
    {
      modelFit: () => {
        return this.model.valueIs('type') === 'bus';
      },
      rowIds: () => {
        const aksler = Number(this.model.valueIs('akslerRegTruck')) + 1;

        return `bus*vaegtafgift*aksler_${aksler}`;
      }
    },
    {
      modelFit: () => {
        return (
          this.model.valueIs('type') === 'bus' &&
          this.model.valueIs('fuel') === 'diesel'
        );
      },
      rowIds: () => {
        const aksler = Number(this.model.valueIs('akslerRegTruck')) + 1;

        return `bus*udligning*aksler_${aksler}`;
      }
    }
  ];

  data: any[];
  tableIds = [];
  interval: any[];
  formattedRows = [];
  value: string;
  dif = true;
  inputType: string;

  constructor(
    private model: Model,
    private intervalService: IntervalService,
    private http: Http
  ) {}

  setNewTablesOnChange() {
    this.tableIds = this.getTableIds();

    if (this.tableIds.length === 0) return;

    this.formattedRows = this.tableIds.map(el => this.rawData(el)).map(el => {
      const copyArr: any[] = el.data.slice().map(el_ => Object.assign({}, el_)),
        copy = Object.assign({}, el);

      copy.data = copyArr;

      if (el.id.match(/nyeregler/) && el.id.match(/forbrugsafgift/)) {
        const year = this.model.year,
          power = year - 2017,
          boost = Math.pow(1.055, power);

        copy.data.forEach(el_ => {
          el_.value = this.roundClosest(el_.value * boost, 10);
        });
      }

      if (this.model.isVeteranCar()) {
        copy.data.forEach(el_ => {
          el_.value = Math.floor(el_.value / 4);
        });
      } else if (this.model.valueIs('weightTruck') === 'moreThan12t') {
        const el =
          this.model.valueIs('affjedringstype') === 'luft'
            ? copy.data.length - 1
            : 0;

        copy.data.splice(el, 1);
      } else if (this.model.valueIs('type') === 'taxi') {
        const isRegular = !copy.id.match(/udligning/);

        if (isRegular) {
          copy.data.forEach(el_ => (el_.value = 0));
        } else if (this.model.getAfgiftsType('ejerafgift')) {
          copy.data.forEach(el_ => (el_.value = el_.value * 2));
        }
      } 

      return copy;
    });

    this.modifyTablesSpecialCase();
    this.interval = this.intervalService.getInterval(this.formattedRows);

    const type = this.isKmRules() ? 'kml' : 'vaegt';

    if (this.inputType && this.inputType.length > 0 && type !== this.inputType)
      this.value = '';

    this.inputType = this.isKmRules() ? 'kml' : 'vaegt';
  }

  getTableIds() {
    return this.table.filter(el => el.modelFit()).map(el => el.rowIds());
  }

  getWightType() {
    const test = {
        egenvaegt: ['car', 'camper', 'bus', 'taxi'],
        totalvaegt: ['truck', 'van', 'trailer']
      },
      vehicle = this.model.valueIs('type');

    return Object.keys(test).reduce((p, v) => {
      const vehicles = test[v],
        index = vehicles.indexOf(vehicle);

      return index > -1 ? v : p;
    }, '');
  }

  hasExceptionelCosts() {
    const particle = this.model.valueIs('particle') === 'nej',
      privatBenyttelses = this.model.valueIs('privatanvendelse'),
      vejBenyttelses = this.model.valueIs('weightTruck') === 'moreThan12t';

    return particle || privatBenyttelses || vejBenyttelses;
  }

  setAllData() {
    const url = environment.production
      ? 'websrv/jsong.ashx?Id=15016'
      : 'app/data';

    this.http
      .get(url)
      .subscribe((el) => {
        this.data = el.json();
        if (this.model.allParametersSet()) {
          this.setNewTablesOnChange();
        }
      });
  }

  getIntervalsPrYear() {
    const b = this.formattedRows[0].period;

    if (b.length === 1) {
      return b[0];
    } else {
      const val = Number(this.value.replace(',', '.'));

      const index = this.interval.findIndex(el => {
        return val >= el.from && val <= el.to;
      });

      return b[index];
    }
  }

  getTotal() {
    const index = this.getRowIndex();

    const tableSum = this.formattedRows
      .filter(el => el.tableId !== '-')
      .reduce((p, v) => {
        const periodsYear =
          v.period.length === 1 ? v.period[0] : v.period[index];
        return p + this.getValueofCell(v.data[index]) * periodsYear;
      }, 0);

    const special = [
      this.getPrivatBenyttelsesAfgift(),
      this.getPartikelFilterAfgift(),
      this.getVejbenyttelsesAfgift()
    ].reduce((p, v) => {
      return p + v;
    }, 0);

    return tableSum + special;
  }

  getTotalPrInterval() {
    const index = this.getRowIndex(),
      periods = this.getIntervalsPrYear();

    const tableSum = this.formattedRows
      .filter(el => el.tableId !== '-')
      .reduce((p, v) => {
        return p + this.getValueofCell(v.data[index]);
      }, 0);

    const special = [
      this.getPrivatBenyttelsesAfgift(),
      this.getPartikelFilterAfgift(),
      this.getVejbenyttelsesAfgift()
    ].reduce((p, v) => {
      return p + v;
    }, 0);

    return tableSum + special / periods;
  }

  isSmallTable() {
    return this.formattedRows.length === 1 || this.isKmRules();
  }

  getRowIndex() {
    const val = Number(this.value.replace(',', '.'));

    const index = this.interval.findIndex(el => {
      return val >= el.from && val <= el.to;
    });

    return index;
  }

  /**
   * Below: car!van*ejerafgift*forbrugsafgift table is 3 indexes too long when no-diesel is chosen
   * other solution: two table with almost identical dataset
   * Is a consequence of different interval length when swapping 1997-2017 between diesel and benzin
   */

  modifyTablesSpecialCase() {
    const isEjerafgift = !!this.tableIds.find(
        (el: string) => !!el.match(/ejerafgift/)
      ),
      isNotudligning = !this.tableIds.find(
        (el: string) => !!el.match(/udligning/)
      ),
      isRegular = !this.tableIds.find((el: string) => !!el.match(/nye/));

    if (isEjerafgift && isNotudligning && isRegular) {
      const forbrug = this.formattedRows.find(el => !!el.id.match(/forbrug/));

      if (forbrug) {
        const len = forbrug.data.length;
        forbrug.data = forbrug.data.slice(0, len - 3);
      }
    }
  }

  columnHasDivPeriods() {
    return (
      this.formattedRows.filter(el => el.tableId !== '-')[0].period.length > 1
    );
  }

  getDivPeriod(index: number) {
    return this.formattedRows.filter(el => el.tableId !== '-')[0].period[index];
  }

  formatTable() {
    const columns = this.tableIds.map(el => this.rawData(el));
  }

  isKmRules() {
    return !!this.formattedRows.find(el => !!el.tableId.match('ejerafgift'));
  }

  determineInput() {
    return this.isKmRules() ? 'kml' : 'vaegt';
  }

  getValueofCell(cell: { regular; value; interval }) {
    const val = Number(this.value.replace(',', '.'));

    if (!cell) return;
    if (cell.regular) return cell.value;

    return this.roundClosest(val, cell.interval) / cell.interval * cell.value;
  }

  getPartikelFilterAfgift() {
    const vehicle = this.model.valueIs('type'),
      year = this.model.year,
      hasNoFilter = this.model.valueIs('particle') === 'nej',
      vehicles = this.model.valuePropIsEither('type', ['car', 'van', 'taxi']);

    if (!vehicles || !hasNoFilter) return 0;

    const data = this.formatData('partikelFilterAfgift');

    if ((vehicle === 'car' || vehicle === 'taxi') || (vehicle === 'van' && this.model.getAfgiftsType('ejerafgift'))) {
      return data[2];
    } else {

      const lookup = {
        '2016': 0,
        '2017': data[0],
        '2018': data[1]
      };

      return year >= 2019 ? data[2] : lookup[year.toString()];
    }
  }

  formatData(id: string) {
    const data_ = this.data.find(el => el.id === id);

    const proxyYear = this.getYearData(data_.en);

    let yeardata_ = data_.children.find(el => el.id === proxyYear.toString());

    yeardata_ = yeardata_ ? yeardata_ : data_.children[0];
    yeardata_ = yeardata_.da.split(',').map(el => Number(el));

    return yeardata_;
  }

  getVejbenyttelsesAfgift() {
    if (!(this.model.valueIs('weightTruck') === 'moreThan12t')) return 0;

    const axelsVogntog =
      this.model.valueIs('sammenkobling') === 'godkendt'
        ? 2
        : Number(this.model.valueIs('akslerVogntog'));

    const axelsReg = Number(this.model.valueIs('akslerRegTruck')) + 1,
      subset = axelsReg + axelsVogntog >= 4 ? 3 : 0,
      data = this.formatData('vejbenyttelseAfgift').slice(subset, subset + 3),
      euro = this.model.valueIs('euroStandard'),
      index = ['ikkeEuro', 'euro1', 'euro2'].indexOf(euro);

    return data[index];
  }

  getPrivatBenyttelsesAfgift() {
    const isVan = this.model.valueIs('type') === 'van',
      mainPeriod = Number(this.model.valueIs('period')),
      subPeriod = Number(this.model.valueIs('subperiod'));

    if (!isVan) return 0;

    const usage = this.model.valueIs('privatanvendelse'),
      lookup = {
        privat: 1,
        blandet: 0.5,
        erhverv: 0
      },
      ratio = lookup[usage];

    const yeardata_ = this.formatData('privatAnvendelsesAfgift');

    const limitPeriod_1 = 6,
    limitPeriod_2 = 8;

    const isPeriod1 = mainPeriod < limitPeriod_1 || (mainPeriod === limitPeriod_1  && subPeriod === 2),
      isPeriod2 = mainPeriod === (limitPeriod_1 + 1)
      || (mainPeriod === limitPeriod_1 && subPeriod === 1)
      || (mainPeriod === limitPeriod_2 && subPeriod === 2);

    const theheavy =
      mainPeriod > 4 || (mainPeriod === 4 && subPeriod === 1)
        ? Number(this.value) > (mainPeriod < 6 || (mainPeriod === 6 && subPeriod === 2) ? 3000 : 2000)
        : this.model.valueIs('vaegtVareBil') === 'moreThan3t';


    if (isPeriod1) {
      const key = theheavy ? 2 : 1;
      return yeardata_[key] * ratio;
    } else if (isPeriod2) {
      const key = theheavy ? 1 : 0;

      return yeardata_[key] * ratio;
    } else {
      return 0;
    }
  }

  roundClosest(value: number, m: number) {
    value = Number(value);

    let mod = value % m;

    return mod > 0 ? value + m - mod : value;
  }

  getYearData(str: string): number {
    const yearChosen = Number(this.model.year);

    if (!str || str === '') {
      return yearChosen;
    } else {
      /** *2017=2016,2015 */

      const split_ = str.split('='),
        proxyYear = Number(split_[0]),
        isYear =
          split_[1]
            .split(',')
            .map(el => Number(el))
            .indexOf(yearChosen) > -1;

      return isYear ? proxyYear : yearChosen;
    }
  }

  rawData(id: string) {
    const data_ = this.data.find(el => el.id === id);

    if (!data_) throw Error(`Id ${id} datatabel ikke fundet`);

    const periodData =
        data_.group && data_.group.length > 0
          ? data_.group.split(',').map(el => Number(el))
          : [1],
      proxyYear = this.getYearData(data_.en);

    let yeardata = data_.children.find(el => el.id === proxyYear.toString());

    if (!yeardata) yeardata = data_.children[0];

    const formatted = yeardata.da.split(',').map((el: string) => {
      const special = el.trim().charAt(0) === '*';

      if (special) {
        const split = el.substr(1).split('/');

        return {
          regular: false,
          value: Number(split[0]),
          interval: Number(split[1])
        };
      } else {
        return {
          regular: true,
          value: Number(el)
        };
      }
    });

    return {
      id: id,
      data: formatted,
      tableId: data_.da,
      period: periodData
    };
  }
}
