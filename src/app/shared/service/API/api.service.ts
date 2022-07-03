import { HttpClient } from '@angular/common/http'
import { Injectable, inject } from '@angular/core'
import { ApiResponse } from '@interface/core.interface'
import { environment } from 'environments/environment'
import { BehaviorSubject, Observable, filter } from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class APIService {
    protected baseUrl = `${environment.apiURL}/api/v1/`
    protected http = inject(HttpClient)
    protected ReadAllSubject$: BehaviorSubject<any> = new BehaviorSubject<any>(null)
    protected isReadAllSubject$Start: boolean = false
    constructor() {}
    public read = {
        all: () => this.http.get<ApiResponse>(`${this.baseUrl}`),
        ByID: (ID: number) => this.http.get<ApiResponse>(`${this.baseUrl}/${ID}`),
    }
    public create(body: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${this.baseUrl}`, body)
    }
    public update(body: any): Observable<ApiResponse> {
        return this.http.put<ApiResponse>(`${this.baseUrl}/${body.id}`, body)
    }
    public delete(id: number): Observable<ApiResponse> {
        return this.http.delete<ApiResponse>(`${this.baseUrl}/${id}`)
    }
    public getReadAllSubject$() {
        if (!this.isReadAllSubject$Start) {
            this.read.all().subscribe((r) => this.ReadAllSubject$.next(r))
        }
        this.isReadAllSubject$Start = true
        return this.ReadAllSubject$.asObservable().pipe(filter((e) => e !== null))
    }
}
