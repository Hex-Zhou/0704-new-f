import { debounceTime, switchMap, withLatestFrom, filter, map, mergeMap } from 'rxjs'
import { getIns, rootActions } from './index'
import { InstructionsService } from './../service/API/instructions.service'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { select, Store } from '@ngrx/store'
import * as Root from './index'
import { Instruction } from '@interface/instructions.interface'
import { Injectable } from '@angular/core'
@Injectable()
export class EffectsClass {
    constructor(
        private store: Store<any>,
        private actions$: Actions,
        private instructServ: InstructionsService
    ) {}
    getInstructions = createEffect(() =>
        this.actions$.pipe(
            ofType(rootActions.GET_Instruction),
            withLatestFrom(this.store.pipe(select(Root.getIns))),
            filter(([, state]) => !state.loaded),
            debounceTime(500),
            switchMap(() =>
                this.instructServ.read.all().pipe(
                    map((instruction) => {
                        let data = instruction.data
                        return rootActions.SET_Instruction({ payload: data })
                    })
                )
            )
        )
    )
}
