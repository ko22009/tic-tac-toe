import styles from './Board.module.scss';
import React from "react";
import Field from "../Field";
import {useSelector} from "react-redux";
import {getTableGame, SIZE} from "../../store/reducers/game";

const Board: React.FC = () => {
    const table = useSelector(getTableGame);
    return (
        <div className={styles.board} style={{gridTemplateColumns: `repeat(${SIZE}, 1fr)`}}>
            {Object.keys(table).map((index) => <Field className={styles.board__row} index={index} key={index} value={table[index]}/>)}
        </div>
    );
}

export default Board