import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#0e0b16', // тёмный фоновый
      paper: '#1a1325' // карточки и модалки
    },
    primary: {
      main: '#a379f4' // мягкий фиолетовый (кнопки, ссылки)
    },
    secondary: {
      main: '#f06292' // яркий розово-фиолетовый (акценты)
    },
    error: {
      main: '#ef5350'
    },
    warning: {
      main: '#ffa726'
    },
    info: {
      main: '#64b5f6'
    },
    success: {
      main: '#81c784'
    },
    text: {
      primary: '#e0d7ff',
      secondary: '#b6a6d3'
    },
    divider: '#3e2e5b'
  },
  spacing: 6,
  typography: {
    fontSize: 12
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          color: '#e0d7ff'
        }
      }
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#0e0b16',
          minHeight: '100%'
        }
      }
    },
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
