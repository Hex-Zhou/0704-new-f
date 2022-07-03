import { inject, Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router'
import { map, Observable } from 'rxjs'
import { SubscriptionPlan } from './../../../shared/interface/subscription_plan'
import { SubscriptionPlanService } from './../../../shared/service/API/subscription-plan.service'

@Injectable({
    providedIn: 'root',
})
export class CardRowAreaResolver implements Resolve<SubscriptionPlan[]> {
    subscriptionPlanService = inject(SubscriptionPlanService)
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<SubscriptionPlan[]> {
        return this.subscriptionPlanService.getReadAllSubject$()
    }
}
