/* eslint-disable unused-imports/no-unused-vars */
// Global MUI type extensions for testing attributes
import 'react'

declare module 'react' {
  interface HTMLAttributes<T> {
    'data-testid'?: string
  }

  interface InputHTMLAttributes<T> {
    'data-testid'?: string
  }

  interface ButtonHTMLAttributes<T> {
    'data-testid'?: string
  }
}
