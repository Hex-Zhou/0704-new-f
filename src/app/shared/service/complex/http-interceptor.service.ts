import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpResponse,
    HttpErrorResponse,
} from '@angular/common/http'
import { Injectable, inject } from '@angular/core'
import { Subject, Observable, tap, throttleTime } from 'rxjs'
import { AuthService } from './auth.service'

const ExceptionPath = ['login', 'members/auth', 'members-signup']
@Injectable({
    providedIn: 'root',
})
export class HttpInterceptorService {
    private auth = inject(AuthService)
    expired$ = new Subject()
    constructor() {}
    //
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authorization = 'Bearer ' + this.auth.getData.AccessToken()
        let reqUrl = req.url
        // 改為使用guest api
        if (!this.auth.getData.isLoggedIn() && !this.isExceptionPath(ExceptionPath, req.url)) {
            const GUEST = 'guest'
            reqUrl = req.url.replace('api/v1', 'api/v1/guest')
            authorization = `Basic ${Buffer.from(`${GUEST}:${GUEST}`, 'utf8').toString('base64')}`
        }
        const authReq = req.clone({ url: reqUrl, setHeaders: { Authorization: authorization } })
        return next.handle(authReq).pipe(
            tap((event: any) => {
                if (event instanceof HttpResponse) {
                    console.log({ url: event.url })
                }
                if (
                    event instanceof HttpErrorResponse &&
                    event.status === 401 &&
                    event.error.msg == '驗證Token失敗'
                ) {
                    this.expired$.next('expired')
                }
            })
        )
    }
    //
    isExceptionPath(path: Array<string>, url: string) {
        return path.some((e) => url.includes(e))
    }
    subscribeTokenExpired() {
        this.expired$.pipe(throttleTime(1000)).subscribe(() => this.auth.onTokenExpired())
    }
}
