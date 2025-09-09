type Severity = 'info' | 'warn' | 'error' | 'fatal'

type Domain = 'FILE_SYSTEM_ADAPTER' | 'SOURCE_SCAN_ENGINE'

type Code =
  | 'DIRECTORY_NOT_FOUND'
  | 'FILE_COPY_FAILED'
  | 'FILE_HASH_FAILED'
  | 'FILE_MOVE_FAILED'
  | 'FILE_MOVE_FALLBACK_FAILED'

/**
 * Options used to construct an {@link AppError}.
 *
 * @property code - Machine-readable error code (unique identifier, e.g. `FS_READ_FAILED`).
 * @property domain - The application domain where the error occurred.
 * @property severity - Optional severity level. Defaults to `"error"`.
 * @property message - Technical description of the error, intended for logs.
 * @property userMessage - Optional user-facing message (safe, human-friendly).
 * @property meta - Optional contextual metadata (non-sensitive) to help with debugging.
 * @property cause - Optional original error or value that triggered this error (error chaining).
 */
type Options = {
  code: Code
  domain: Domain
  severity?: Severity
  message?: string
  userMessage?: string
  meta?: Record<string, unknown>
  cause?: unknown
}

export class AppError extends Error {
  code: string
  domain: Domain
  severity: Severity
  userMessage?: string
  meta?: Record<string, unknown>
  override cause?: unknown

  constructor(options: Options) {
    super(options.message ?? options.code, { cause: options.cause })
    this.code = options.code
    this.domain = options.domain
    this.severity = options.severity ?? 'error'
    this.userMessage = options.userMessage
    this.meta = options.meta
    Object.setPrototypeOf(this, new.target.prototype)
  }

  toJSON = (): Record<string, unknown> => ({
    code: this.code,
    domain: this.domain,
    severity: this.severity,
    userMessage: this.userMessage,
    meta: this.meta
  })
}

/**
 * Converts any unknown error into an {@link AppError}.
 *
 * - If the input is already an {@link AppError}, it is returned as-is.
 * - Otherwise, it wraps the input into a new {@link AppError} using a provided hint.
 *
 * @param error - The original error or unknown value to wrap.
 * @param hint - Partial properties to enrich the created {@link AppError}, must include `code` and `domain`.
 * @returns An {@link AppError} instance.
 */
export const toAppError = (
  error: unknown,
  options: Partial<AppError> & { code: Code; domain: Domain }
): AppError =>
  error instanceof AppError
    ? error
    : new AppError({ ...options, message: (error as Error)?.message, cause: error })
