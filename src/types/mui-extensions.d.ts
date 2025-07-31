// MUI component type extensions for testing attributes

declare module '@mui/material/Switch' {
  interface SwitchProps {
    'data-testid'?: string
  }

  interface SwitchInputSlotPropsOverrides {
    'data-testid'?: string
  }
}

declare module '@mui/material/TextField' {
  interface TextFieldProps {
    'data-testid'?: string
  }
}

declare module '@mui/material/Button' {
  interface ButtonProps {
    'data-testid'?: string
  }
}

declare module '@mui/material/FormControlLabel' {
  interface FormControlLabelProps {
    'data-testid'?: string
  }
}
