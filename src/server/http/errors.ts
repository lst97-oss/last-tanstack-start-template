export class HttpError extends Error {
  status: number
  code: string
  expose: boolean

  constructor(status: number, code: string, message: string, options?: { expose?: boolean }) {
    super(message)
    this.status = status
    this.code = code
    this.expose = options?.expose ?? status < 500
  }
}

export function toHttpError(error: unknown): HttpError {
  if (error instanceof HttpError) return error
  const message = error instanceof Error ? error.message : String(error)
  return new HttpError(500, 'INTERNAL_ERROR', message, { expose: false })
}
