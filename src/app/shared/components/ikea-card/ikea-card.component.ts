import { Component, HostBinding, Input, OnInit } from '@angular/core'

@Component({
    selector: 'app-ikea-card',
    templateUrl: './ikea-card.component.html',
    styleUrls: ['./ikea-card.component.scss'],
})
export class IkeaCardComponent implements OnInit {
    @Input() hostClass: string = ''
    constructor() {}

    ngOnInit(): void {}
}
