import { Button, Container, Stack } from '@mui/material';
import RadioGroupComponent from './form/radio-group';
import TextField from './form/text-field';
import { useLabelContext } from '../contexts/label-context';
import { useFormContext } from 'react-hook-form';
import type { LabelSchema } from '../contexts/label-form-schema';
import SelectField from './form/select-field';
import { labelColorValues } from '../types/gmail-label';

function AddLabelForm() {
	const { onSubmit, resetCallback } = useLabelContext();
	const { handleSubmit } = useFormContext<LabelSchema>();
	return (
		<Container
			component="form"
			onSubmit={handleSubmit(onSubmit)}
			sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
			<TextField label="Label Name*" name={'name'} />
			<RadioGroupComponent
				name="messageListVisibility"
				options={[
					{ id: 'show', label: 'Show' },
					{ id: 'hide', label: 'Hide' },
				]}
				label="Message List Visibility"
			/>
			<RadioGroupComponent
				name="labelListVisibility"
				options={[
					{ id: 'labelShow', label: 'Show' },
					{ id: 'labelShowIfUnread', label: 'Show if Unread' },
					{ id: 'labelHide', label: 'Hide' },
				]}
				label="Label List Visibility"
			/>
			<SelectField
				name="color.textColor"
				options={labelColorValues.map((color) => ({
					value: color,
					label: color,
				}))}
				label="Text Color"
			/>
			<SelectField
				name="color.backgroundColor"
				options={labelColorValues.map((color) => ({
					value: color,
					label: color,
				}))}
				label="Background Color"
			/>
			<Stack sx={{ flexDirection: 'row', justifyContent: 'space-between' }}>
				<Button variant="contained" type="submit">
					Submit
				</Button>
				<Button onClick={resetCallback}>Reset</Button>
			</Stack>
		</Container>
	);
}

export default AddLabelForm;
