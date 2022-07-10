import { SET_Instruction } from './../action'
import { Instruction } from './../../interface/instructions.interface'
import { createReducer, on } from '@ngrx/store'

export interface instructionState {
    source: Instruction[]
    loaded: boolean
}

export const initialState: instructionState = {
    source: [],
    loaded: false,
}

export const instructionReducer = createReducer(
    initialState,
    on(SET_Instruction, (state, { payload }) => ({
        ...state,
        source: payload,
        loaded: true,
    }))
)
