"use client";
import React, {useEffect, useState} from "react";
import Image from "next/image";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {updateConfig} from "@/app/api/newYear";
import {setNewYearConfig} from "@/lib/newYearEventSlice";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from "next/link";

const useSounds = () => {
    const [correctSound, setCorrectSound] = React.useState<HTMLAudioElement | null>(null);
    const [wrongSound, setWrongSound] = React.useState<HTMLAudioElement | null>(null);

    React.useEffect(() => {
        if (typeof window !== "undefined") {
            const correct = new Audio("/sounds/correct_answer.wav");
            const wrong = new Audio("/sounds/wrong_answer.wav");

            correct.preload = "auto";
            wrong.preload = "auto";

            setCorrectSound(correct);
            setWrongSound(wrong);
        }
    }, []);

    return { correctSound, wrongSound };
};

const Page = () => {
    const { correctSound, wrongSound } = useSounds();
    const config = useAppSelector(state => state.newYearEvent);
    const dispatch = useAppDispatch();
    const {recipes} = config;
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [gameState, setGameState] = React.useState<"menu" | "quiz" | "result">("menu");
    const [currentQuestion, setCurrentQuestion] = React.useState(0);
    const [score, setScore] = React.useState(0);
    const [selectedAnswer, setSelectedAnswer] = React.useState<number | null>(null);
    const [selectedRecipe, setSelectedRecipe] = React.useState<number | null>(null);

    const [isLandscape, setIsLandscape] = useState(true);

    useEffect(() => {
        const check = () => {
            const landscape = window.matchMedia("(orientation: landscape)").matches ||
                window.innerWidth > window.innerHeight;
            setIsLandscape(landscape);
        };
        check();
        window.addEventListener("resize", check);
        window.addEventListener("orientationchange", check);
        return () => {
            window.removeEventListener("resize", check);
            window.removeEventListener("orientationchange", check);
        };
    }, []);

    useEffect(() => {
        if (!isLandscape && window.innerWidth < 1024) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    }, [isLandscape]);


    const startQuiz = (recipeIndex: number) => {
        setSelectedRecipe(recipeIndex);
        setGameState("quiz");
        setCurrentQuestion(0);
        setScore(0);
        setSelectedAnswer(null);
    };

    const resetGame = () => {
        setGameState("menu");
        setCurrentQuestion(0);
        setScore(0);
        setSelectedAnswer(null);
        setSelectedRecipe(null);
    };

    const handleAnswer = (index: number) => {
        if (selectedAnswer !== null || selectedRecipe === null) return;

        setSelectedAnswer(index);

        const currentRecipe = recipes[selectedRecipe];
        const isCorrect = index === currentRecipe.questions[currentQuestion].correct;

        if (isCorrect) {
            correctSound!.currentTime = 0;
            correctSound!.play();
            setScore(prev => prev + 1);
        } else {
            wrongSound!.currentTime = 0;
            wrongSound!.play();
        }

        setTimeout(() => {
            if (currentQuestion < currentRecipe.questions.length - 1) {
                setCurrentQuestion(prev => prev + 1);
                setSelectedAnswer(null);
            } else {
                setGameState("result");
            }
        }, 1400);
    };

    const currentRecipe = selectedRecipe !== null ? recipes[selectedRecipe] : null;

    const getFinalScore = () => {
        if (!currentRecipe) return 0;
        if (gameState === "result") return score;
        if (selectedAnswer === null) return score;
        return score + (selectedAnswer === currentRecipe.questions[currentQuestion].correct ? 1 : 0);
    };

    const finalScore = getFinalScore();
    const totalQuestions = currentRecipe?.questions.length || 0;
    const isPerfect = finalScore === totalQuestions;
    const prevPerfectRef = React.useRef(false);

    React.useEffect(() => {
        if (
            gameState === "result" &&
            isPerfect &&
            !prevPerfectRef.current &&
            currentRecipe
        ) {
            const alias = currentRecipe.alias;
            const amount = config.dishes[alias] || 0;

            const addDish = async() => {
                const newConfig = {
                    ...config,
                    dishes: {
                        ...config.dishes,
                        [alias]: amount + 1,
                    },
                };
                try {
                    await updateConfig(newConfig);
                    dispatch(setNewYearConfig(newConfig));
                }catch (e) {
                    console.log(e)
                }
            }
            addDish().then()
            prevPerfectRef.current = true;
        }

        if (gameState === "menu") {
            prevPerfectRef.current = false;
        }
    }, [gameState, config, dispatch, isPerfect, currentRecipe]);

    return (
        <>
            <div className={`relative ${isLandscape ? "block" : "hidden"} flex justify-center items-end w-full min-h-[calc(100vh-72px)]`}>
                <Link href="/miracle">
                    <ArrowBackIcon sx={{ fontSize: 100 }} className="absolute top-[2%] left-[2%] z-9999 cursor-pointer"/>
                </Link>
                <Image
                    src="/floor.png"
                    alt="floor"
                    width={1600}
                    height={1600}
                    priority
                    quality={100}
                    className="absolute bottom-0 w-full h-1/2 z-2"
                />
                <Image
                    src="/wall.png"
                    alt="wall"
                    width={1600}
                    height={1600}
                    priority
                    quality={100}
                    className="absolute -top-5 w-full h-9/10 z-1"
                />
                <div className="relative flex justify-center items-end w-3/4 h-1/2">
                    <Image
                        src="/opened_book.png"
                        alt="recipe_book"
                        width={500}
                        height={200}
                        priority
                        quality={100}
                        className="absolute bottom-[40%] w-1/4 cursor-pointer z-10"
                        onClick={() => { setIsModalOpen(true); resetGame(); }}
                    />
                    <Image src="/bowls.png" alt="bowls" width={500} height={500} className="absolute bottom-[40%] left-[20%] w-1/8 aspect-square z-10" />
                    <Image src="/desk.png" alt="table" width={1080} height={1080} className="w-full h-full z-9" />
                </div>

                {isModalOpen && (
                    <div className="absolute inset-0 bg-black/70 flex justify-center items-center z-50">
                        <div className="w-11/12 max-w-lg p-8 bg-white rounded-2xl shadow-2xl flex flex-col gap-6">

                            {/* Меню */}
                            {gameState === "menu" && (
                                <div className="text-center">
                                    {recipes.length > 0 ? (
                                        <>
                                            <h1 className="text-3xl font-bold text-pink-700 mb-8">Что будем готовить?</h1>
                                            <div className="space-y-4">
                                                {recipes.map((recipe, i) => (
                                                    <button
                                                        key={i}
                                                        onClick={() => startQuiz(i)}
                                                        className="block w-full text-2xl font-bold text-pink-900 cursor-pointer"
                                                    >
                                                        {recipe.name}
                                                    </button>
                                                ))}
                                            </div>
                                        </>
                                    ) : (
                                        <h1 className="text-3xl font-bold text-pink-700 mb-8">Нет ещё изученых рецептов</h1>
                                    )}
                                    <button
                                        onClick={() => setIsModalOpen(false)}
                                        className="mt-8 px-10 py-3 bg-pink-600 text-white rounded-full cursor-pointer"
                                    >
                                        Закрыть книгу
                                    </button>
                                </div>
                            )}

                            {/* Викторина */}
                            {gameState === "quiz" && currentRecipe && (
                                <div className="text-center">
                                    <div className="mb-4 text-sm md:text-2xl text-pink-600">
                                        Вопрос {currentQuestion + 1} из {currentRecipe.questions.length}
                                    </div>
                                    <h2 className="text-xl font-bold text-pink-800 mb-8 px-4">
                                        {currentRecipe.questions[currentQuestion].question}
                                    </h2>

                                    <div className="grid grid-cols-2 gap-4 mb-8">
                                        {currentRecipe.questions[currentQuestion].options.map((option, index) => (
                                            <button
                                                key={index}
                                                onClick={() => handleAnswer(index)}
                                                disabled={selectedAnswer !== null}
                                                className={`py-4 px-6 rounded-xl cursor-pointer font-medium transition-all transform
                        ${selectedAnswer === null
                                                    ? "bg-pink-100 hover:bg-pink-200 text-pink-900 border-2 border-pink-300 hover:scale-105"
                                                    : selectedAnswer === index
                                                        ? index === currentRecipe.questions[currentQuestion].correct
                                                            ? "bg-green-500 text-white scale-110"
                                                            : "bg-red-500 text-white"
                                                        : index === currentRecipe.questions[currentQuestion].correct
                                                            ? "bg-green-500 text-white scale-110"
                                                            : "bg-gray-200 text-gray-600"
                                                }
                      `}
                                            >
                                                {option}
                                            </button>
                                        ))}
                                    </div>

                                    <div className="text-4xl mt-6 text-pink-600">
                                        {selectedAnswer !== null && selectedAnswer === currentRecipe.questions[currentQuestion].correct
                                            ? "Отлично!"
                                            : selectedAnswer !== null
                                                ? "Не совсем!"
                                                : ""}
                                    </div>
                                </div>
                            )}

                            {gameState === "result" && currentRecipe && (
                                <div className="text-center py-8">
                                    <h2 className="text-3xl font-bold text-pink-700 mb-6">
                                        {isPerfect ? "Идеально!" : "Что-то не то..."}
                                    </h2>

                                    <p className="text-2xl font-bold text-pink-800 mb-4">
                                        {finalScore} из {totalQuestions} правильно
                                    </p>

                                    {!isPerfect && (
                                        <p
                                            onClick={() => startQuiz(selectedRecipe!)}
                                            className="text-lg text-pink-700 underline cursor-pointer"
                                        >
                                            Попробуй ещё разок!
                                        </p>
                                    )}
                                    <button
                                        onClick={() => setIsModalOpen(false)}
                                        className="mt-3 px-10 py-4 bg-pink-600 text-white text-xl rounded-full hover:bg-pink-700 transition"
                                    >
                                        Закрыть книгу
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
            {!isLandscape && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
                    <div className="text-white text-center p-8 max-w-xs">
                        <div className="mb-8">
                            <svg className="mx-auto w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M19 16h2a2 2 0 002-2V7a2 2 0 00-2-2h-2m-4-3h.01M12 14h.01" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold mb-4">Поверни устройство</h2>
                        <p>Для лучшего просмотра нужна альбомная ориентация</p>
                    </div>
                </div>
            )}
        </>
    );
};

export default Page;