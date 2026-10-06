import assert from 'node:assert/strict'
import { test } from 'node:test'
import { ContactFormError, submitContactForm, type ContactFormValues } from '@/lib/api/contact'

const values: ContactFormValues = {
  name: 'Ana',
  surname: 'López',
  email: 'ana@example.com',
  phone: '5551234567',
  preferredDay: 'lunes',
  preferredTime: '10:00',
  message: 'Consulta',
}

const config = {
  endpoint: 'https://services.example.test/contact-form/',
  user: 'test-user',
  apiKey: 'test-key',
}

function response(status: number, body?: unknown) {
  if (body === undefined) return new Response(null, { status })
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

test('posts the complete payload and accepts 200, 201 and 204', async () => {
  for (const status of [200, 201, 204]) {
    let calls = 0
    const request = (async (_url: RequestInfo | URL, options?: RequestInit) => {
      calls++
      assert.equal(options?.method, 'POST')
      assert.deepEqual(JSON.parse(String(options?.body)), {
        api_key: config.apiKey,
        user: config.user,
        domain: 'atavisticchemotherapy.localhost',
        ...values,
      })
      return response(status)
    }) as typeof fetch
    await submitContactForm(values, 'atavisticchemotherapy.localhost', config, request)
    assert.equal(calls, 1)
  }
})

test('rejects HTTP errors, explicit failures and invalid JSON', async () => {
  const cases: Array<[Response, string]> = [
    [response(400), 'http'],
    [response(422), 'http'],
    [response(500), 'http'],
    [response(200, { success: false }), 'rejected'],
    [response(200, { ok: false }), 'rejected'],
    [new Response('{"success":false}', { status: 200 }), 'rejected'],
    [new Response('{', { status: 200, headers: { 'Content-Type': 'application/json' } }), 'invalid-response'],
  ]
  for (const [result, kind] of cases) {
    await assert.rejects(
      submitContactForm(values, 'atavisticchemotherapy.localhost', config, (async () => result) as typeof fetch),
      (error: unknown) => error instanceof ContactFormError && error.kind === kind,
    )
  }
})

test('reports missing configuration and transport failures', async () => {
  await assert.rejects(
    submitContactForm(values, 'atavisticchemotherapy.localhost', {}, (async () => response(200)) as typeof fetch),
    (error: unknown) => error instanceof ContactFormError && error.kind === 'configuration',
  )
  for (const [cause, kind] of [
    [new DOMException('Timed out', 'TimeoutError'), 'timeout'],
    [new TypeError('Offline'), 'network'],
  ] as const) {
    await assert.rejects(
      submitContactForm(values, 'atavisticchemotherapy.localhost', config, (async () => { throw cause }) as typeof fetch),
      (error: unknown) => error instanceof ContactFormError && error.kind === kind,
    )
  }
})
