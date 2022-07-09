import { Injectable } from '@angular/core'
import { environment } from 'environments/environment'
import { APIService } from './api.service'

@Injectable({
    providedIn: 'root',
})
export class InstructionsService extends APIService {
    protected override baseUrl = `${environment.apiURL}/api/v1/instructions
  `
}
