import { useState, useCallback, useEffect, useMemo } from 'react'
import type { PlatformConnection, ConnectionStatus } from '../types/reputation'

const STORAGE_KEY = 'sofia_platform_connections'

function loadFromStorage(): Map<string, PlatformConnection> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const arr: PlatformConnection[] = JSON.parse(raw)
      return new Map(arr.map((c) => [c.platformId, c]))
    }
  } catch {}
  return new Map()
}

function saveToStorage(connections: Map<string, PlatformConnection>) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify([...connections.values()])
  )
}

export function usePlatformConnections() {
  const [connections, setConnections] = useState<Map<string, PlatformConnection>>(loadFromStorage)

  useEffect(() => {
    saveToStorage(connections)
  }, [connections])

  const connect = useCallback((platformId: string) => {
    setConnections((prev) => {
      const next = new Map(prev)
      next.set(platformId, {
        platformId,
        status: 'connecting',
        connectedAt: Date.now(),
      })
      return next
    })
    // TODO: étape 8 — real OAuth flow via sofia-mastra
  }, [])

  const disconnect = useCallback((platformId: string) => {
    setConnections((prev) => {
      const next = new Map(prev)
      next.delete(platformId)
      return next
    })
  }, [])

  const getStatus = useCallback(
    (platformId: string): ConnectionStatus => {
      return connections.get(platformId)?.status ?? 'disconnected'
    },
    [connections]
  )

  const connectedCount = useMemo(
    () => [...connections.values()].filter((c) => c.status === 'connected').length,
    [connections]
  )

  return {
    connections,
    connect,
    disconnect,
    getStatus,
    connectedCount,
  }
}
