import { RWD_breakpoint_config } from './../../../shared/config/rwd.config'
import { Component, HostBinding, HostListener, inject, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { SubscriptionPlan } from './../../../shared/interface/subscription_plan'
import SwiperCore, { SwiperOptions } from 'swiper'
@Component({
    selector: 'app-card-row-area',
    templateUrl: './card-row-area.component.html',
    styleUrls: ['./card-row-area.component.scss'],
})
export class CardRowAreaComponent implements OnInit {
    card_display_number = 3
    @HostListener('window:resize') onResize() {
        this.card_display_number = window.outerWidth > RWD_breakpoint_config.xl ? 3 : 1
    }
    plans: SubscriptionPlan[] = []
    constructor() {
        inject(ActivatedRoute).data.subscribe((e) => {
            this.plans = e['plan'].data
            this.plans = this.plans.filter((e) => e.status === 1)
        })
    }
    ngOnInit(): void {}

    _hasNumberInArray(str: string, num: number): boolean {
        return str.includes(String(num))
    }
}
