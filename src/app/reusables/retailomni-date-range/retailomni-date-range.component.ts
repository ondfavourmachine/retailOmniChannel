import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { InformationForRetailDateRange } from 'src/app/models/generalModels';

@Component({
  selector: 'app-retailomni-date-range',
  templateUrl: './retailomni-date-range.component.html',
  styleUrls: ['./retailomni-date-range.component.scss']
})
export class RetailomniDateRangeComponent implements OnInit {
  @Input('information') information: InformationForRetailDateRange = { extraButtonClasses: ['']};
  @Output('fetchDataWithDateParams') fetchDataWithDateParams = new EventEmitter<{dates: FormGroup, event: Event}>();
  campaignOne: FormGroup = new FormGroup({});
  today = new Date();
  month = this.today.getMonth();
  year = this.today.getFullYear();
  constructor() { }

  ngOnInit(): void {
    this.campaignOne = new FormGroup({
      start: new FormControl(new Date(this.year, this.month, 13)),
      end: new FormControl(new Date(this.year, this.month, 16)),
    });
  }


  sendUpEvent(event: Event){
    this.fetchDataWithDateParams.emit({dates: this.campaignOne, event});
  }
}
