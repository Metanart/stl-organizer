import { escapeHTML } from './escapeHTML'
import { normalizeUnicode } from './normalizeUnicode'
import { normalizeWhitespace } from './normalizeWhitespace'
import { removeControlChars } from './removeControlChars'
import { replaceNonBreakingSpaces } from './replaceNonBreakingSpaces'

export function sanitizeUserInput(str: string): string {
  if (!str) return ''

  return normalizeWhitespace(
    escapeHTML(replaceNonBreakingSpaces(removeControlChars(normalizeUnicode(str))))
  )
}
