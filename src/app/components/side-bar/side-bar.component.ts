import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }


  
  gotoRoute(event: Event, route: string){
    const element = (event.target as HTMLElement).closest('ul') as HTMLUListElement;
    const {target} = event;
    const removeClass = (elem: HTMLElement) => elem.classList.remove('activated');
    element.querySelectorAll('li').forEach(removeClass);
    const currentTarget = target instanceof HTMLLIElement ? target : (target as HTMLElement).closest('li');
    currentTarget?.classList.add('activated');

    this.router.navigate(['dashboard', `${route}`])
  }

}
