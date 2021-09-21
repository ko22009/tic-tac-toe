import styles from './home.module.scss'
import type {NextPage} from 'next'
import Board from "../components/Board";
import Panel from "../components/Panel";
import {useDispatch} from "react-redux";
import {loadWinGame} from "../store/reducers/game";

interface Props {
    winCross: number;
    winZero: number;
}

const Home: NextPage<Props> = (result) => {
    const dispatch = useDispatch();
    dispatch(loadWinGame(result))
    return (<div className={styles.table}>
            <Board/>
            <Panel/>
        </div>
    );
}

Home.getInitialProps = async (ctx) => {
    const res = await fetch('http://localhost:3000/api/game')
    const json = await res.json()
    return {winCross: json.winCross, winZero: json.winZero}
}

export default Home
