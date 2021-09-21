import {useDispatch, useSelector} from "react-redux";
import {getCrossWinGame, getZeroWinGame, startGame} from "../../store/reducers/game";
import React from "react";

const Panel: React.FC = () => {
    const dispatch = useDispatch();
    const winCross = useSelector(getCrossWinGame);
    const winZero = useSelector(getZeroWinGame);
    return <div>
        <button onClick={() => dispatch(startGame())}>New game</button>
        <div>Кол-во побед крестиков: {winCross}</div>
        <div>Кол-во побед ноликов: {winZero}</div>
    </div>
}

export default Panel;