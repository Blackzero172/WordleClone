import { useEffect, useRef } from "react";
import VerificationInput from "react-verification-input";
import "./GameInput.scss";
const GameInput = ({ guessedWord, prevGuess, onChange, wordLength, disabled, submitGuess }) => {
	const inputRef = useRef();
	useEffect(() => {
		if (!disabled) inputRef.current.focus();
	}, [disabled]);
	return (
		<div
			className="game-input"
			onKeyDown={(e) => {
				if (e.key === "Enter" && guessedWord.length >= 5) submitGuess();
			}}
		>
			<VerificationInput
				value={!disabled ? guessedWord : prevGuess}
				onChange={onChange}
				placeholder=""
				length={wordLength}
				validChars={!disabled ? "A-Za-z" : ""}
				classNames={{
					container: disabled ? "input-disabled" : "",
					character: "input-char",
					characterInactive: "inactive-char",
				}}
				ref={inputRef}
			/>
		</div>
	);
};
export default GameInput;
