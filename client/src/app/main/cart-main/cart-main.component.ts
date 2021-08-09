import { Component, OnInit, ViewChild } from '@angular/core';
import { Card } from './../../interfaces/card.interface';
import { CartService } from '../../services/cart.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MaterializeService } from 'src/app/classes/materialize.service';

@Component({
  selector: 'app-cart-main',
  templateUrl: './cart-main.component.html',
  styleUrls: ['./cart-main.component.scss']
})
export class CartMainComponent implements OnInit {


  displayedColumns: string[] = ['item', 'img', 'cost', 'quantity', 'totalCost', 'delete'];

  dataSource: MatTableDataSource<Card[]>;

  @ViewChild(MatSort) sort: MatSort; 

  productId: any;
  cardsByIds: Card[];
  idsAndCounts: any;
  uniqIds: any;
  discount: number;

  constructor(private cartService: CartService) { 
    const discount = localStorage.getItem('discount')
    discount ? this.discount = +discount : this.discount = 0;
  }

  ngOnInit() {

    if (this.getAllIds()) {
      this.getCountOfEqual(this.splitToArray(this.getAllIds()));
      this.fetchAllProductsById(this.getAllIds());
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  } 

  getTotalCost() {
    if (this.cardsByIds) {
      return this.cardsByIds.reduce(((acc, value) => acc + (value.oldPrice - (value.oldPrice/100*this.discount))), 0)
    }
    
  }

  deleteItem(id) {
    let prodsInCart = localStorage.getItem('prodsInCart');
    const filtered = this.idsAndCounts.filter(item => item.id === id);
    prodsInCart = String(+prodsInCart - filtered[0].count);
    
    this.idsAndCounts = this.idsAndCounts.filter(item => item.id !== id);
    const idx = this.cardsByIds.findIndex(item => item.id === id);
    this.cardsByIds.splice(idx, 1);
    let productId = localStorage.getItem('productId');
    
    const arrFromIds = this.splitToArray(productId);
    const newIdsArray = arrFromIds.filter(item => item != id);
    let idForLocalStorage = newIdsArray[0];
    for (let i = 1; i < newIdsArray.length; i++) {
      idForLocalStorage += ':' + newIdsArray[i];
    }
    if (idForLocalStorage) {
      localStorage.setItem('productId', idForLocalStorage);
    } else {
      localStorage.setItem('productId', '');
    }
    if (prodsInCart) {
      localStorage.setItem('prodsInCart', String(prodsInCart));
    } else {
      localStorage.setItem('prodsInCart', '0');
    }
    
    
    if (idForLocalStorage) {
      this.fetchAllProductsById(idForLocalStorage);
    } else {
      this.cardsByIds = [];
      localStorage.setItem('prodsInCart', '0');
      this.cartService.setProductCount(0);
    }
    MaterializeService.toast('Товар успешно удален!')
  }

  getCount(id) {
    const findId = this.idsAndCounts.find(item => item.id == id);
    if (findId) {
      return findId.count;
    }
  }

  fetchProductsById(id) {
    this.cartService.fetchProductsById(id).subscribe(products => {
      console.log(products)
    });
  }

  getAllIds() {
    return localStorage.getItem('productId');
  }

  splitToArray(string) {
    return string.split(':');
  }

  getCountOfEqual(arr) {
    const uniqueIds = [];
    const setArr = [];
    const setIds = [...(new Set(arr))]
    for (let i = 0; i < arr.length; i++) {
      const unique = arr.filter(element => element === arr[i]);
      uniqueIds.push(unique);
    }
    for (let i = 0; i < setIds.length; i++){
      setArr.push(uniqueIds.find(item => item[0] === setIds[i]))
    }
    uniqueIds.length = 0;
    setArr.map(item => {
      const obj = {
        id: +item[0],
        count: +item.length
      };
      uniqueIds.push(obj);
    });
    this.idsAndCounts = uniqueIds;
    this.uniqIds = setIds;
  }

  fetchAllProductsById(ids) {
    if (ids) {
      this.cartService.fetchAllProductsById(ids).subscribe(products => {
        this.cardsByIds = products;
      });
    }
  }

}
