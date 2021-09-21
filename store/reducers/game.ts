import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "./index";

export const SIZE = 3;

export enum MoveType {
    none = '',
    cross = 'Х',
    zero = 'О'
}

export type RecordTable = {
    [key: string]: MoveType
}

type initialType = {
    disable: boolean;
    active: boolean;
    table: RecordTable;
    winZero: number;
    winCross: number;
};

export type Move = { id: string, type: MoveType };

function generateTable(size: number): RecordTable {
    let result: Record<number, MoveType> = {};
    for (let i = 0; i < size * size; i++) {
        result[i] = MoveType.none;
    }
    return result;
}

const initialState: initialType = {
    disable: false,
    table: generateTable(SIZE),
    active: true,
    winZero: 0,
    winCross: 0
};

const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        startGame: (state) => ({
            ...state,
            table: generateTable(SIZE),
            active: true,
            disable: false,
        }),
        moveGame: (state, action: PayloadAction<Move>) => ({
            ...state,
            table: {...state.table, [action.payload.id]: action.payload.type},
            disable: !state.disable
        }),
        stopGame: (state) => ({
            ...state,
            active: false
        }),
        disableGame: (state, action) => ({
            ...state,
            disable: action.payload
        }),
        nextTurnGame: (state) => ({
            ...state,
        }),
        winCrossGame: (state) => ({
            ...state,
            winCross: state.winCross + 1,
            active: false
        }),
        winZeroGame: (state) => ({
            ...state,
            winZero: state.winZero + 1,
            active: false
        }),
        successSendGame: (state) => ({
            ...state
        }),
        successLoadGame: (state) => ({
            ...state
        }),
        loadWinGame: (state, action) => ({
            ...state,
            winCross: action.payload.winCross,
            winZero: action.payload.winZero,
        })
    }
});

export const getTableGame = (state: RootState) => state.game.table;
export const getDisableGame = (state: RootState) => state.game.disable;
export const getActiveGame = (state: RootState) => state.game.active;
export const getCrossWinGame = (state: RootState) => state.game.winCross;
export const getZeroWinGame = (state: RootState) => state.game.winZero;

export const {
    startGame,
    stopGame,
    moveGame,
    nextTurnGame,
    disableGame,
    winCrossGame,
    winZeroGame,
    successSendGame,
    successLoadGame,
    loadWinGame
} = gameSlice.actions;
export const game = gameSlice.reducer;
