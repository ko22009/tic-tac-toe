import styles from './Field.module.scss';
import React from "react";
import {getActiveGame, getDisableGame, moveGame, MoveType} from "../../store/reducers/game";
import cn from 'classnames';
import {useDispatch, useSelector} from "react-redux";

type Props = {
    value: MoveType,
    className: string,
    index: string
};

const Field: React.FC<Props> = ({value, className, index}) => {
    const dispatch = useDispatch();
    const disable = useSelector(getDisableGame);
    const active = useSelector(getActiveGame);
    const payload = {id: index, type: MoveType.cross}
    return (<div onClick={() => value === MoveType.none && !disable && active && dispatch(moveGame(payload))} className={cn(styles.field, className)}>
            <div className={cn(styles.field__content, value === MoveType.none && !disable && active && styles.field_enabled)}>{value}</div>
        </div>
    );
}

export default Field