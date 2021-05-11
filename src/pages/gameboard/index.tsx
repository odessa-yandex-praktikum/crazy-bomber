import * as React from 'react';
import {useEffect, useRef, useState} from 'react';
import {Bomber, Building, Coordinate} from '../../game/Models';
import {BUILDING} from '../../consts';
import './gameboard.css';

export function GameBoard() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    //setScore should be change during the game
    const [score, setScore] = useState('0000000');

    useEffect(() => {
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                drawInitialStage(canvas, ctx);
            }
        }
    }, []);

    function drawInitialStage(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        const initialBomberCoordinate = new Coordinate(50, 50);
        const bomber = new Bomber(initialBomberCoordinate);
        const image = new Image();
        image.src = bomber.img;
        image.onload = function () {
            ctx.drawImage(image, bomber.coordinate.x, bomber.coordinate.y);
        };
        drawBuilding(canvas.width / 20, canvas.height / 1.4, BUILDING.APARTMENT_HOUSE_1, ctx);
        drawBuilding(canvas.width / 12, canvas.height / 1.27, BUILDING.PLANT, ctx);
        drawBuilding(canvas.width / 4, canvas.height / 1.4, BUILDING.PUBLISHING_HOUSE, ctx);
        drawBuilding(canvas.width / 3.1, canvas.height / 1.22, BUILDING.SCHOOL, ctx);
        drawBuilding(canvas.width / 2.5, canvas.height / 2, BUILDING.MEDIUM_SKYSCRAPER, ctx);
        drawBuilding(canvas.width / 2.2, canvas.height / 1.57, BUILDING.APARTMENT_HOUSE_2, ctx);
        drawBuilding(canvas.width / 2, canvas.height / 1.4, BUILDING.PUBLISHING_HOUSE, ctx);
        drawBuilding(canvas.width / 1.55, canvas.height / 2.05, BUILDING.HIGH_SKYSCRAPER, ctx);
        drawBuilding(canvas.width / 1.47, canvas.height / 1.5, BUILDING.LOW_SKYSCRAPER, ctx);
        drawBuilding(canvas.width / 1.2, canvas.height / 1.2, BUILDING.SCHOOL, ctx);
    }

    function drawBuilding(x: number, y: number, type: BUILDING, ctx: CanvasRenderingContext2D) {
        const initialCoordinate = new Coordinate(x, y);
        const building = new Building(initialCoordinate, type);
        const image = new Image();
        image.src = building.img;
        image.onload = function () {
            ctx.drawImage(image, x, y);
        };
    }

    return (
        <div className="backgroundImg">
            <canvas ref={canvasRef} height={window.innerHeight} width={window.innerWidth} />
            <span className="gameScore">Score: {score}</span>
        </div>
    );
}
