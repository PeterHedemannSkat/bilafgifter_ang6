import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-interval',
  templateUrl: './interval.component.html',
  styles: []
})
export class IntervalComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input() interval: {from,to};



}
