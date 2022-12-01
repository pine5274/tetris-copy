import { useState, useEffect } from "react";
import { createStage } from "../gameHelpers";

export const useStage = (player, resetPlayer) => {
    const [stage, setStage] = useState(createStage());
    const [rowsCleared, setRowsCleared] = useState(0);

    useEffect(() => {
        setRowsCleared(0);
        const sweepRows = (newStage) => {
            newStage.reduce((ack, row) => {
                if (row.findIndex((cell) => {cell[0]=== 0}) === -1) {
                    setRowsCleared(prev => prev + 1);
                    ack.unshift(new Array(newStage[0].length).fill([0, 'clear']));
                    return ack;
                }
                ack.push(row);
                return ack;
            }, []);
        }

        const updateStage = (prevStage) => {
            const newStage = prevStage.map((row) => {
                row.map(cell => (cell[1] === 'clear' ? [0, 'clear'] : cell))
            });

            player.tetromino.foreEach((row, y) => {
                row.foreEach((value, x) => {
                    if (value !== 0) {
                        newStage[y + player.pos.y][x + player.pos.x] = [
                            value,
                            `${player.collied ? 'merged' : 'clear'}`,
                        ];
                    }
                });
            });

            if (player.collied) {
                resetPlayer();
                return sweepRows(newStage);
            }

            return newStage;
        }

        setStage(prev => updateStage(prev));
    }, [
        player.collied,
        player.pos.x,
        player.pos.y,
        player.tetromino,
        resetPlayer,
    ]);

    return [stage, setStage, rowsCleared];
};