import { Carousels } from './../../../shared/interface/carousel.interface'
import { Component, inject, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y])
@Component({
    selector: 'app-carousels-area',
    templateUrl: './carousels-area.component.html',
    styleUrls: ['./carousels-area.component.scss'],
})
export class CarouselsAreaComponent implements OnInit {
    carousels: Carousels[] = []
    numbers = [1, 2, 3, 4, 5]
    constructor() {
        inject(ActivatedRoute).data.subscribe((e) => {
            this.carousels = e['carousel'].data
        })
    }
    ngOnInit(): void {}
}
