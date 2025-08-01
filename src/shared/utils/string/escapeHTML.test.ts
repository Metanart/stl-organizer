import { describe, expect, it } from 'vitest'

import { escapeHTML } from './escapeHTML'

describe('escapeHTML', () => {
  it('escapes all special HTML chars', () => {
    expect(escapeHTML(`&<>'"`)).toBe('&amp;&lt;&gt;&apos;&quot;')
  })
  it('returns the same string if no special chars', () => {
    expect(escapeHTML('hello world')).toBe('hello world')
  })
  it('escapes mixed content', () => {
    expect(escapeHTML('5 > 3 & 2 < 4')).toBe('5 &gt; 3 &amp; 2 &lt; 4')
  })
})
