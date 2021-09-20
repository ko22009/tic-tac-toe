import type {NextPage} from 'next'
import {useDispatch} from "react-redux";
import {nextTurnGame} from '../store/reducers/game';

const Home: NextPage = () => {
    const dispatch = useDispatch();
    return (<>
            <button onClick={() =>
                dispatch(nextTurnGame())}>next turn
            </button>
        </>
    );
}

export default Home
