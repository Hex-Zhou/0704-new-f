import { inject, Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router'
import { map, Observable, tap } from 'rxjs'
import { Carousels } from './../../../shared/interface/carousel.interface'
import { CarouselsService } from './../../../shared/service/API/carousels.service'

@Injectable({
    providedIn: 'root',
})
export class CarouselsAreaResolver implements Resolve<Carousels[]> {
    carouselsService = inject(CarouselsService)
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Carousels[]> {
        return this.carouselsService.getReadAllSubject$()
    }
}
