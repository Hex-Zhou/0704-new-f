import { Injectable } from '@angular/core'
import { ApiResponse } from '@interface/core.interface'
import { Member } from '@interface/member.interface'
import { environment } from 'environments/environment'
import { Observable } from 'rxjs'
import { APIService } from './api.service'

type ConfirmStatus = 'CheckEmail' | 'SendEmail' | 'CheckPhone' | 'SendPhone'
@Injectable({
    providedIn: 'root',
})
export class MemberService extends APIService {
    protected override baseUrl = `${environment.apiURL}/api/v1/members`
    //
    postConfirms = {
        CheckEmail: (body: any) =>
            this.http.post<ApiResponse>(`${this.baseUrl}-check-email-verified-code`, body),
        SendEmail: (body: any) =>
            this.http.post<ApiResponse>(`${this.baseUrl}-send-email-verified-code`, body),
        CheckPhone: (body: any) =>
            this.http.post<ApiResponse>(`${this.baseUrl}-check-phone-verified-code`, body),
        SendPhone: (body: any) =>
            this.http.post<ApiResponse>(`${this.baseUrl}-send-phone-verified-code`, body),
    }
    //
    forgot(body: any): Observable<ApiResponse> {
        return this.http.put<ApiResponse>(
            `${environment.apiURL}/api/v1/member-password-reset-email`,
            body
        )
    }
    public override create(body: Partial<Member>): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${this.baseUrl}-signup`, body)
    }
}
