import * as yup from 'yup';

const MESSAGE_LIST_VISIBILITY_VALUES = ['show', 'hide'];
const LABEL_LIST_VISIBILITY_VALUES = [
	'labelShow',
	'labelShowIfUnread',
	'labelHide',
];
const TYPE_VALUES = ['system', 'user'];

export const labelSchema = yup.object().shape({
	id: yup.string().nullable(),

	name: yup.string().required('Label name is required'),

	messageListVisibility: yup
		.string()
		.oneOf(
			MESSAGE_LIST_VISIBILITY_VALUES,
			'Invalid message list visibility option'
		),

	labelListVisibility: yup
		.string()
		.oneOf(
			LABEL_LIST_VISIBILITY_VALUES,
			'Invalid label list visibility option'
		),

	type: yup.string().oneOf(TYPE_VALUES, 'Invalid label type').nullable(),

	messagesTotal: yup
		.number()
		.integer('Must be a whole number')
		.min(0, 'Cannot be negative'),

	messagesUnread: yup
		.number()
		.integer('Must be a whole number')
		.min(0, 'Cannot be negative'),

	threadsTotal: yup
		.number()
		.integer('Must be a whole number')
		.min(0, 'Cannot be negative')
		.nullable(),

	threadsUnread: yup
		.number()
		.integer('Must be a whole number')
		.min(0, 'Cannot be negative'),
	color: yup.object().shape({
		textColor: yup.string().nullable(),
		backgroundColor: yup.string().nullable(),
	}),
});

export type LabelSchema = yup.InferType<typeof labelSchema>;

export const defaultLabelFormValues: LabelSchema = {
	id: '',
	name: '',
	messageListVisibility: 'show',
	labelListVisibility: 'labelShow',
	type: 'user',
	messagesTotal: 0,
	messagesUnread: 0,
	threadsTotal: 0,
	threadsUnread: 0,
	color: {
		textColor: '',
		backgroundColor: '',
	},
};
