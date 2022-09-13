import "./MainPage.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import CustomButton from "../../Components/CustomButton/CustomButton";
import CustomInput from "../../Components/CustomInput/CustomInput";
import VerificationInput from "react-verification-input";
const MainPage = () => {
	const [word, setWord] = useState("");
	const [wordLength, setLength] = useState(5);
	const [guessedWord, setGuess] = useState("");
	const [guessesLeft, setGuesses] = useState(5);
	const [wrongGuesses, setWrong] = useState(Array(5));
	const getWord = async () => {
		const { data } = await axios.get(`https://random-word-api.herokuapp.com/word?length=${wordLength}`);
		setWord(data[0]);
	};
	useEffect(() => {
		getWord();
		// eslint-disable-next-line
	}, []);
	const guessWord = () => {
		if (guessedWord === word) console.log("you won!");
		else {
			setGuesses(guessesLeft - 1);
			setGuess("");
			console.log("wrong word");
		}
	};
	return (
		<div className="main-page">
			<p>{word}</p>
			<CustomButton text="New Word" onClick={getWord} />
			<VerificationInput
				value={guessedWord}
				onChange={setGuess}
				placeholder=""
				length={wordLength}
				validChars=""
			/>
			<CustomButton text="Submit" onClick={guessWord} />
		</div>
	);
};
export default MainPage;
