import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "./index";

const initialState = {
    active: false,
    disable: true,
};

const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        startGame: (state) => ({
            ...state,
            active: true,
            disable: false
        }),
        stopGame: (state) => ({
            ...state,
            active: false,
            disable: true
        }),
        nextTurnGame: (state) => ({
            ...state,
            disable: false
        }),
        turnGame: (state) => ({
            ...state
        }),
        disableGame: (state) => ({
            ...state,
            disable: true
        })
    }
});

export const getActiveGame = (state: RootState) => state.game.active;

export const {
    startGame,
    stopGame,
    disableGame,
    nextTurnGame,
    turnGame
} = gameSlice.actions;
export const game = gameSlice.reducer;
