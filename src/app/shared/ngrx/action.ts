import { Instruction } from './../interface/instructions.interface'
import { createAction, props } from '@ngrx/store'

export const GET_Instruction = createAction('[Product API] Loading')
export const SET_Instruction = createAction(
    '[Product API] Success',
    props<{ payload: Instruction[] }>()
)
