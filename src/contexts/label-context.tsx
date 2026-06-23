import {createContext, useContext, useState} from 'react';
import type { GmailLabel } from '../types/gmail-label';
import { FormProvider, useForm, type Path, type Resolver } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {  defaultLabelFormValues, labelSchema, type LabelSchema } from './label-form-schema';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteLabel, postLabel, updateLabel } from '../api/labels-api';

export type LabelContextType = {
    labels: GmailLabel[],
    setLabels: (labels: GmailLabel[]) => void
    showLabelForm: 'create' | 'update' | null,
    setShowLabelForm: (showLabelForm: 'create' | 'update' | null) => void,
    addCallback: () => void,
    deleteCallback: () => void,
    resetCallback: () => void,
    setSelectedRow: (selectedRowIds: GmailLabel) => void
    selectedRow: GmailLabel | undefined,
    updateCallback: () => void,
    showUpdateForm: () => void,
    onSubmit: (data: LabelSchema) => void
}

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
    onSubmit: () => {}
}
const LabelContext = createContext<LabelContextType>(defaultContext)

export function LabelContextProvider({children}: {children: React.ReactNode}) {
    const [labels, setLabels] = useState<GmailLabel[]>([]);
    const [showLabelForm, setShowLabelForm] = useState<'create' | 'update' | null>(null);
    const [selectedRow, setSelectedRow] = useState<GmailLabel>();
    const queryClient = useQueryClient();

    const methods = useForm<LabelSchema>({
		defaultValues:defaultLabelFormValues,
		resolver: yupResolver(labelSchema) as Resolver<LabelSchema, unknown>,
        
	});

    const addLabelMutation = useMutation({
            mutationFn: postLabel,
            onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['labelsData'] })
        },});

    const deleteLabelMutation = useMutation({
            mutationFn: deleteLabel,
            onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['labelsData'] })
        },});

    const updateLabelMutation = useMutation({
            mutationFn: updateLabel,
            onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['labelsData'] })
        },});

    function addCallback() {
        const requestBody = JSON.parse(JSON.stringify(methods.getValues()));
        addLabelMutation.mutate(requestBody);
    }

    function updateCallback() {
      if(!selectedRow) return;
      const requestBody = JSON.parse(JSON.stringify(methods.getValues()));
      updateLabelMutation.mutate({id: selectedRow?.toString(), ...requestBody});
    }

    function showUpdateForm(){
        setShowLabelForm('update');
        if(!selectedRow) return;
        Object.entries(selectedRow).forEach(([key, value]) => {
        methods.setValue(key as Path<LabelSchema>, value);
        });
    }

    function deleteCallback() {
      if(!selectedRow) return;
      deleteLabelMutation.mutate(selectedRow.id?.toString());
    }

    function resetCallback() {
        methods.reset();
    }

    function onSubmit(data: LabelSchema) {
        if(!data.name) return;
        if(showLabelForm === 'create'){
          addCallback();
        }
        if(showLabelForm === 'update'){
          updateCallback();
        }
        methods.reset();
        setShowLabelForm(null);
    }
    
    return (
        <LabelContext.Provider value={{
            labels, setLabels, 
            showLabelForm, 
            setShowLabelForm, 
            addCallback, 
            deleteCallback, 
            resetCallback, 
            setSelectedRow, 
            selectedRow, 
            updateCallback,
            showUpdateForm,
            onSubmit}}>
            <FormProvider {...methods}>
                {addLabelMutation.isPending || updateLabelMutation.isPending || deleteLabelMutation.isPending ? (
                    'Loading...'
                ) : (
                    children
                )}
            </FormProvider>
        </LabelContext.Provider>
    )
}
export function useLabelContext() {
    return useContext(LabelContext)
}