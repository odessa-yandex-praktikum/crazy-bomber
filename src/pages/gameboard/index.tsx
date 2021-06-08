import * as React from 'react';
import {useEffect, useRef, useState} from 'react';
import './gameboard.css';
import {useHistory} from 'react-router';
import {drawInitialStage} from '../../game/GameUtils';
import {convertScoreToString} from '../../utils/Utils';
import {EFullScreenPosition, FullScreen} from '../../components/full-screen';

export default function Gameboard() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    //setScore будет меняться во время игры
    const [score, setScore] = useState(0);
    const history = useHistory();

    useEffect(() => {
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                drawInitialStage(canvas, ctx);
                //тестовый вариант завершения игры при нажатии Enter
                //TODO: при разработки механики игры описать условия завершения
                document.addEventListener('keypress', function (e) {
                    if (e.key === 'Enter') {
                        setScore(125);
                        history.push('/gameover');
                    }
                });
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
            <FullScreen position={EFullScreenPosition.RIGHT_BOTTOM} />
        </div>
    );
}
