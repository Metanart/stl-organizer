import { describe, expect, it } from 'vitest'

import { removeControlChars } from './removeControlChars'

describe('removeControlChars', () => {
  it('removes ASCII control characters', () => {
    expect(removeControlChars('a\u0000b\u001Fc')).toBe('abc')
  })
  it('returns the same string if no control chars', () => {
    expect(removeControlChars('hello')).toBe('hello')
  })
})
