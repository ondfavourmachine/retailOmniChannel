import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoggedInStaffRole } from 'src/app/models/authModel';
import { InformationForRetailDateRange, searchCompRequiredInfo } from 'src/app/models/generalModels';
import { UserService } from 'src/app/services/user.service';
import { UtilityFuncsService } from 'src/app/services/utility-funcs.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss']
})
export class UserHomeComponent implements OnInit {
  role: LoggedInStaffRole | undefined =  undefined;
  fadeApproval: boolean = false;
  showLockAProfileButton: boolean = false;
  info: InformationForRetailDateRange = {
    labelText: 'Filter Using:',
    buttonText: 'Filter Table',
    buttonWidth: '9rem',
    labelTextColor: '#003366',
    fontFamily: 'Campton Book',
    fontWeight: '400',
    extraButtonClasses: ['px-5']
  }
  // informationForSearchComp:  searchCompRequiredInfo | undefined = undefined
  constructor(
    private router: Router, 
    private userservice:UserService, 
    private utils: UtilityFuncsService,
    private datePipe: DatePipe) { }

  ngOnInit(): void {
  
    this.role = JSON.parse(sessionStorage.getItem('role') as string) as LoggedInStaffRole;
    this.role.role == 'INITIATOR' ? this.fadeApproval = true : this.fadeApproval =  false;
  }


  setSelected(event: Event){
    const htmlDiv = event.target as HTMLDivElement;
    const {textContent, id} = htmlDiv;
    const toggleGroupItem: NodeListOf<HTMLDivElement> = document.querySelectorAll('.toggle_Group_item');
    toggleGroupItem.forEach(elem => elem.classList.remove('selected'));
    htmlDiv.classList.add('selected');
    console.log(textContent);
    textContent?.trim() == 'locked profiles' ? this.showLockAProfileButton = true : this.showLockAProfileButton = false;
    this.router.navigate(['dashboard', 'users', `${id}`]);
  }

  handleEvent(event: any){
    console.log(event);
  }

  fetchResults(event:{dates: FormGroup, event: Event}){
    const {start, end} = event.dates.value;
    console.log(start, end);
    const dates: string[] = [ this.datePipe.transform(start, 'dd/MM/YYYY') as string, this.datePipe.transform(end, 'dd/MM/YYYY') as string, ];
    this.fetchResultsWithInputParametersContainingDates(event.event, dates);
  } 
  fetchResultsWithInputParametersContainingDates(event: Event, dates: string[] ){
    const btn = event.target as HTMLButtonElement;
    const {innerHTML : prevText} = btn;
    this.utils.loading4button(btn, 'yes', 'Fetching...');
    this.userservice
    .searchUsersByDateTimeAndOtherAccDetails(dates, {pageNumber: 1, pageSize: 10})
    .subscribe(val => {
      console.log(val);
      this.utils.loading4button(btn, 'done', prevText);
      this.utils.successSnackBar(`Accounts from ${dates[0]} - ${dates[1]} fetched successfully`, 'close')
    }, err => {
      console.log(err);
      this.utils.loading4button(btn, 'done', prevText);
      this.utils.errorSnackBar(`Failed to load accounts.`, 'close')
    })
  }

}
