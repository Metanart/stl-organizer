import { FC, useState } from 'react'
import FolderOpenIcon from '@mui/icons-material/FolderOpen'
import { IconButton, InputAdornment, StandardTextFieldProps, TextField } from '@mui/material'

type Props = {
  label: string
  value: string
  name: string
  fullWidth?: boolean
  placeholder?: string
  isUpdated?: boolean
  onChange: StandardTextFieldProps['onChange']
  onSelect: (newPath: string) => void
  error?: boolean
  helperText?: string
  isDisabled?: boolean
  id?: string
  slotProps?: StandardTextFieldProps['slotProps']
}

export const FolderInput: FC<Props> = (props) => {
  const {
    label,
    value,
    name,
    isUpdated,
    fullWidth,
    placeholder,
    onSelect,
    onChange,
    error,
    helperText,
    isDisabled,
    id,
    slotProps
  } = props

  const [isSelecting, setIsSelecting] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  const handleSelectFolder = async (): Promise<void> => {
    setIsSelecting(true)
    const selectedPath = await window.electron.selectFolder()

    if (selectedPath) onSelect(selectedPath)
    setIsSelecting(false)
  }

  const handleFocus = (): void => {
    setIsFocused(true)
  }

  const handleBlur = (): void => {
    setIsFocused(false)
  }

  return (
    <TextField
      id={id}
      label={label}
      value={value}
      name={name}
      fullWidth={fullWidth}
      color={isUpdated && !isFocused ? 'success' : 'primary'}
      focused={isFocused || isUpdated}
      disabled={isDisabled || isSelecting}
      variant="outlined"
      onChange={onChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      placeholder={placeholder}
      error={error}
      helperText={helperText}
      slotProps={{
        ...slotProps,
        input: {
          ...slotProps?.input,
          readOnly: false,
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleSelectFolder} disabled={isDisabled || isSelecting}>
                <FolderOpenIcon />
              </IconButton>
            </InputAdornment>
          )
        }
      }}
    />
  )
}
