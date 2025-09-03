import { escapeHTML } from '@shared/utils/html/escapeHTML'
import { normalizeUnicode } from '@shared/utils/text/normalizeUnicode'
import { normalizeWhitespace } from '@shared/utils/text/normalizeWhitespace'
import { removeControlChars } from '@shared/utils/text/removeControlChars'
import { replaceNonBreakingSpaces } from '@shared/utils/text/replaceNonBreakingSpaces'

export function sanitizeUserInput(str: string): string {
  if (!str) return ''

  return normalizeWhitespace(
    escapeHTML(replaceNonBreakingSpaces(removeControlChars(normalizeUnicode(str))))
  )
}
