import { createContext, useContext, useState } from 'react';
import type { GmailLabel } from '../types/gmail-label';
import {
	FormProvider,
	useForm,
	type Path,
	type Resolver,
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
	defaultLabelFormValues,
	labelSchema,
	type LabelSchema,
} from './label-form-schema';
import { addLabelMutation } from '../api/labels-mutations/add-label-mutation';
import { deleteLabelMutation } from '../api/labels-mutations/delete-label-mutation';
import { updateLabelMutation } from '../api/labels-mutations/update-label-mutation';

export type LabelContextType = {
	labels: GmailLabel[];
	setLabels: (labels: GmailLabel[]) => void;
	showLabelForm: 'create' | 'update' | null;
	setShowLabelForm: (showLabelForm: 'create' | 'update' | null) => void;
	addCallback: () => void;
	deleteCallback: () => void;
	resetCallback: () => void;
	setSelectedRow: (selectedRowIds: GmailLabel) => void;
	selectedRow: GmailLabel | undefined;
	updateCallback: () => void;
	showUpdateForm: () => void;
	onSubmit: (data: LabelSchema) => void;
};

const defaultContext: LabelContextType = {
	labels: [],
	setLabels: () => {},
	showLabelForm: null,
	setShowLabelForm: () => {},
	addCallback: () => {},
	deleteCallback: () => {},
	resetCallback: () => {},
	setSelectedRow: () => {},
	selectedRow: undefined,
	updateCallback: () => {},
	showUpdateForm: () => {},
	onSubmit: () => {},
};
const LabelContext = createContext<LabelContextType>(defaultContext);

export function LabelContextProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [labels, setLabels] = useState<GmailLabel[]>([]);
	const [showLabelForm, setShowLabelForm] = useState<
		'create' | 'update' | null
	>(null);
	const [selectedRow, setSelectedRow] = useState<GmailLabel>();
	const addLabel = addLabelMutation();
	const deleteLabel = deleteLabelMutation();
	const updateLabel= updateLabelMutation();

    const methods = useForm<LabelSchema>({
		defaultValues: defaultLabelFormValues,
		resolver: yupResolver(labelSchema) as Resolver<LabelSchema, unknown>,
	});

	function addCallback() {
		const requestBody = JSON.parse(JSON.stringify(methods.getValues()));
		addLabel.mutate(requestBody);
	}

	function updateCallback() {
		if (!selectedRow) return;
		const requestBody = JSON.parse(JSON.stringify(methods.getValues()));
		updateLabel.mutate({ id: selectedRow?.toString(), ...requestBody });
	}

	function showUpdateForm() {
		setShowLabelForm('update');
		if (!selectedRow) return;
		Object.entries(selectedRow).forEach(([key, value]) => {
			methods.setValue(key as Path<LabelSchema>, value);
		});
	}

	function deleteCallback() {
		if (!selectedRow) return;
		deleteLabel.mutate(selectedRow.id?.toString());
	}

	function resetCallback() {
		methods.reset();
	}

	function onSubmit(data: LabelSchema) {
		if (!data.name) return;
		if (showLabelForm === 'create') {
			addCallback();
		}
		if (showLabelForm === 'update') {
			updateCallback();
		}
		methods.reset();
		setShowLabelForm(null);
	}

	return (
		<LabelContext.Provider
			value={{
				labels,
				setLabels,
				showLabelForm,
				setShowLabelForm,
				addCallback,
				deleteCallback,
				resetCallback,
				setSelectedRow,
				selectedRow,
				updateCallback,
				showUpdateForm,
				onSubmit,
			}}>
			<FormProvider {...methods}>
				{addLabel.isPending ||
				updateLabel.isPending ||
				deleteLabel.isPending
					? 'Loading...'
					: children}
			</FormProvider>
		</LabelContext.Provider>
	);
}
export function useLabelContext() {
	return useContext(LabelContext);
}
