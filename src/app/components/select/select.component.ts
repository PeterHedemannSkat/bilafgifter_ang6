import { Component, OnInit } from "@angular/core";
import { Model } from "../../services/model";
import { TextService } from "../../services/textService";
import { optionsTxt } from "../../commonUtil/interfaces";
import { CommonsService } from "../../services/common";

@Component({
  selector: "app-select",
  templateUrl: "./select.component.html",
  styles: []
})
export class SelectComponent implements OnInit {
  constructor(
    public model: Model,
    public text: TextService,
    public common: CommonsService
  ) {}

  ngOnInit() {}

  getUserOptions(options: optionsTxt) {
    let optionsValues = [];

    if (options.options) {
      optionsValues = options.options;
    } else {
      for (let i = 0; i < options.data.length; i++) {
        optionsValues[i] = i + 1;
      }
    }

    const txt = this.text.getTxt(options);

    const collection = [];

    for (let i = 0; i < txt.length; i++) {
      collection.push({
        value: optionsValues[i],
        txt: txt[i]
      });
    }

    collection.unshift({ txt: "Vælg", value: "-----" });

    return collection;
  }
}
