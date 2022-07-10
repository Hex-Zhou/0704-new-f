import { getIns, rootActions } from './../../../shared/ngrx/index'
import { Component, OnInit } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { filter } from 'rxjs'

@Component({
    selector: 'app-billboard-area',
    templateUrl: './billboard-area.component.html',
    styleUrls: ['./billboard-area.component.scss'],
})
export class BillboardAreaComponent implements OnInit {
    constructor(private store: Store) {}

    ngOnInit(): void {
        this.getAPi()
    }
    getAPi() {
        this.store.dispatch(rootActions.GET_Instruction())
        this.store
            // .pipe(select(getIns))
            // .pipe(filter((state) => state.loaded))
            .subscribe((r) => {
                console.log(r)
            })
    }
}
