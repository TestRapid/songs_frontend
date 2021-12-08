import { Button as Btn } from "@material-ui/core";

export const Button = ({ children, ...rest }) => {
	return (
		<Btn variant="contained" {...rest} disableElevation>
			{children}
		</Btn>
	);
};

export default Button;
