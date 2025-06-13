import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  spacing: 6,
  typography: {
    fontSize: 12
  },
  components: {
    MuiButton: { defaultProps: { size: 'small' } },
    MuiTextField: { defaultProps: { size: 'small' } },
    MuiCheckbox: { defaultProps: { size: 'small' } },
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          fontSize: '0.8rem'
        }
      }
    }
  }
})
