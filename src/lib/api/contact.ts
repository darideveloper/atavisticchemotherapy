export interface ContactFormValues {
  name: string
  surname: string
  email: string
  phone: string
  preferredDay: string
  preferredTime: string
  message: string
}

export type ContactErrorKind = 'configuration' | 'http' | 'rejected' | 'timeout' | 'network' | 'aborted' | 'invalid-response'

export class ContactFormError extends Error {
  constructor(public readonly kind: ContactErrorKind, public readonly status?: number) {
    super(kind)
    this.name = 'ContactFormError'
  }
}

export interface ContactServiceConfig {
  endpoint?: string
  user?: string
  apiKey?: string
}

const browserConfig: ContactServiceConfig = {
  endpoint: import.meta.env?.PUBLIC_CONTACT_FORM_ENDPOINT,
  user: import.meta.env?.PUBLIC_CONTACT_FORM_USER,
  apiKey: import.meta.env?.PUBLIC_CONTACT_FORM_API_KEY,
}

export async function submitContactForm(
  values: ContactFormValues,
  domain: string,
  config: ContactServiceConfig = browserConfig,
  request: typeof fetch = fetch,
  timeoutMs = 30_000,
): Promise<void> {
  if (!config.endpoint || !config.user || !config.apiKey) {
    throw new ContactFormError('configuration')
  }

  let response: Response
  try {
    response = await request(config.endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: config.apiKey,
        user: config.user,
        domain,
        ...values,
      }),
      signal: AbortSignal.timeout(timeoutMs),
    })
  } catch (error) {
    if (error instanceof DOMException && error.name === 'TimeoutError') {
      throw new ContactFormError('timeout')
    }
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new ContactFormError('aborted')
    }
    throw new ContactFormError('network')
  }

  if (!response.ok) {
    throw new ContactFormError('http', response.status)
  }

  if (response.status === 204) return

  let rawBody: string
  try {
    rawBody = await response.text()
  } catch {
    throw new ContactFormError('invalid-response')
  }

  if (!rawBody.trim()) return
  const declaredJson = response.headers.get('content-type')?.toLowerCase().includes('json') ?? false
  if (!declaredJson && !/^[{[]/.test(rawBody.trim())) return

  let result: unknown
  try {
    result = JSON.parse(rawBody)
  } catch {
    throw new ContactFormError('invalid-response')
  }

  if (!result || typeof result !== 'object' || Array.isArray(result)) {
    throw new ContactFormError('invalid-response')
  }

  const body = result as { success?: unknown; ok?: unknown }
  if (body.success === false || body.ok === false) {
    throw new ContactFormError('rejected', response.status)
  }
}
