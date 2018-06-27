import { Injectable } from '@angular/core';
import { periodOptions } from '../commonUtil/interfaces';

@Injectable()
export class PeriodsService {
  car: periodOptions[];
  van: periodOptions[];

  splitDates = [
    {
      id: 'car',
      splitdates: () => { // is fn to make it ready for dynamic types

        const splits = [
          new Date(2017, 9, 3),
          new Date(1997, 0, 30),
          new Date(1997, 6, 1)
        ];

        return splits;
      }
    },
    {
      id: 'van',
      splitdates: () => {
        const splits = [
          new Date(2017, 9, 3),
          new Date(2009, 2, 18),
          new Date(2007, 3, 25),
          new Date(1998, 5, 3)
        ];

        return splits;
      }
    }
  ];

  constructor() {}

  getPeriodOptions(type: string): periodOptions[] {

    const cached = this[type];

    if (cached) {
      return cached;
    }

    if (type === 'taxi') { type = 'car'; }

    const _ob = this.splitDates.find(el => el.id === type);

    if (!_ob) {return; }

    const
      currentDate = new Date(),
      currentYear = currentDate.getFullYear(),
      splits = _ob.splitdates(),
      len = splits.length,
      startAndend = [ // 1. adding start and end index
        new CreatePeriod(splits[0].getFullYear() + 1, null, null),
        new CreatePeriod(null, splits[len - 1].getFullYear() - 1, null),
      ],
      // 2. format the years which do have one or more split dates
      uniqueSplits = Object.values(splits
        .reduce((store: Object, val: Date) => {

          if (!store[val.getFullYear()]) { // the year is new / unique
            store[val.getFullYear()] = new CreatePeriod(null, null, [val]);
          } else { // push to an existing year
            store[val.getFullYear()].split.push(val);
          }

          return store;
        }, {}));

      // 3. get the years
      const betweens = Array(len).fill('')
        .map((el, i) => {

          if (i > 0) {
            const prev = splits[i - 1],
              current = splits[i],
              difYear = prev.getFullYear() - current.getFullYear();

            if (difYear > 1) {
              return new CreatePeriod(prev.getFullYear() - 1, current.getFullYear() + 1, null);
            }
          }

          return null;

        })
        .filter(el => el !== null);

      const concat = <CreatePeriod[]>[]
        .concat(startAndend, uniqueSplits, betweens)
        .sort((a: CreatePeriod, b: CreatePeriod) => {

          const getLatest = function (val: CreatePeriod) {

            if (val.fromYear > 0) {
              return val.fromYear;
            } else if (val.toYear > 0) {
              return val.toYear;
            } else {
              return  val.split[0].getFullYear();
            }

          };

          return (getLatest(a) > getLatest(b)) ? -1 : 1;

        });

      return concat;

  }

}


class CreatePeriod {

  constructor (public fromYear: number, public toYear: number, public split: Date[]) {}

}