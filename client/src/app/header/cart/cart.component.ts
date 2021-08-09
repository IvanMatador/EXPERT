import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  prodCount: number;
  productId: number;


  constructor(private cartService: CartService) {
    
  }

  ngOnInit(): void {
    
    this.cartService.product$.subscribe(product => {
      if (product) {
        this.prodCount += 1;
        localStorage.setItem('prodsInCart', String(this.prodCount))
      } else if (localStorage.getItem('prodsInCart')) {
        this.prodCount = +localStorage.getItem('prodsInCart');
      } else {
        this.prodCount = 0;
        localStorage.setItem('prodsInCart', String(this.prodCount));
      }
    });

    this.cartService.count$.subscribe(count => {
      this.prodCount = +count;
    })
  }
}
