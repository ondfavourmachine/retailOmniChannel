import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-successful-update',
  templateUrl: './successful-update.component.html',
  styleUrls: ['./successful-update.component.scss']
})
export class SuccessfulUpdateComponent implements OnInit, AfterViewInit {
 text: HTMLElement | undefined = undefined;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {person : string, text: 'lock' | 'unlock'}, 
  ) { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    
  }
  
  

}
