import { createSelector, createFeatureSelector } from '@ngrx/store'
import * as actions from './action'
import { instructionReducer } from './reducer/instruction.reducer'
export const rootActions = {
    ...actions,
}
export interface State {
    source: any
    loaded: boolean
}
export const getIns = createSelector(createFeatureSelector<State>('instruction'), (state) => {
    return state
})

export const rootReducers = {
    instruction: instructionReducer,
}
