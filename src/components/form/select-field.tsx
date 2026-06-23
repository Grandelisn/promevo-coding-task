import { Controller, type FieldValues, type Path, useFormContext } from 'react-hook-form';
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText,
    type SelectProps
} from '@mui/material';

export type SelectOption = {
    value: string | number;
    label: string;
};

type Props<T extends FieldValues> = {
    name: Path<T>;
    options: SelectOption[];
} & Omit<SelectProps, 'name' | 'error' | 'value' | 'onChange' | 'onBlur'>;

function SelectField<T extends FieldValues>({
    name,
    options,
    label,
    fullWidth,
    size,
    variant,
    ...props
}: Props<T>) {
    const { control } = useFormContext();
    
    const labelId = `${name}-select-label`;

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <FormControl 
                    fullWidth={fullWidth} 
                    error={!!error} 
                    size={size} 
                    variant={variant}
                >
                    {label && <InputLabel id={labelId}>{label}</InputLabel>}
                    
                    <Select
                        {...field}
                        {...props}
                        labelId={labelId}
                        id={name}
                        label={label} 
                    >
                        {options.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                    {error && <FormHelperText>{error.message}</FormHelperText>}
                </FormControl>
            )}
        />
    );
}

export default SelectField;