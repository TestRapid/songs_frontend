import { TextField } from "@material-ui/core";

export const Input = ({ ...rest }) => {
	return <TextField fullWidth variant="outlined" {...rest} />;
};

export default Input;
