import {combineReducers} from "@reduxjs/toolkit";
import {game} from './game'

export const reducers = combineReducers({
    game,
})

export type RootState = ReturnType<typeof reducers>;
