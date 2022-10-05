import type { NextPage } from "next";
import RenderResult from "next/dist/server/render-result";
import { ReactNode, useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

const generateRandomColor = () =>
    "#" +
    Math.floor(Math.random() * 16777215)
        .toString(16)
        .toUpperCase();

enum GameStatus {
    Correct,
    Wrong
}

const Home: NextPage = () => {
    const [color, setColor] = useState<string>("");
    const [displayAnswers, setDisplayAnswers] = useState<string[]>([]);
    const [gameStatus, setGameStatus] = useState<GameStatus | undefined>(
        undefined
    );
    const setColors = () => {
        const correctGeneratedColor = generateRandomColor();
        setColor(correctGeneratedColor);
        setDisplayAnswers(
            [
                correctGeneratedColor,
                generateRandomColor(),
                generateRandomColor()
            ]
                .map((value) => ({ value, sort: Math.random() }))
                .sort((a, b) => a.sort - b.sort)
                .map(({ value }) => value)
        );
    };
    useEffect(() => {
        setColors();
    }, []);

    const handleClick = (answerClicked: string) => {
        console.log(answerClicked);
        if (answerClicked === color) {
            setGameStatus(GameStatus.Correct);
            setColors();
        } else {
            setGameStatus(GameStatus.Wrong);
        }
    };

    return (
        <div className={styles.hero}>
            <div
                className={styles["colorSelection"]}
                style={{ background: color }}
            />

            <div className={styles.buttonWrapper}>
                {displayAnswers.map((answer) => {
                    return (
                        <button
                            key={answer}
                            onClick={() => handleClick(answer)}
                        >
                            {answer}
                        </button>
                    );
                })}
            </div>
            <>
                {gameStatus === GameStatus.Correct && (
                    <h3
                        className={styles.gameStatus}
                        style={{ color: "#49a15c" }}
                    >
                        Correct
                    </h3>
                )}
                {gameStatus === GameStatus.Wrong && (
                    <h3
                        className={styles.gameStatus}
                        style={{ color: "#ed4747" }}
                    >
                        Wrong
                    </h3>
                )}
            </>
        </div>
    );
};

export default Home;
