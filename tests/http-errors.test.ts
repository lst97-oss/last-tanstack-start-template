import { describe, expect, test } from 'bun:test'

import { HttpError, toHttpError } from '@/server/http/errors'

describe('HttpError', () => {
  test('4xx exposes message by default', () => {
    const err = new HttpError(400, 'BAD_REQUEST', 'bad input')
    expect(err.status).toBe(400)
    expect(err.code).toBe('BAD_REQUEST')
    expect(err.message).toBe('bad input')
    expect(err.expose).toBe(true)
  })

  test('500 hides message by default', () => {
    const err = new HttpError(500, 'INTERNAL_ERROR', 'secret detail')
    expect(err.expose).toBe(false)
  })

  test('explicit expose overrides default', () => {
    const err = new HttpError(500, 'INTERNAL_ERROR', 'shown', { expose: true })
    expect(err.expose).toBe(true)
  })
})

describe('toHttpError', () => {
  test('passes HttpError through by identity', () => {
    const err = new HttpError(404, 'NOT_FOUND', 'missing')
    expect(toHttpError(err)).toBe(err)
  })

  test('maps unknown Error to 500 INTERNAL_ERROR without leaking message on wire contract', () => {
    const mapped = toHttpError(new Error('db password=secret'))
    expect(mapped.status).toBe(500)
    expect(mapped.code).toBe('INTERNAL_ERROR')
    expect(mapped.expose).toBe(false)
  })

  test('maps non-Error input to 500', () => {
    const mapped = toHttpError('boom')
    expect(mapped.status).toBe(500)
    expect(mapped.code).toBe('INTERNAL_ERROR')
  })
})
