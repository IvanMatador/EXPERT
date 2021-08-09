import { MaterializeService } from './../../classes/materialize.service';
import { AfterContentInit, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as M from 'materialize-css/dist/js/materialize';


@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit, AfterViewInit, AfterContentInit {

  @ViewChild('carousel') carousel: ElementRef;

  constructor() { }

  ngOnInit(): void {
   setTimeout(()=>MaterializeService.toast('Не пропустите свою персональную скидку на Tesla'), 5000);
  }

  ngAfterViewInit(): void {
    
    this.caouruselSet(500, 4000);
  }
   
  ngAfterContentInit(): void {

  }

  caouruselSet(duration, timeToChange) {
    let elems = document.querySelectorAll('.carousel');
    let instances = M.Carousel.init(elems, {
      duration: duration,
      fullWidth: true,
      indicators: true
    });
    let elem = document.querySelector('.carousel');
    let instance = M.Carousel.getInstance(elem);
    setInterval(() => {instance.next()}, timeToChange);
  }

  caouruselBtnClick() {
    let elems = document.querySelector('.modal');
    let instances = M.Modal.init(elems, {
      duration: 500
    });
  }

  click() {
    this.caouruselBtnClick()
  }

}
