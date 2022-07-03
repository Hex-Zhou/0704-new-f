import { trigger, transition, style, animate } from '@angular/animations'
import {
    AfterViewInit,
    Component,
    ElementRef,
    HostListener,
    inject,
    OnInit,
    Output,
    Renderer2,
    ViewChild,
} from '@angular/core'
import { EventEmitter } from '@angular/core'

@Component({
    selector: 'app-smart-bar',
    templateUrl: './smart-bar.component.html',
    styleUrls: ['./smart-bar.component.scss'],
    animations: [
        trigger('enterAnimation', [
            transition(':enter', [
                style({ height: '0px', opacity: 0, padding: 0 }),
                animate('800ms', style({ height: '*', opacity: 1, padding: '1em' })),
            ]),
        ]),
    ],
})
export class SmartBarComponent implements OnInit {
    //
    @Output() onX = new EventEmitter()
    //
    @ViewChild('bar') bar: ElementRef | undefined // Don't remove,Parent element need this variable.

    constructor() {}

    ngOnInit(): void {}
    clickX() {
        this.onX.emit('true')
    }
}
