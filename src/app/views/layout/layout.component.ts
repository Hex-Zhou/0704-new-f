import {
    AfterViewInit,
    Component,
    ElementRef,
    HostListener,
    inject,
    OnInit,
    Renderer2,
    ViewChild,
} from '@angular/core'

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit, AfterViewInit {
    //
    rerender = inject(Renderer2)
    SmartBar_boo: boolean = true // is SmartBar Close ?
    //
    @ViewChild('smartBar') smartBar!: any
    @ViewChild('header') header!: ElementRef
    @HostListener('window:scroll', ['$event']) onScroll() {
        this._renderHeaderMarginTop()
    }
    //
    constructor() {}
    ngAfterViewInit(): void {
        this._renderHeaderMarginTop()
    }
    ngOnInit(): void {}

    closeSmartBar() {
        this._renderHeaderMarginTop('0')
        this.SmartBar_boo = false
    }
    _renderHeaderMarginTop(px?: string) {
        if (!this.SmartBar_boo) return
        if (!px) {
            px = this.smartBar.bar.nativeElement.clientHeight
        }
        this.rerender.setStyle(this.header.nativeElement, 'margin-top', px + 'px')
    }
}
