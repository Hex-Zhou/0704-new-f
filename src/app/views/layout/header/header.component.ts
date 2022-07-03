import { Member } from 'app/shared/interface/member.interface'

import { Component, OnInit, inject, OnDestroy } from '@angular/core'
import { Observable } from 'rxjs'
import { AuthService } from 'app/shared/service/complex/auth.service'

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
    member$: Observable<Member>
    auth = inject(AuthService)
    constructor() {
        this.member$ = this.auth.getData.Member()
    }
    ngOnDestroy(): void {}

    ngOnInit(): void {}
}
