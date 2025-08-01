import { describe, expect, it } from 'vitest'

import { normalizeTextOnInput } from './normalizeTextOnInput'

describe('normalizeTextOnInput', () => {
  it('removes leading whitespace', () => {
    expect(normalizeTextOnInput('   hello')).toBe('hello')
  })
  it('replaces tabs with spaces', () => {
    expect(normalizeTextOnInput('\thello\tworld')).toBe('hello world')
  })
  it('returns empty string for empty input', () => {
    expect(normalizeTextOnInput('')).toBe('')
  })
})
