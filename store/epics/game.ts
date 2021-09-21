import {filter, map, mergeMap, Observable} from "rxjs";
import {ajax} from 'rxjs/ajax';
import {
    disableGame,
    Move,
    moveGame,
    MoveType,
    nextTurnGame,
    SIZE,
    stopGame, successLoadGame, successSendGame,
    winCrossGame,
    winZeroGame
} from '../reducers/game'
import {Action} from '@reduxjs/toolkit'
import {StateObservable} from "redux-observable";
import {RootState} from "../reducers";
import _ from "lodash";

function find(el: MoveType[]) {
    let countDiagLeft = 0;
    let countDiagRight = 0;
    for (let i = 0; i < SIZE; i++) {
        let countHorizontal = 0;
        let countVertical = 0;
        for (let j = 0; j < SIZE; j++) {
            if (el[i * SIZE + j]) {
                countHorizontal++;
            }
            if (el[j * SIZE + i]) {
                countVertical++;
            }
            if (i === j && el[i + SIZE * j]) {
                countDiagLeft++;
            }
            if (j === SIZE - 1 - i && el[i * SIZE + j]) {
                countDiagRight++;
            }
        }
        if (countHorizontal === SIZE || countVertical === SIZE) {
            return true;
        }
    }
    return countDiagLeft === SIZE || countDiagRight === SIZE;
}

function sendResult({winZero, winCross}: ({ winZero: number, winCross: number })) {
    return ajax({
        url: '/api/game',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: {
            winZero: winZero,
            winCross: winCross,
        }
    }).pipe(
        map(() => successSendGame())
    )
}

export const winEpic = (
    action$: Observable<Action>,
    state$: StateObservable<RootState>
) => action$.pipe(filter(moveGame.match),
    map(() => {
        const onlyCross = _.map(state$.value.game.table, v => v !== MoveType.cross ? MoveType.none : MoveType.cross);
        const onlyZero = _.map(state$.value.game.table, v => v !== MoveType.zero ? MoveType.none : MoveType.zero);
        if (find(onlyCross)) {
            return winCrossGame();
        }
        if (find(onlyZero)) {
            return winZeroGame();
        }
        if (state$.value.game.disable) {
            return nextTurnGame();
        } else {
            return disableGame(false);
        }
    }),
);

export const sendResultCrossEpic = (
    action$: Observable<Action>,
    state$: StateObservable<RootState>
) => action$.pipe(filter(winCrossGame.match),
    mergeMap(action =>
        sendResult({
            winCross: state$.value.game.winCross,
            winZero: state$.value.game.winZero,
        })
    )
);
export const sendResultZeroEpic = (
    action$: Observable<Action>,
    state$: StateObservable<RootState>
) => action$.pipe(filter(winZeroGame.match),
    mergeMap(action =>
        sendResult({
            winCross: state$.value.game.winCross,
            winZero: state$.value.game.winZero,
        })
    )
);

export const autoMoveEpic = (
    action$: Observable<Action>,
    state$: StateObservable<RootState>
) => action$.pipe(filter(nextTurnGame.match),
    map(() => {
        const arr = _.shuffle(Object.keys(state$.value.game.table));
        let index = '-1';
        for (let i of arr) {
            if (state$.value.game.table[i] === MoveType.none) {
                index = i;
                break;
            }
        }
        if (index === '-1') return stopGame();
        const payload: Move = {id: index, type: MoveType.zero};
        return moveGame(payload)
    })
);

const game = [autoMoveEpic, winEpic, sendResultCrossEpic, sendResultZeroEpic];
export default game;

