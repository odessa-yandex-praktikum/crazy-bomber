import * as React from 'react';
import {useEffect, useRef, useState} from 'react';
import './gameboard.css';
import {convertScoreToString, drawInitialStage} from '../../game/GameUtils';

export default function GameBoard() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    //setScore будет меняться во время игры
    const [score, setScore] = useState(0);

    useEffect(() => {
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                drawInitialStage(canvas, ctx);
            }
        }
    }, []);

    return (
        <div className="game-container__background">
            <canvas
                className="game-container__gameboard"
                ref={canvasRef}
                height={window.innerHeight}
                width={window.innerWidth}
            />
            <span className="game-container__gameboard_score">
                Score: {convertScoreToString(score)}
            </span>
        </div>
    );
}
