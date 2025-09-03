import { describe, expect, it } from 'vitest'

import { normalizeWhitespace } from './normalizeWhitespace'

describe('normalizeWhitespace', () => {
  it('replaces newlines and tabs with spaces', () => {
    expect(normalizeWhitespace('a\nb\tc')).toBe('a b c')
  })
  it('reduces multiple spaces to one', () => {
    expect(normalizeWhitespace('a    b')).toBe('a b')
  })
  it('trims leading and trailing spaces', () => {
    expect(normalizeWhitespace('   a b   ')).toBe('a b')
  })
})
