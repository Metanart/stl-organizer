import { FC, useState } from 'react'
import FolderOpenIcon from '@mui/icons-material/FolderOpen'
import { IconButton, InputAdornment, StandardTextFieldProps, TextField } from '@mui/material'

type Props = {
  label: string
  value: string | null
  name: string
  onChange: StandardTextFieldProps['onChange']
  onSelect: (name: string, newPath: string) => void
}

export const FolderInput: FC<Props> = (props) => {
  const { label, value, name, onSelect, onChange } = props

  const [isDisabled, setIsDisabled] = useState(false)

  const handleSelectFolder = async (): Promise<void> => {
    setIsDisabled(true)
    const selectedPath = await window.electron.selectFolder()

    console.log(name, selectedPath)

    if (selectedPath) onSelect(name, selectedPath)
    setIsDisabled(false)
  }

  return (
    <TextField
      label={label}
      value={value}
      name={name}
      fullWidth
      disabled={isDisabled}
      variant="outlined"
      onChange={onChange}
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
