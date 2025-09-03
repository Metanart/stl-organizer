/* eslint-disable @typescript-eslint/no-explicit-any */
import { afterEach, describe, expect, it, vi } from 'vitest'

import * as osModule from '../platform/isWindows'

import { isValidPath } from './isValidPath'

describe('isValidPath', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('returns false for empty or non-string', () => {
    expect(isValidPath('')).toBe(false)
    expect(isValidPath(null as any)).toBe(false)
  })

  it('validates unix absolute path', () => {
    vi.spyOn(osModule, 'isWindows', 'get').mockReturnValue(false)
    expect(isValidPath('/usr/bin')).toBe(true)
  })

  it('validates windows absolute path', () => {
    vi.spyOn(osModule, 'isWindows', 'get').mockReturnValue(true)
    expect(isValidPath('C:\\Users\\Test')).toBe(true)
  })

  it('returns false for reserved windows names', () => {
    vi.spyOn(osModule, 'isWindows', 'get').mockReturnValue(true)
    expect(isValidPath('C:\\Users\\CON')).toBe(false)
  })
})
