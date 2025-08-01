/* eslint-disable @typescript-eslint/no-explicit-any */
import { afterEach, describe, expect, it, vi } from 'vitest'

import * as osModule from '../os/isWindows'

import { isPathValid } from './isValidPath'

describe('isValidPath', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('returns false for empty or non-string', () => {
    expect(isPathValid('')).toBe(false)
    expect(isPathValid(null as any)).toBe(false)
  })

  it('validates unix absolute path', () => {
    vi.spyOn(osModule, 'isWindows', 'get').mockReturnValue(false)
    expect(isPathValid('/usr/bin')).toBe(true)
  })

  it('validates windows absolute path', () => {
    vi.spyOn(osModule, 'isWindows', 'get').mockReturnValue(true)
    expect(isPathValid('C:\\Users\\Test')).toBe(true)
  })

  it('returns false for reserved windows names', () => {
    vi.spyOn(osModule, 'isWindows', 'get').mockReturnValue(true)
    expect(isPathValid('C:\\Users\\CON')).toBe(false)
  })
})
