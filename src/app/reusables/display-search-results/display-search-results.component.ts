import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ACustomer, RegisterCustomerDetails, searchCompRequiredInfo } from 'src/app/models/generalModels';
import { UserService } from 'src/app/services/user.service';
import { UtilityFuncsService } from 'src/app/services/utility-funcs.service';

@Component({
  selector: 'app-display-search-results',
  templateUrl: './display-search-results.component.html',
  styleUrls: ['./display-search-results.component.scss']
})
export class DisplaySearchResultsComponent implements OnInit, OnChanges {
@Input("searchDetails") searchDetails: searchCompRequiredInfo | undefined;
@Output('closeSearchDisplay') closeSearchDisplay = new EventEmitter<undefined>();
searchResults: ACustomer | undefined = undefined;
registeredCustomer: RegisterCustomerDetails | undefined = undefined;
customerInitials: string = 'JD';
isLoading = true;
savedCompName: string = '';
  constructor(private userservice: UserService, private utils: UtilityFuncsService) { }

  ngOnChanges(): void { 
     if(typeof this.searchDetails == 'object'){
      const parent = document.querySelector('.searchResult_dropdown') as HTMLElement;
      const body_content_child = document.querySelector('.body_content_child') as HTMLElement;
       body_content_child.classList.remove('overflow-y-scroll');
      body_content_child.classList.add('overflow-visible');
      parent?.classList.add('show');
      this.savedCompName = this.searchDetails.parentComp;
      this.fetchResultsWithInputParameters(this.searchDetails.searchEvent);
     }else{
      const body_content_child = document.querySelector('.body_content_child') as HTMLElement;
      const parent = document.querySelector('.searchResult_dropdown') as HTMLElement;
       body_content_child.classList.add('overflow-y-scroll');
       body_content_child.classList.remove('overflow-visible');
      parent?.classList.remove('show');
      this.searchResults = undefined;
     }
  }

  ngOnInit(): void {
  }
  


  increaseHeight(event: Event){
    const svg = (event.target as HTMLElement).closest('svg');
    const expandibleSection =  document.querySelector('.expandible_section') as HTMLElement;
    svg?.classList.contains('point_up') ? svg.classList.remove('point_up') : svg?.classList.add('point_up');
    expandibleSection.classList.contains('increaseHeight') ? expandibleSection.classList.remove('increaseHeight') : expandibleSection.classList.add('increaseHeight');
  }

  closeOrOpenSearchResults(event: Event){
    // console.log(document.querySelector('.searchResult_dropdown'));
    const parent = document.querySelector('.searchResult_dropdown') as HTMLElement;
    parent?.classList.contains('show') ? parent.classList.remove('show') : parent?.classList.add('show');
  }

  triggerOpenOrClose(){
    this.closeSearchDisplay.emit(undefined);
  }

  fetchResultsWithInputParameters(event: Event){
    this.isLoading = true;
    const input =  event.type == 'keydown'  ? event.target as HTMLInputElement :  document.getElementById('searchAcc') as HTMLInputElement;
    this.userservice.searchUserByAcc(input.value).subscribe(val => {
      const {userInfo, reg} = val;
      const {lastname = 'Doe', firstname = 'Jane'} = reg as RegisterCustomerDetails;
      this.customerInitials = firstname.slice(0,1)[0].toUpperCase() + lastname.slice(0, 1).toUpperCase();
      this.searchResults = userInfo;
      console.log(reg)
      this.registeredCustomer = reg as RegisterCustomerDetails;
      this.isLoading = false;
      this.utils.successSnackBar(`Customer account no: ${input.value} has been retrieved!`, 'close');
    }, err => {
      console.error(err);
      this.isLoading = false;
      this.utils.errorSnackBar(`Could not fetch information for ${input.value}`);
    });
  }


 

}
