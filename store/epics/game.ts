import {delay, filter, mapTo, Observable, tap} from "rxjs";
import {disableGame, nextTurnGame, turnGame} from '../reducers/game'
import {Action} from '@reduxjs/toolkit'
import {StateObservable} from "redux-observable";
import {RootState} from "../reducers";

export const nextTurnEpic = (
    action$: Observable<Action>,
) => action$.pipe(filter(nextTurnGame.match), mapTo(disableGame()));

export const disableEpic = (
    action$: Observable<Action>,
    state$: StateObservable<RootState>
) => action$.pipe(filter(disableGame.match), delay(1500), tap(() => console.log(state$.value.game)), mapTo(turnGame()));

const game = [nextTurnEpic, disableEpic];
export default game;
