import "./CustomButton.scss";

const CustomButton = ({ text, children, onClick, type = "button", classes = "", disabled }) => {
	return (
		<button onClick={onClick} type={type} className={classes} disabled={disabled}>
			{children}
			{text}
		</button>
	);
};
export default CustomButton;
