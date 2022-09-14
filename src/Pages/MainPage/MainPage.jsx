import "./MainPage.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import CustomButton from "../../Components/CustomButton/CustomButton";
import CustomInput from "../../Components/CustomInput/CustomInput";
import VerificationInput from "react-verification-input";
import GameInput from "../../Components/GameInput/GameInput";
const initialState = {
	guessedWord: "",
	guessesLeft: 5,
	prevGuesses: Array(5).fill(""),
};
const MainPage = () => {
	const [word, setWord] = useState("");
	const [wordLength, setLength] = useState(5);
	const [guessedWord, setGuess] = useState(initialState.guessedWord);
	const [guessesLeft, setGuesses] = useState(initialState.guessesLeft);
	const [prevGuesses, setPrev] = useState(initialState.prevGuesses);
	const getWord = async () => {
		const { data } = await axios.get(`https://random-word-api.herokuapp.com/word?length=${wordLength}`);
		setWord(data[0].toUpperCase());
	};
	useEffect(() => {
		getWord();
		// eslint-disable-next-line
	}, []);
	const resetGame = () => {
		getWord();
		setGuess(initialState.guessedWord);
		setGuesses(initialState.guessesLeft);
		setPrev(initialState.prevGuesses);
	};
	const submitGuess = () => {
		if (guessedWord === word) console.log("you won!");
		else {
			const index = prevGuesses.findIndex((v) => v === "");
			console.log(index);
			setPrev([...prevGuesses.slice(0, index), guessedWord, ...prevGuesses.slice(index + 1)]);
			setGuesses(guessesLeft - 1);
			setGuess("");
			console.log("wrong word");
		}
	};
	return (
		<div className="main-page">
			<p>{word}</p>
			<CustomButton text="New Word" onClick={resetGame} />
			{prevGuesses.map((guess, i) => (
				<GameInput
					guessedWord={guessedWord}
					prevGuess={guess}
					onChange={(v) => {
						setGuess(v.toUpperCase());
					}}
					wordLength={wordLength}
					disabled={guessesLeft !== 5 - i}
					submitGuess={submitGuess}
				/>
			))}
			<CustomButton text="Submit" onClick={submitGuess} />
		</div>
	);
};
export default MainPage;
