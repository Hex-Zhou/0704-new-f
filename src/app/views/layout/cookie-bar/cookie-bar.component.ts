import { Component, OnInit, inject } from '@angular/core'
import {
    NgcCookieConsentService,
    NgcInitializeEvent,
    NgcStatusChangeEvent,
    NgcNoCookieLawEvent,
} from 'ngx-cookieconsent'
import { Subscription } from 'rxjs'
@Component({
    selector: 'app-cookie-bar',
    templateUrl: './cookie-bar.component.html',
    styleUrls: ['./cookie-bar.component.scss'],
})
export class CookieBarComponent implements OnInit {
    ccService = inject(NgcCookieConsentService)
    //keep refs to subscriptions to be able to unsubscribe later
    private popupOpenSubscription!: Subscription
    private popupCloseSubscription!: Subscription
    private initializeSubscription!: Subscription
    private statusChangeSubscription!: Subscription
    private revokeChoiceSubscription!: Subscription
    private noCookieLawSubscription!: Subscription
    constructor() {}
    ngOnInit() {
        // subscribe to cookieconsent observables to react to main events
        this.popupOpenSubscription = this.ccService.popupOpen$.subscribe(() => {
            // you can use this.ccService.getConfig() to do stuff...
        })
        this.popupCloseSubscription = this.ccService.popupClose$.subscribe(() => {
            // you can use this.ccService.getConfig() to do stuff...
        })
        this.initializeSubscription = this.ccService.initialize$.subscribe(
            (event: NgcInitializeEvent) => {
                // you can use this.ccService.getConfig() to do stuff...
            }
        )
        this.statusChangeSubscription = this.ccService.statusChange$.subscribe(
            (event: NgcStatusChangeEvent) => {
                // you can use this.ccService.getConfig() to do stuff...
            }
        )
        this.revokeChoiceSubscription = this.ccService.revokeChoice$.subscribe(() => {
            // you can use this.ccService.getConfig() to do stuff...
        })
        this.noCookieLawSubscription = this.ccService.noCookieLaw$.subscribe(
            (event: NgcNoCookieLawEvent) => {
                // you can use this.ccService.getConfig() to do stuff...
            }
        )
    }
    ngOnDestroy() {
        this.popupOpenSubscription.unsubscribe()
        this.popupCloseSubscription.unsubscribe()
        this.initializeSubscription.unsubscribe()
        this.statusChangeSubscription.unsubscribe()
        this.revokeChoiceSubscription.unsubscribe()
        this.noCookieLawSubscription.unsubscribe()
    }
}
