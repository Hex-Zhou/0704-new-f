import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { AUTO_REFRESH_TOKEN, COOKIE_EXPIRY_DAY } from 'app/shared/config/core.config'
import { ApiResponse, Auth, FileServerInfo } from 'app/shared/interface/core.interface'
import { Member } from 'app/shared/interface/member.interface'
import { environment } from 'environments/environment'
import { CookieService } from 'ngx-cookie-service'
import { BehaviorSubject, concatMap, Observable } from 'rxjs'
import { debounceTime, map, tap } from 'rxjs/operators'
import { MemberService } from '../API/member.service'
//
const AUTH_DATA = 'web_auth_data'
const MEMBER_DATA = 'web_member_data'
const FILE_SERVER_INFO = 'file_server_info'
const LOGIN_REMEMBER = 'login_remember'
const LOGIN_ACCOUNT = 'login_account'
//
@Injectable({
    providedIn: 'root',
})
export class AuthService {
    //
    private authApi = `${environment.apiURL}/api/v1/members/auth`
    private fileApi = `${environment.apiURL}/api/v1/file-server-info`
    //
    private fileServerInfo?: FileServerInfo
    private authData: Auth | null
    private loginRemember = false
    private readonly memberSubject?: BehaviorSubject<Member | null> =
        new BehaviorSubject<Member | null>(null)
    //
    private memberService = inject(MemberService)
    private cookieService = inject(CookieService)
    private http = inject(HttpClient)
    //
    public getData = {
        Member: () => this.memberSubject!.asObservable() as Observable<Member>,
        MemberID: () => this.memberSubject!.value!.id,
        FileServerInfo: () => this.fileServerInfo as FileServerInfo,
        LoginRemember: () => localStorage.getItem(LOGIN_REMEMBER),
        AccessToken: () => this.authData?.token.access_token,
        isLoggedIn: () => this.authData !== null && this.authData !== undefined,
    }

    //
    constructor() {
        this.authData = this.getCookie(AUTH_DATA)
        this.memberSubject?.next(this.getCookie(MEMBER_DATA))
        this.fileServerInfo = this.getCookie(FILE_SERVER_INFO)
        this.loginRemember = Boolean(localStorage.getItem(LOGIN_REMEMBER))
    }
    loginAuth$(account: string, password: string) {
        const a$ = () => this.fetchLogIn$(account, password!)
        const b$ = () => this.fetchMemberAPI$()
        const c$ = () => this.fetchFileServerInfo$()
        return a$().pipe(concatMap(() => b$().pipe(concatMap(() => c$()))))
    }

    private fetchLogIn$(account: string, password: string) {
        return this.http.post<ApiResponse>(`${this.authApi}`, { account, password }).pipe(
            tap((r) => {
                this.authData = r.data
                this.setCookie(AUTH_DATA, r.data)
            }),
            map((r) => r.data)
        )
    }
    private fetchMemberAPI$() {
        return this.memberService.read.ByID(this.authData!.id).pipe(
            tap((r) => {
                this.memberSubject?.next(r.data)
                this.setCookie(MEMBER_DATA, r.data)
                localStorage.setItem(LOGIN_ACCOUNT, this.memberSubject!.value!.account)
            })
        )
    }
    fetchFileServerInfo$() {
        return this.http
            .get<ApiResponse>(`${this.fileApi}/1`)
            .pipe(
                tap((r) => {
                    this.fileServerInfo = r.data
                    this.setCookie(FILE_SERVER_INFO, r.data)
                })
            )
            .pipe(map(() => {}))
    }
    onTokenExpired() {
        const refresh_token = this.authData?.token.refresh_token
        if (!AUTO_REFRESH_TOKEN) {
            return this.logOut()
        }
        this.http
            .post<ApiResponse>(`${this.authApi}/refresh`, { refresh_token })
            .pipe(debounceTime(1000))
            .subscribe({
                next: (r) => {
                    this.authData!.token = r.data
                    this.setCookie(AUTH_DATA, this.authData)
                    location.reload()
                },
                error: () => {
                    this.logOut()
                },
            })
    }
    logOut() {
        this.cookieService.delete(AUTH_DATA, '/')
        this.cookieService.delete(MEMBER_DATA, '/')
        this.authData = null
        this.memberSubject?.next(null)
        // location.href = ''
    }
    //
    private getCookie(name: string) {
        if (this.cookieService.get(name)) {
            const data = this.cookieService.get(name)
            return JSON.parse(Buffer.from(data, 'base64').toString('utf8'))
        }
    }
    private setCookie(name: string, value: any) {
        const data = Buffer.from(JSON.stringify(value), 'utf8').toString('base64')
        this.cookieService.set(name, data, COOKIE_EXPIRY_DAY, '/')
    }
}
