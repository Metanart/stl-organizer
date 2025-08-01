import { createTheme } from '@mui/material/styles'
import type {} from '@mui/x-data-grid/themeAugmentation'

import { TOKENS_COLORS, TOKENS_SHAPE, TOKENS_SPACING, TOKENS_TYPOGRAPHY } from './tokens'

export const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: TOKENS_COLORS.background.default,
      paper: TOKENS_COLORS.background.paper
    },
    primary: {
      main: TOKENS_COLORS.primary
    },
    secondary: {
      main: TOKENS_COLORS.secondary
    },
    error: {
      main: TOKENS_COLORS.error
    },
    warning: {
      main: TOKENS_COLORS.warning
    },
    info: {
      main: TOKENS_COLORS.info
    },
    success: {
      main: TOKENS_COLORS.success
    },
    text: {
      primary: TOKENS_COLORS.text.primary,
      secondary: TOKENS_COLORS.text.secondary
    },
    divider: TOKENS_COLORS.divider,
    DataGrid: {
      bg: TOKENS_COLORS.background.paper,
      pinnedBg: TOKENS_COLORS.background.paper,
      headerBg: TOKENS_COLORS.background.paper
    }
  },
  spacing: TOKENS_SPACING.unit,
  typography: {
    fontSize: TOKENS_TYPOGRAPHY.fontSize
  },
  shape: {
    borderRadius: TOKENS_SHAPE.borderRadius
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          color: TOKENS_COLORS.text.primary
        }
      }
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: TOKENS_COLORS.background.default,
          minHeight: '100%'
        }
      }
    },
    MuiButton: {
      defaultProps: {
        size: 'small'
      }
    },
    MuiTextField: {
      defaultProps: {
        size: 'small'
      }
    },
    MuiCheckbox: {
      defaultProps: {
        size: 'small'
      }
    },
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          fontSize: TOKENS_TYPOGRAPHY.labelSize
        }
      }
    }
  }
})
