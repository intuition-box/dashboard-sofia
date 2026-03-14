import { useState } from 'react'
import { DOMAIN_BY_ID } from '../../config/taxonomy'
import { PLATFORM_CATALOG } from '../../config/platformCatalog'
import ScoreRadar from './ScoreRadar'
import type { ConnectionStatus, DomainScore } from '../../types/reputation'
import type { UserPosition } from '../../services/profileService'
import '../styles/overview-tab.css'

interface OverviewTabProps {
  selectedDomains: string[]
  selectedNiches: string[]
  getStatus: (platformId: string) => ConnectionStatus
  domainScores: DomainScore[]
  recentPositions?: UserPosition[]
  onNavigate: (tab: string) => void
  onToggleNiche: (nicheId: string) => void
}

function OverviewTab({
  selectedDomains,
  selectedNiches,
  getStatus,
  domainScores,
  recentPositions,
  onNavigate,
  onToggleNiche,
}: OverviewTabProps) {
  const connectedPlatforms = PLATFORM_CATALOG.filter(
    (p) => getStatus(p.id) === 'connected',
  )

  const [expandedDomain, setExpandedDomain] = useState<string | null>(null)

  const nichesByDomain = selectedDomains.map((domainId) => {
    const domain = DOMAIN_BY_ID.get(domainId)
    if (!domain) return null
    const activeNiches = domain.categories
      .flatMap((c) => c.niches)
      .filter((n) => selectedNiches.includes(n.id))
    return { domain, activeNiches, categories: domain.categories }
  }).filter(Boolean) as Array<{
    domain: { id: string; label: string; color: string }
    activeNiches: Array<{ id: string; label: string }>
    categories: Array<{
      id: string
      label: string
      niches: Array<{ id: string; label: string }>
    }>
  }>

  const hasSetup = selectedDomains.length > 0

  return (
    <div className="overview-tab">
      {/* CTA if nothing configured */}
      {!hasSetup && (
        <div className="profile-cta">
          <h2 className="profile-cta__title">Enrich your profile</h2>
          <p className="profile-cta__text">
            Select your domains of interest, connect your favorite platforms,
            and build your behavioral reputation across 103 platforms.
          </p>
          <button
            className="profile-cta__btn"
            onClick={() => onNavigate('domains')}
          >
            Get Started
          </button>
        </div>
      )}

      {hasSetup && (
        <>
          {/* Score Radar */}
          <section className="overview-tab__section">
            <div className="overview-tab__section-header">
              <h3 className="overview-tab__section-title">Score Global</h3>
              <button
                className="overview-tab__section-link"
                onClick={() => onNavigate('scores')}
              >
                Voir les details
              </button>
            </div>
            <div className="overview-tab__radar-wrap">
              <ScoreRadar
                domains={domainScores}
                size={260}
                onDomainClick={() => onNavigate('scores')}
              />
            </div>
          </section>

          {/* Selected Domains */}
          <section className="overview-tab__section">
            <div className="overview-tab__section-header">
              <h3 className="overview-tab__section-title">
                Domaines ({selectedDomains.length})
              </h3>
              <button
                className="overview-tab__section-link"
                onClick={() => onNavigate('domains')}
              >
                Modifier
              </button>
            </div>
            <div className="overview-tab__domain-list">
              {nichesByDomain.map(({ domain, activeNiches, categories }) => {
                const isExpanded = expandedDomain === domain.id
                return (
                  <div
                    key={domain.id}
                    className={`overview-tab__domain-card ${isExpanded ? 'overview-tab__domain-card--expanded' : ''}`}
                    style={{ borderColor: domain.color }}
                  >
                    <button
                      className="overview-tab__domain-header"
                      onClick={() =>
                        setExpandedDomain(isExpanded ? null : domain.id)
                      }
                    >
                      <span className="overview-tab__domain-name">
                        {domain.label}
                      </span>
                      <span className="overview-tab__domain-count">
                        {activeNiches.length} niches
                      </span>
                      <span
                        className={`overview-tab__domain-chevron ${isExpanded ? 'overview-tab__domain-chevron--open' : ''}`}
                      >
                        ›
                      </span>
                    </button>

                    {/* Collapsed: selected niches only */}
                    {!isExpanded && activeNiches.length > 0 && (
                      <div className="overview-tab__niche-tags">
                        {activeNiches.map((n) => (
                          <span key={n.id} className="overview-tab__niche-tag overview-tab__niche-tag--active">
                            {n.label}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Expanded: all categories + niches */}
                    {isExpanded && (
                      <div className="overview-tab__domain-detail">
                        {categories.map((cat) => (
                          <div key={cat.id} className="overview-tab__category">
                            <h4 className="overview-tab__category-title">
                              {cat.label}
                            </h4>
                            <div className="overview-tab__niche-tags">
                              {cat.niches.map((n) => (
                                <button
                                  key={n.id}
                                  className={`overview-tab__niche-tag overview-tab__niche-tag--btn ${selectedNiches.includes(n.id) ? 'overview-tab__niche-tag--active' : ''}`}
                                  onClick={() => onToggleNiche(n.id)}
                                >
                                  {n.label}
                                </button>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </section>

          {/* Connected Platforms */}
          <section className="overview-tab__section">
            <div className="overview-tab__section-header">
              <h3 className="overview-tab__section-title">
                Plateformes ({connectedPlatforms.length})
              </h3>
              <button
                className="overview-tab__section-link"
                onClick={() => onNavigate('platforms')}
              >
                Gerer
              </button>
            </div>
            {connectedPlatforms.length === 0 ? (
              <p className="overview-tab__empty">
                Aucune plateforme connectee.
                <button
                  className="overview-tab__empty-link"
                  onClick={() => onNavigate('platforms')}
                >
                  Connecter
                </button>
              </p>
            ) : (
              <div className="overview-tab__platform-list">
                {connectedPlatforms.slice(0, 12).map((p) => (
                  <div key={p.id} className="overview-tab__platform-chip">
                    <span
                      className="overview-tab__platform-dot"
                      style={{ background: p.color }}
                    />
                    <span className="overview-tab__platform-name">
                      {p.name}
                    </span>
                  </div>
                ))}
                {connectedPlatforms.length > 12 && (
                  <button
                    className="overview-tab__platform-chip overview-tab__platform-chip--more"
                    onClick={() => onNavigate('platforms')}
                  >
                    +{connectedPlatforms.length - 12}
                  </button>
                )}
              </div>
            )}
          </section>

          {/* Recent Activity */}
          <section className="overview-tab__section">
            <div className="overview-tab__section-header">
              <h3 className="overview-tab__section-title">Activite recente</h3>
            </div>
            {!recentPositions || recentPositions.length === 0 ? (
              <p className="overview-tab__empty">
                Aucune certification on-chain pour le moment.
              </p>
            ) : (
              <div className="overview-tab__activity-list">
                {recentPositions.slice(0, 8).map((pos, i) => (
                  <div key={i} className="overview-tab__activity-row">
                    <span className="overview-tab__activity-label">
                      {pos.isTriple
                        ? `${pos.predicateLabel} → ${pos.objectLabel}`
                        : pos.atomLabel || 'Atom'}
                    </span>
                    {pos.objectUrl && (
                      <a
                        href={pos.objectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="overview-tab__activity-link"
                      >
                        ↗
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </div>
  )
}

export default OverviewTab
