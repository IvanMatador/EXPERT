import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  isOpened: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  openMenu() {
    this.isOpened = true;
  }

  closeFilters() {
    this.isOpened = false;
  }

}
