import { Injectable } from '@angular/core';
import { CommonsService } from './common';
import { intervalsBilafgifter } from './data/IntervalData';
import { DataQueryService } from './dataQuery';

@Injectable()
export class IntervalService {

  tables: any[];
  
  constructor() {}

  isKmRules() {
   return !!this.tables.find((el) => !!el.tableId.match('ejerafgift')) 
  }

  /**
   * CREATES the interval tables 
   */

  getInterval(tables: any[]):{from, to}[] {

    this.tables = tables;

    let intervalObj = this.getIntervalRaw(),
        len         = intervalObj.length,
        fromArray   = intervalObj.slice(0,len-1),
        toArray     = intervalObj.slice(1),
        isKm        = !!tables.find((el) => !!el.tableId.match('ejerafgift'))

    let interval:{from, to}[] = new Array(len-1)

    if (isKm) {  
        toArray = toArray.map(v => v === Number.POSITIVE_INFINITY ? Number.POSITIVE_INFINITY : Number((v - 0.1).toFixed(1))); 
    } else {
        fromArray = fromArray.map(v =>v + 1);
    }

    for (let i = 0; i < len-1; i++) {
        interval[i] = {from: fromArray[i],to: toArray[i]}
    }

    return interval
  }

  /**
   * Helper function to getInterval()
   * is used to get the correct table in a the format of a normal array
   * to reuse data for ejerafgift, it uses a common source, adjust its length to the length of the table
   * if not ejerafgift, it just fetches the table
   * 
   * is used for getInterval()
   */

  getIntervalRaw() {

    const isEjerafgift = !!this.tables.find((el) => !!el.id.match('ejerafgift'))

    if (isEjerafgift) {

      const maxRowSize = this.tables.reduce((p, v) => {
        return v.data.length > p ? v.data.length  : p
      }, 0)

      const
        isUdligning = !!this.tables.find((el) => !!el.id.match('udligning')),
        tableId = isUdligning ? 'ejerafgift*udligning*nye' : 'ejerafgift*forbrug*nye',

        tableRef = intervalsBilafgifter.find(el => el.id === tableId).data,
        row = tableRef.slice(0, maxRowSize)

        row.push(Number.POSITIVE_INFINITY)

        return row;

    } else {

      return intervalsBilafgifter.find(el => el.id === this.tables[0].tableId).data       

    }



  }  



}