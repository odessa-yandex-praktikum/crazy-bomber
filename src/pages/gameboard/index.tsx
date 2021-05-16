import * as React from 'react';
import {useEffect, useRef, useState} from 'react';
import './gameboard.css';
import {drawInitialStage} from '../../game/GameUtils';
import {convertScoreToString} from '../../utils/Utils';

export default function Gameboard() {
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
            <span className="game-container__gameboard-score">
                Score: {convertScoreToString(score)}
            </span>
        </div>
    );
}
