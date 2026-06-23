import {
	Controller,
	type FieldValues,
	type Path,
	useFormContext,
} from 'react-hook-form';

import { TextField as MUITextField, type TextFieldProps } from '@mui/material';

type Props<T extends FieldValues> = {
	name: Path<T>;
} & Pick<TextFieldProps, 'label'>;

function TextField<T extends FieldValues>({ name, ...props }: Props<T>) {
	const { control } = useFormContext();

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState: { error } }) => (
				<MUITextField
					{...field}
					{...props}
					error={!!error}
					helperText={error?.message}
				/>
			)}
		/>
	);
}

export default TextField;
