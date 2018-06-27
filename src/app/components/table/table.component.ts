import { Component, OnInit } from '@angular/core';
import { DataQueryService } from '../../services/dataQuery';
import { IntervalService } from '../../services/intervalService';
import { TusindtalsSep } from '../../commonUtil/pipeTusindTal';
import { Model } from '../../services/model';
import { TextService } from '../../services/textService';
import { CommonsService } from '../../services/common';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styles: []
})
export class TableComponent implements OnInit {

  constructor(
    public table: DataQueryService,
    public model: Model,
    public interval: IntervalService,
    public txt: TextService,
    public common: CommonsService
  ) {}

  ngOnInit() {
  }

  printInterval(index: number) {

    const 
      isejerAfgift = this.table.tableIds.find((el: string) => !!el.match(/ejerafgift/)),
      len = this.table.formattedRows[0].data.length;

    index = (isejerAfgift) ? (len - 1 - index) : index;

    const tusind = new TusindtalsSep();
    const rowindex = this.table.interval[index];

    return rowindex;

  }

  printCell(cell: {regular, value, interval}) {
    
    const tusind = new TusindtalsSep()

    if (cell.regular) {
      return `${tusind.transform(cell.value)} kr.`
    } else {
      return `${cell.value} kr. pr. ${cell.interval} kg`
    }

  }

  printHeader(id: string) {

    const text = {
      'other':this.printOtherType(),
      'udligning': 'udligning'
    }

    return text[id];
  }

  printOtherType() {

    if (this.model.valuePropIsEither('type', ['car', 'van'])) {

      return this.model.getAfgiftsType('vaegtafgift') ? 'vægtafgift' : 'ejerafgift'

    } else {

      return 'vægtafgift'

    }
    
    
  }



  getRowData(tableindex: number, index: number) {

    const 
      isejerAfgift = this.table.tableIds.find((el: string) => !!el.match(/ejerafgift/)),
      len = this.table.formattedRows[0].data.length;

    index = (isejerAfgift) ? (len - 1 - index) : index;

    return this.table.formattedRows.map(el => el.data[index])

  }

  getColumnType() {
    const
    isejerAfgift = this.table.tableIds.find((el: string) => !!el.match(/ejerafgift/)),
    dataForTable = this.table.formattedRows
      .filter(el => el.tableId !== '-')
      .map(el => {
        return el.id.match(/udligning/) ? 'udligning' : 'other';
      })
    
    return dataForTable

  }

  getTableStructure() {

    const
      isejerAfgift = this.table.tableIds.find((el: string) => !!el.match(/ejerafgift/)),
      dataForTable = this.table.formattedRows
        .filter(el => el.tableId !== '-')
        .map(el => Object.assign({},el));

    
    dataForTable.forEach(el => {
        if (isejerAfgift) {
          el.data = el.data.slice().reverse()
        }  
      })
    
    const store = dataForTable[0].data.map((el,i) => {
      const row = []
      dataForTable.forEach(el_ => {
        row.push(el_.data[i])
      })

      return row;

    })

    return store;
      
  }

  printPeriod(intervalsPrYear: number) {
    
    const wordMapping = {
      1:'år',
      2:'halvår',
      4:'kvartal'
    }

    return wordMapping[intervalsPrYear]


  }

}
