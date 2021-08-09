import { CartService } from './../../services/cart.service';
import { DiscountService } from './../../services/discount.service';
import { Card } from './../../interfaces/card.interface';
import { Component, OnInit } from '@angular/core';
import { CatalogService } from 'src/app/services/catalog.srvice';
import { MaterializeService } from 'src/app/classes/materialize.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {

  cards: Card[] = [];
  filteredCards: Card[] = [];
  discount: number = 0;

  constructor(private catalogService: CatalogService,
              private discountService: DiscountService,
              private cartService: CartService) { }

  ngOnInit() {
    this.fetchAllCards();
    this.discountService.discount$.subscribe(discount => {
      if (discount) {
        localStorage.removeItem('discount');
        this.discount = discount;
        localStorage.setItem('discount', discount);
      } else if (localStorage.getItem('discount')) {
        this.discount = +localStorage.getItem('discount');
      } else {
        this.discount = 0;
      }
    });
    this.filteredCards = this.cards;
  }

  fetchAllCards() {
    this.catalogService.fetchAllCards().subscribe(cards => {
      this.cards = cards;
      this.filteredCards = cards;
    });
  }

  addToCart(id) {
    this.cartService.setProductToCart(id);
    if (localStorage.getItem('productId')) {
      let allIds = localStorage.getItem('productId');
      allIds += ':' + id;
      localStorage.setItem("productId", allIds);
    } else {
      localStorage.setItem("productId", id);
    };
    MaterializeService.toast('Товар успешно добавлен в корзину!');
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.filteredCards = this.cards.filter(item => item.title.includes(filterValue))
  }
}
