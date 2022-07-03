import { inject, Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router'
import { Observable, of } from 'rxjs'
import { AuthService } from './shared/service/complex/auth.service'

@Injectable({
    providedIn: 'root',
})
export class AppResolver implements Resolve<any> {
    auth = inject(AuthService)
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        if (this.auth.getData.FileServerInfo()) {
            return of(true)
        }
        return this.auth.fetchFileServerInfo$()
    }
}
