import React from "react";
import { StyledCell } from "./styles/StyledCell"
import { TETROMINOS } from "../tetorisminos";

const Cell = ({ type }) => (
    <StyledCell type={type} color={TETROMINOS[type].color}>
        {console.log('render cell')}
    </StyledCell>
);

export default React.memo(Cell);