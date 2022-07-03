import { Component, Input, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'

@Component({
    selector: 'app-auth-form-group',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="form-group mt-3 row">
            <div class="col-auto min-w-100px fajc">
                <label class="control-label">{{ name }}</label>
            </div>
            <div class="col">
                <ng-content></ng-content>
            </div>
        </div>
    `,
    styles: [],
})
export class AuthFormGroupComponent implements OnInit {
    @Input() name: string = ''
    constructor() {}

    ngOnInit(): void {}
}
