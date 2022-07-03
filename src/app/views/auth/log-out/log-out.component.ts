import { Component, OnInit, inject } from '@angular/core'
import { AuthService } from 'app/shared/service/complex/auth.service'

@Component({
    selector: 'app-log-out',
    templateUrl: './log-out.component.html',
    styleUrls: ['./log-out.component.scss'],
})
export class LogOutComponent implements OnInit {
    auth = inject(AuthService)
    constructor() {}

    ngOnInit(): void {
        this.auth.logOut()
    }
}
