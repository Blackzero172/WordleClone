import "./CustomInput.scss";

const CustomInput = ({ onChange, type = "text", classes = "", value }) => {
	return <input onChange={onChange} type={type} className={classes} value={value}></input>;
};
export default CustomInput;
