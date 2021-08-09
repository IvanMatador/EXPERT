import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ChangeColorService } from 'src/app/services/change-color.service';
import { DiscountService } from 'src/app/services/discount.service';

@Injectable()
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {

  discounts: any = [
    {value: '0', viewValue: '0%'},
    {value: '5', viewValue: '5%'},
    {value: '10', viewValue: '10%'},
    {value: '15', viewValue: '15%'}
  ];

  colors: any = [
    {value: 'rgb(255, 255, 255)', viewValue: 'Белый'},
    {value: 'rgb(236, 236, 236)', viewValue: 'Серый'},
    {value: 'rgba(54, 106, 218, 0.151)', viewValue: 'Голубой'},
    {value: 'rgba(0, 255, 255, 0.3)', viewValue: 'Аква'}
  ];

  constructor(private changeColorService: ChangeColorService,
              private discountService: DiscountService) { }

  ngOnInit(): void {
    
  }

  addValue(value) {
    if (value.includes('rgb')) {
      this.changeColorService.updateColorFn(value);
    } else {
      this.discountService.setDiscount(value);
      localStorage.setItem('discount', value)
    }
    
  }

}
