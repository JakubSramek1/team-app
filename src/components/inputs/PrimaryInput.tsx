import { TextField, TextFieldProps } from '@mui/material'
import { FC, useState } from 'react'

interface Props {
    value: string | null
    onChange: (val: string) => void
}

type TextFieldType = Omit<TextFieldProps, 'onChange'>

const PrimaryInput: FC<Props & TextFieldType> = ({
    onChange,
    value,
    ...props
}) => {
    const [inputValue, setInputValue] = useState<string>(value || '')

    return (
        <TextField
            {...props}
            fullWidth
            value={inputValue}
            variant="standard"
            sx={{ m: 1 }}
            color="primary"
            onChange={
                !props.disabled && onChange
                    ? ({ target: { value } }) => {
                          setInputValue(value)
                          onChange(value)
                      }
                    : undefined
            }
        />
    )
}

export default PrimaryInput
