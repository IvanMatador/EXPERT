import { Component, ViewChild, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import * as moment from 'moment';

import { UsersService } from './../services/users.service';


export interface UserData {
  publicationType: string;
  termType: string;
  reportGroup: string;
  reportState: string;
  reportFormat: string;
  outputDate: string;
  outputNumber: string;
  res?: any;
}

export interface ValueAsObject {
  value: string;
  type: string[];
}

@Component({
  selector: 'app-sorter-table',
  templateUrl: './sorter-table.component.html',
  styleUrls: ['./sorter-table.component.css']
})
export class SorterTableComponent implements OnInit {

  displayedColumns: string[] = [ 'publicationType', 'termType', 'reportGroup', 'reportState', 'reportFormat', 'outputDate', 'outputNumber', 'res' ];
  dataSource: MatTableDataSource<UserData>;
  emptyData: any = [{
    "idReport": 0,
    "idSubject": 0,
    "reportState": "",
    "termType": "",
    "publicationType": "",
    "reportGroup": "",
    "outputNumber": "",
    "outputDate": {
      "date": "",
      "timezone_type": 3,
      "timezone": "Europe/Kiev"
    },
    "bSentToNSSMC": true,
    "bDisclosure": true,
    "dateFill": {
      "date": "",
      "timezone_type": 3,
      "timezone": "Europe/Kiev"
    },
    "reportFormat": ""
  }]
  
  filterValue = [];
  types = new FormControl();
  pediods = new FormControl();
  categories = new FormControl();
  statuses = new FormControl();
  fileTypes = new FormControl();
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  typesList: string[] = ['Подання інформації'];
  pediodsList: string[] = ['Щоденні'];
  categoryList: string[] = ['Депозитарні установи'];
  statusList: string[] = ['Помилка валідації на боці інформагента'];
  fileTypesList: string[] = ['txt'];
  isEmpty: boolean = false;
  dateFrom: string = '';
  dateTo: string = '';

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private usersService: UsersService, cd: ChangeDetectorRef) { 
  }

  ngOnInit() {
    this.starter();
  }

  starter() {
    this.usersService.fetch().subscribe(users => {
      this.dataSource = new MatTableDataSource(this.normolizeUsers(users));
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.setFields();
    });
  }

  getByParams() {
    this.usersService.fetchByParams(this.filterValue).subscribe(users => {
      if (users.length === 0) {
        users = this.emptyData;
        this.isEmpty = true;
      } else {
        this.isEmpty = false;
      }
      this.dataSource = new MatTableDataSource(this.normolizeUsers(users));
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  setFields() {
    let startTypesList = [];    
    let startPediodsList = [];
    let startCategoryList = [];
    let startStatusList = [];
    let startFileTypesList = [];

    this.dataSource.data.map(item => {
      startTypesList.push(item.publicationType),
      startPediodsList.push(item.termType),
      startCategoryList.push(item.reportGroup),
      startStatusList.push(item.reportState),
      startFileTypesList.push(item.reportFormat)
    });

    const type = new Set(startTypesList);    
    const period = new Set(startPediodsList);
    const category = new Set(startCategoryList);
    const status = new Set(startStatusList);
    const file = new Set(startFileTypesList);

    this.typesList = [...type];
    this.pediodsList = [...period];
    this.categoryList = [...category];
    this.statusList = [...status];
    this.fileTypesList = [...file];
  }

  addFilter(value: string, type: string) {
    this.multiFilter(value, type);
    
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  multiFilter(value: string, type: string) {
    const valueAsArray = [ type, value ];
    this.filterToggle(this.filterValue, valueAsArray);
    if (this.filterValue.length > 0) {
      this.getByParams()
    } else {
      this.starter()
    }
  }

  filterToggle(arr, filtersArray: any) {
    if (arr.length !== 0) {
      const idx = arr.findIndex(item => item[0] === filtersArray[0] && item[1] === filtersArray[1]);
      const idx2 = arr.findIndex(item => item[0] !== filtersArray[0] && item[1] === filtersArray[1]);
      if (idx !== -1) {
        arr.splice(idx, 1);
      } else if (idx2 !== -1) {
        arr.push(filtersArray);
      } else {
        arr.push(filtersArray);
      }
    } else {
      arr.push(filtersArray);
    }
  }

  dateChangeStart(valueStart) {
    const idx = this.filterValue.findIndex(item => item[0] === 'dateFrom');
    if (idx !== -1) {
      this.filterValue.splice(idx, 2);
    }
    if (valueStart) {
      this.dateFrom = '';
      this.dateTo = '';
      this.dateFrom = moment(valueStart).format('x');
    }
  }

  dateChangeEnd(valueEnd) {
    if (valueEnd) {
      this.dateTo = moment(valueEnd).format('x');
      this.multiFilter(this.dateFrom, 'dateFrom');
      this.multiFilter(this.dateTo, 'dateTo');
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  clearFilters() {
    this.dataSource.filter = '';
    this.filterValue = [];
    this.starter();
    this.types.reset();
    this.pediods.reset();
    this.categories.reset();
    this.statuses.reset();
    this.fileTypes.reset();
    this.range.reset();
    this.isEmpty = false;
    this.dateFrom = '';
    this.dateTo = '';
  }

  deleteRow(row) {
    this.usersService.removeItem(String(row.idReport)).subscribe(() => {})
    this.starter()
  }

  normolizeUsers(users) {
    const newUsers = [];
    users.map(user => {
      const {outputDate, ...normalUser} = user;
      normalUser.outputDate = outputDate.date;
      newUsers.push(normalUser);
    });
    return newUsers;
  }

}



