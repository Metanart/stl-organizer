import { describe, expect, it } from 'vitest'

import { replaceNonBreakingSpaces } from './replaceNonBreakingSpaces'

describe('replaceNonBreakingSpaces', () => {
  it('replaces non-breaking spaces with normal spaces', () => {
    expect(replaceNonBreakingSpaces('a\u00A0b')).toBe('a b')
  })
  it('returns the same string if no non-breaking spaces', () => {
    expect(replaceNonBreakingSpaces('abc')).toBe('abc')
  })
})
