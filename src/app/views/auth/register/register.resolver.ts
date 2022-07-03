import { map } from 'rxjs/operators'
import { CompanyTypeService } from '../../../shared/service/API/company_type.service'
import { CompanyType } from './../../../shared/interface/company_type.interface'
import { Injectable, inject } from '@angular/core'
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router'
import { Observable, of } from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class RegisterResolver implements Resolve<CompanyType[]> {
    companyTypeService = inject(CompanyTypeService)
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CompanyType[]> {
        return this.companyTypeService.getReadAllSubject$()
    }
}
