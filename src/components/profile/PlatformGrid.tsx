import { useState, useMemo } from 'react'
import {
  PLATFORM_CATALOG,
  getPlatformsByDomain,
  getPlatformsForOnboarding,
} from '../../config/platformCatalog'
import { DOMAIN_BY_ID } from '../../config/taxonomy'
import type { ConnectionStatus } from '../../types/reputation'
import PlatformCard from './PlatformCard'
import '../styles/platform-grid.css'

interface PlatformGridProps {
  selectedNiches: string[]
  getStatus: (platformId: string) => ConnectionStatus
  onConnect: (platformId: string) => void
  onDisconnect: (platformId: string) => void
  mode?: 'onboarding' | 'full'
}

function PlatformGrid({
  selectedNiches,
  getStatus,
  onConnect,
  onDisconnect,
  mode: initialMode = 'onboarding',
}: PlatformGridProps) {
  const [mode, setMode] = useState(initialMode)
  const [search, setSearch] = useState('')
  const [domainFilter, setDomainFilter] = useState<string | null>(null)

  const suggestedPlatforms = useMemo(
    () => getPlatformsForOnboarding(selectedNiches).slice(0, 8),
    [selectedNiches]
  )

  const filteredPlatforms = useMemo(() => {
    let platforms = mode === 'onboarding' && suggestedPlatforms.length > 0
      ? suggestedPlatforms
      : PLATFORM_CATALOG

    if (domainFilter) {
      platforms = getPlatformsByDomain(domainFilter).filter((p) =>
        platforms.some((fp) => fp.id === p.id)
      )
    }

    if (search.trim()) {
      const q = search.toLowerCase()
      platforms = platforms.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.id.toLowerCase().includes(q) ||
          p.targetDomains.some((d) => d.includes(q))
      )
    }

    return platforms
  }, [mode, suggestedPlatforms, domainFilter, search])

  // Group by domain
  const grouped = useMemo(() => {
    const groups = new Map<string, typeof filteredPlatforms>()
    for (const p of filteredPlatforms) {
      const domainId = p.targetDomains[0] || 'other'
      const existing = groups.get(domainId) || []
      existing.push(p)
      groups.set(domainId, existing)
    }
    return groups
  }, [filteredPlatforms])

  const uniqueDomains = useMemo(
    () => [...new Set(PLATFORM_CATALOG.flatMap((p) => p.targetDomains))],
    []
  )

  const connectedCount = PLATFORM_CATALOG.filter(
    (p) => getStatus(p.id) === 'connected'
  ).length

  return (
    <div className="platform-grid">
      <div className="platform-grid__header">
        <h2 className="platform-grid__title">
          {mode === 'onboarding' ? 'Suggested Platforms' : 'All Platforms'}
        </h2>
        <span className="platform-grid__count">
          <span>{connectedCount}</span> / {PLATFORM_CATALOG.length} connected
        </span>
      </div>

      {mode === 'full' && (
        <div className="platform-grid__filters">
          <input
            className="platform-grid__search"
            type="text"
            placeholder="Search platforms..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className={`platform-grid__filter-btn${!domainFilter ? ' platform-grid__filter-btn--active' : ''}`}
            onClick={() => setDomainFilter(null)}
          >
            All
          </button>
          {uniqueDomains.slice(0, 6).map((d) => {
            const domain = DOMAIN_BY_ID.get(d)
            return (
              <button
                key={d}
                className={`platform-grid__filter-btn${domainFilter === d ? ' platform-grid__filter-btn--active' : ''}`}
                onClick={() => setDomainFilter(domainFilter === d ? null : d)}
              >
                {domain?.label || d}
              </button>
            )
          })}
        </div>
      )}

      {[...grouped.entries()].map(([domainId, platforms]) => {
        const domain = DOMAIN_BY_ID.get(domainId)
        return (
          <div key={domainId} className="platform-group">
            <div className="platform-group__label">
              {domain?.label || domainId}
            </div>
            <div className="platform-group__items">
              {platforms.map((platform) => (
                <PlatformCard
                  key={platform.id}
                  platform={platform}
                  status={getStatus(platform.id)}
                  onConnect={() => onConnect(platform.id)}
                  onDisconnect={() => onDisconnect(platform.id)}
                />
              ))}
            </div>
          </div>
        )
      })}

      {mode === 'onboarding' && (
        <div className="platform-grid__toggle">
          <button
            className="platform-grid__toggle-btn"
            onClick={() => setMode('full')}
          >
            Show all {PLATFORM_CATALOG.length} platforms
          </button>
        </div>
      )}

      {mode === 'full' && filteredPlatforms.length === 0 && (
        <div className="profile-placeholder">
          <p className="profile-placeholder__text">
            No platforms match your search
          </p>
        </div>
      )}
    </div>
  )
}

export default PlatformGrid
