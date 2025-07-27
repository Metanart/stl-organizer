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
    helperText
  } = props

  const [isDisabled, setIsDisabled] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  const handleSelectFolder = async (): Promise<void> => {
    setIsDisabled(true)
    const selectedPath = await window.electron.selectFolder()

    if (selectedPath) onSelect(selectedPath)
    setIsDisabled(false)
  }

  const handleFocus = (): void => {
    setIsFocused(true)
  }

  const handleBlur = (): void => {
    setIsFocused(false)
  }

  return (
    <TextField
      label={label}
      value={value}
      name={name}
      fullWidth={fullWidth}
      color={isUpdated && !isFocused ? 'success' : 'primary'}
      focused={isFocused || isUpdated}
      disabled={isDisabled}
      variant="outlined"
      onChange={onChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      placeholder={placeholder}
      error={error}
      helperText={helperText}
      slotProps={{
        input: {
          readOnly: false,
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleSelectFolder}>
                <FolderOpenIcon />
              </IconButton>
            </InputAdornment>
          )
        }
      }}
    />
  )
}
