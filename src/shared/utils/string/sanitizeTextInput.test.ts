import { describe, expect, it } from 'vitest'

import { sanitizeUserInput } from './sanitizeTextInput'

describe('sanitizeUserInput', () => {
  it('returns empty string for empty input', () => {
    expect(sanitizeUserInput('')).toBe('')
  })
  it('removes control chars', () => {
    expect(sanitizeUserInput('a\u0000b\u0007c')).toBe('abc')
  })
  it('replaces non-breaking spaces', () => {
    expect(sanitizeUserInput('a\u00A0b')).toBe('a b')
  })
  it('escapes HTML special chars', () => {
    expect(sanitizeUserInput('<b>&</b>')).toBe('&lt;b&gt;&amp;&lt;/b&gt;')
  })
})
