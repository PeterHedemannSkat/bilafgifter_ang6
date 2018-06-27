import { Component, OnInit } from "@angular/core";
import { DataQueryService } from "../../services/dataQuery";
import { CommonsService } from "../../services/common";
import { TextService } from "../../services/textService";

@Component({
  selector: "app-calculations",
  templateUrl: "./calculations.component.html",
  styles: []
})
export class CalculationsComponent implements OnInit {
  constructor(
    public table: DataQueryService,
    public txt: TextService,
    public common: CommonsService
  ) {}

  ngOnInit() {}

  printClosestHundred(calc: any) {
    /** skal afrundes dynamisk */
    return this.table.roundClosest(Number(this.table.value), calc);
  }

  printTilOpkravningPrAar() {
    const prYear = `tilOpkravning_${this.table.getIntervalsPrYear()}`;
    return this.txt.getGeneral(prYear);
  }

  printTableHeading() {
    const interval = this.table.getIntervalsPrYear();

    const map = {
      prKvartal: 4,
      prhalvAar: 2,
      prAar: 1
    };

    const id = Object.keys(map).find(el => map[el] === interval);

    return `opkrævning ${this.txt.getGeneral(`${id}`)}`;
  }

  prepareDataInterval() {
    const index = this.table.getRowIndex();

    const data = this.table.formattedRows
      .filter(el => el.tableId !== "-")
      .map(el => {
        return {
          intervalPrYear: this.table.getIntervalsPrYear(),
          id: this.common.getIdforHeader(el.id),
          valueObj: el.data[index]
        };
      });

    const privatbenyttelsesAfgift = this.table.getPrivatBenyttelsesAfgift(),
      partikelfilterAfgift = this.table.getPartikelFilterAfgift(),
      vejbeyttelsesAfgift = this.table.getVejbenyttelsesAfgift();

    if (privatbenyttelsesAfgift > 0) {
      data.push({
        intervalPrYear: 1,
        id: "privatBenyttelsesAfgift",
        valueObj: {
          regular: true,
          value: privatbenyttelsesAfgift / this.table.getIntervalsPrYear()
        }
      });
    }

    if (partikelfilterAfgift > 0) {
      data.push({
        intervalPrYear: 1,
        id: "partikelfilterAfgift",
        valueObj: {
          regular: true,
          value: partikelfilterAfgift / this.table.getIntervalsPrYear()
        }
      });
    }

    if (vejbeyttelsesAfgift > 0) {
      data.push({
        intervalPrYear: 1,
        id: "vejbeyttelsesAfgift",
        valueObj: {
          regular: true,
          value: vejbeyttelsesAfgift / this.table.getIntervalsPrYear()
        }
      });
    }

    return data;
  }

  prepareData() {
    const index = this.table.getRowIndex();
    /**
     * husk filter
     */
    const data = this.table.formattedRows
      .filter(el => el.tableId !== "-")
      .map(el => {
        const periodsYear =
          el.period.length === 1 ? el.period[0] : el.period[index];

        return {
          intervalPrYear: periodsYear,
          id: this.common.getIdforHeader(el.id),
          valueObj: el.data[index]
        };
      });

    const privatbenyttelsesAfgift = this.table.getPrivatBenyttelsesAfgift(),
      partikelfilterAfgift = this.table.getPartikelFilterAfgift(),
      vejbeyttelsesAfgift = this.table.getVejbenyttelsesAfgift();

    if (privatbenyttelsesAfgift > 0) {
      data.push({
        intervalPrYear: 1,
        id: "privatBenyttelsesAfgift",
        valueObj: {
          regular: true,
          value: privatbenyttelsesAfgift
        }
      });
    }

    if (partikelfilterAfgift > 0) {
      data.push({
        intervalPrYear: 1,
        id: "partikelfilterAfgift",
        valueObj: {
          regular: true,
          value: partikelfilterAfgift
        }
      });
    }

    if (vejbeyttelsesAfgift > 0) {
      data.push({
        intervalPrYear: 1,
        id: "vejbeyttelsesAfgift",
        valueObj: {
          regular: true,
          value: vejbeyttelsesAfgift
        }
      });
    }

    return data;
  }
}
