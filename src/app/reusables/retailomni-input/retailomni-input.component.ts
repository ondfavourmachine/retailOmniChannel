import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-retailomni-input',
  templateUrl: './retailomni-input.component.html',
  styleUrls: ['./retailomni-input.component.scss']
})
export class RetailomniInputComponent implements OnInit {
  @Output('customChange') customChange = new EventEmitter<Event>();
  constructor() { }

  ngOnInit(): void {
  }

  emitEvent(event: Event){
    event.stopImmediatePropagation();
    event.stopPropagation();
    event.preventDefault();
    let input:HTMLInputElement
    if(event.type == 'keydown') input = event.target as HTMLInputElement;
    else input = document.getElementById('searchAcc') as HTMLInputElement;
    (event.type == 'keydown' || event.type == 'click' ) && input.value.length >= 8 ? this.customChange.emit(event) : null;
  }

}
