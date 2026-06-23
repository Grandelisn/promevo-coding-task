import {
	Controller,
	type FieldValues,
	type Path,
	useFormContext,
} from 'react-hook-form';
import {
	FormControl,
	FormControlLabel,
	FormLabel,
	Radio,
	RadioGroup,
} from '@mui/material';

type Option = {
	id: string;
	label: string;
};

type Props<T extends FieldValues> = {
	name: Path<T>;
	options?: Option[];
	label: string;
};

function RadioGroupComponent<T extends FieldValues>({
	name,
	options,
	label,
}: Props<T>) {
	const { control } = useFormContext<T>();

	return (
		<Controller
			control={control}
			name={name}
			render={({ field, fieldState: { error } }) => (
				<FormControl {...field} error={!!error}>
					<FormLabel>{label}</FormLabel>
					<RadioGroup sx={{ display: 'flex', flexDirection: 'row' }}>
						{options?.map((option) => (
							<FormControlLabel
								value={option.id}
								control={<Radio checked={field.value === option.id} />}
								label={option.label}
								key={option.id}
							/>
						))}
					</RadioGroup>
				</FormControl>
			)}></Controller>
	);
}

export default RadioGroupComponent;
