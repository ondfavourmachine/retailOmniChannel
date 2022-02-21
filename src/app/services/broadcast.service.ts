import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SearchResultFromDateRange } from '../models/generalModels';

@Injectable({
  providedIn: 'root'
})
export class BroadcastService {
private newSearchResult: SearchResultFromDateRange = {
    component : null,
    data: []
  };
 private broadCastData = new BehaviorSubject(this.newSearchResult);
  broadCastDataListeners$ = this.broadCastData.asObservable();
  constructor() { }

  communicateSearchResultsToListeners(newRes: SearchResultFromDateRange){
    this.broadCastData.next(newRes);
  }
}
