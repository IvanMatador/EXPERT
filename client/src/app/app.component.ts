import { Component, ViewChild, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Parts';
  
  isOpened: boolean;

  constructor() {
    
  }

  ngOnInit() {
  }

  openMenu() {
    this.isOpened = true;
  }

  closeSidebar() {
    this.isOpened = false;
  }

}
