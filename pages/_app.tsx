import '../styles/globals.css'
import type {AppProps} from 'next/app'
import React from 'react'
import {createAppStore} from "../store";
import {Provider} from "react-redux";

function MyApp({Component, pageProps}: AppProps) {
    return <Provider store={createAppStore()}>
        <Component {...pageProps} />
    </Provider>
}

export default MyApp
