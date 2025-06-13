import { FC, useState } from 'react'
import FolderOpenIcon from '@mui/icons-material/FolderOpen'
import { IconButton, InputAdornment, StandardTextFieldProps, TextField } from '@mui/material'

type Props = {
  label: string
  value: string | null
  name: string
  isUpdated?: boolean
  onChange: StandardTextFieldProps['onChange']
  onSelect: (name: string, newPath: string) => void
}

export const FolderInput: FC<Props> = (props) => {
  const { label, value, name, isUpdated, onSelect, onChange } = props

  const [isDisabled, setIsDisabled] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  const handleSelectFolder = async (): Promise<void> => {
    setIsDisabled(true)
    const selectedPath = await window.electron.selectFolder()

    if (selectedPath) onSelect(name, selectedPath)
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
      fullWidth
      color={isUpdated && !isFocused ? 'success' : 'primary'}
      focused={isFocused || isUpdated}
      disabled={isDisabled}
      variant="outlined"
      onChange={onChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      slotProps={{
        input: {
          readOnly: true,
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
