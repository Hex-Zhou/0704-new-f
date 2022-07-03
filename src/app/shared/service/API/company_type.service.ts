import { APIService } from './api.service'
import { Injectable } from '@angular/core'
import { environment } from 'environments/environment'

@Injectable({
    providedIn: 'root',
})
export class CompanyTypeService extends APIService {
    protected override baseUrl = `${environment.apiURL}/api/v1/company-type`
}
