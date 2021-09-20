import {configureStore} from "@reduxjs/toolkit";
import {createEpicMiddleware} from 'redux-observable'
import {rootEpic} from "./epics";
import {reducers} from "./reducers";

export const createAppStore = () => {
    const epicMiddleware = createEpicMiddleware()
    const store = configureStore({
        reducer: reducers,
        middleware: [epicMiddleware],
    });
    epicMiddleware.run(rootEpic)
    return store
}
