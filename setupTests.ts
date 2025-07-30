/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

import '@testing-library/jest-dom'

afterEach(() => {
  cleanup()
})

// Пример моков, если в проекте используются специфичные Web API
global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
} as any
