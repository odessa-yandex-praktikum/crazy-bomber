import * as React from 'react';
import {useEffect, useRef, useState} from 'react';
import './Game.css';
import {useHistory} from 'react-router';
import {useAnimationFrame} from '../../../hooks/use-animation-frame';
import {convertScoreToString, intersect, randomInteger} from '../../../utils/Utils';
import {GAME_CONFIG, SCENE_HEIGHT, SCENE_WIDTH} from '../config';
import {Bomber} from '../entities/Bomber';
import {Building} from '../entities/Building';
import {Bullet} from '../entities/Bullet';
import {EDirection} from '../enums';

export default function Game() {
    const [score, setScore] = useState<number>(0);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const contextRef = useRef<CanvasRenderingContext2D | null>(null);
    const bomberRef = useRef<Bomber>();
    const bulletsRef = useRef<Bullet[]>([]);
    const buildingsRef = useRef<Building[]>([]);
    const history = useHistory();

    /** Монтирование */
    useEffect(() => {
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');
            contextRef.current = context;

            if (context) {
                /** Инициализация города идет в заданных границах. */
                for (
                    let x = GAME_CONFIG.BUILDING.START_POINT;
                    x < GAME_CONFIG.BUILDING.END_POINT - GAME_CONFIG.BUILDING.WIDTH;
                    x += GAME_CONFIG.BUILDING.WIDTH + randomInteger(10, 100)
                ) {
                    buildingsRef.current.push(
                        new Building({
                            context,
                            x,
                            floors: randomInteger(2, 15),
                        })
                    );
                }

                /** Инициализация самолета и обработчик создания снарядов. */
                bomberRef.current = new Bomber(context);

                const handleBulletCreate = (e: KeyboardEvent) => {
                    if (e.code === 'Space') {
                        bomberRef.current &&
                            bulletsRef.current?.push(
                                new Bullet({
                                    context,
                                    x: bomberRef.current?.getCordCenter().x,
                                    y: bomberRef.current?.getCordCenter().y,
                                })
                            );
                    }
                };

                document?.addEventListener('keyup', handleBulletCreate);

                return () => {
                    document?.removeEventListener('keyup', handleBulletCreate);
                };
            }
        }
    }, []);

    useAnimationFrame((_deltaTime) => {
        /**
         * Необходимо прокидывать именно функцию-сеттер (не объект) state'а
         * для уверенности, что стейт будет в актуальном состоянии.
         */
        contextRef.current?.clearRect(0, 0, SCENE_WIDTH, SCENE_HEIGHT);

        if (bomberRef.current instanceof Bomber) {
            /**
             * Блок с расчетами передвижения всех объектов.
             */

            /** Проверяем, что самолет в границах экрана. Если нет, то меняем направление его полета. */
            if (bomberRef.current.getX() + GAME_CONFIG.BOMBER.WIDTH < -GAME_CONFIG.BOMBER.WIDTH) {
                bomberRef.current.changeDirection(EDirection.TO_RIGHT);
                bomberRef.current.rowDown();
            }
            if (bomberRef.current.getX() > SCENE_WIDTH + GAME_CONFIG.BOMBER.WIDTH) {
                bomberRef.current.changeDirection(EDirection.TO_LEFT);
                bomberRef.current.rowDown();
            }

            bomberRef.current.move();

            /** Двигаем снаряды. */
            bulletsRef.current.forEach((bullet) => {
                bullet.move();
            });

            /**
             * Блок с расчетами взаимодействия всех объектов.
             */
            buildingsRef.current.forEach((building) => {
                const bld = {
                    x: building.getX(),
                    y: building.getY(),
                    width: building.getWidth(),
                    height: building.getHeight(),
                };
                const bmb = {
                    x: bomberRef.current!.getX(),
                    y: bomberRef.current!.getY(),
                    width: bomberRef.current!.getWidth(),
                    height: bomberRef.current!.getHeight(),
                };

                /** Проверяем, врезался ли самолет в здание. */
                if (intersect(bld, bmb)) {
                    history.push('/gameover');
                }

                /** Проверяем, попал ли какой-нибудь из снарядов в здание ... */
                bulletsRef.current.forEach((bullet) => {
                    const blt = {
                        x: bullet.getX(),
                        y: bullet.getY(),
                        width: bullet.getWidth(),
                        height: bullet.getHeight(),
                    };
                    if (intersect(bld, blt)) {
                        /** ... если да, то уменьшаем пробивающую силу снаряда и убираем один этаж в здании. */
                        bullet.decPower();
                        building.deleteFloor();
                        setScore((prevState) => prevState + 1);
                    }
                });
            });

            /** Удаляем полностью уничтоженные здания. */
            buildingsRef.current = buildingsRef.current.filter((building) => building.isActive());

            /** Удаляем снаряды ниже земли и снаряды, потерявшие пробивающую силу. */
            bulletsRef.current = bulletsRef.current.filter(
                (bullet) => bullet.getY() < SCENE_HEIGHT && bullet.isActive()
            );

            /**
             * Блок отрисовки всех объектов после расчетов.
             */
            bulletsRef.current.forEach((bullet) => {
                bullet.draw();
            });

            buildingsRef.current.forEach((building) => {
                building.draw();
            });

            bomberRef.current.draw();

            /** Проверяем, что уничтожены все здания. */
            if (buildingsRef.current.length === 0) {
                // TODO: реализовать победу.
                alert('Вы выиграли!');
            }
        }
    });

    return (
        <div className="game-container__background">
            <canvas
                className="game-container__gameboard"
                ref={canvasRef}
                height={SCENE_HEIGHT}
                width={SCENE_WIDTH}
            />
            <span className="game-container__gameboard-score">
                Score: {convertScoreToString(score)}
            </span>
        </div>
    );
}
