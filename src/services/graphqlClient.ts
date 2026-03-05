import { GRAPHQL_URL } from '../config'
import type { GraphQLResponse } from '../types'

const MAX_RETRIES = 3
const INITIAL_RETRY_DELAY_MS = 1000

export async function graphqlQuery<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  let lastError: Error | null = null

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    if (attempt > 0) {
      const delay = INITIAL_RETRY_DELAY_MS * Math.pow(2, attempt - 1)
      console.warn(`[GraphQL] Retry ${attempt}/${MAX_RETRIES} after ${delay}ms...`)
      await new Promise((r) => setTimeout(r, delay))
    }

    try {
      const response = await fetch(GRAPHQL_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables }),
      })

      if (response.status === 429) {
        lastError = new Error('GraphQL rate limited (429)')
        continue
      }

      if (!response.ok) {
        throw new Error(`GraphQL HTTP error: ${response.status}`)
      }

      const json: GraphQLResponse<T> = await response.json()

      if (json.errors) {
        throw new Error(`GraphQL error: ${json.errors[0].message}`)
      }

      return json.data as T
    } catch (err) {
      lastError = err as Error
      if (!(err as Error).message.includes('429')) throw err
    }
  }

  throw lastError || new Error('GraphQL request failed after retries')
}
