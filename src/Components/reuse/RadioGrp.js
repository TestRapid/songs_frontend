import {
	FormControl,
	FormControlLabel,
	FormLabel,
	Grid,
	Radio,
	RadioGroup
} from "@material-ui/core";

// radio group component
export const RadioGrp = ({ name, value, label, onChange, grp }) => {
	return (
		<div>
			<FormControl component="fieldset">
				<FormLabel component="legend">{label}</FormLabel>
				<RadioGroup
					aria-label={name}
					name={name}
					value={value}
					onChange={onChange}
				>
					<Grid container>
						{grp.map((r) => (
							<FormControlLabel
								key={r.val}
								value={r.val}
								control={<Radio color="primary" />}
								label={r.label}
							/>
						))}
					</Grid>
				</RadioGroup>
			</FormControl>
		</div>
	);
};

export default RadioGrp;
