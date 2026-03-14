import { DOMAIN_BY_ID } from '../../config/taxonomy'
import type { DomainScore } from '../../types/reputation'

const DOMAIN_ICONS: Record<string, string> = {
  "tech-dev": "💻",
  "design-creative": "🎨",
  "music-audio": "🎵",
  "gaming": "🎮",
  "web3-crypto": "⛓️",
  "science": "🔬",
  "sport-health": "🏋️",
  "video-cinema": "📹",
  "entrepreneurship": "🚀",
  "performing-arts": "🎭",
  "nature-environment": "🌿",
  "food-lifestyle": "🍽️",
  "literature": "📚",
  "personal-dev": "🧠",
}

interface ScoreDomainCardProps {
  domainScore: DomainScore
}

function BreakdownBar({
  label,
  value,
  max,
  color,
}: {
  label: string
  value: number
  max: number
  color: string
}) {
  const pct = max > 0 ? Math.min(100, (value / max) * 100) : 0
  return (
    <div className="score-domain__bar-row">
      <span className="score-domain__bar-label">{label}</span>
      <div className="score-domain__bar-track">
        <div
          className="score-domain__bar-fill"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
      <span className="score-domain__bar-value">{value}</span>
    </div>
  )
}

function ScoreDomainCard({ domainScore }: ScoreDomainCardProps) {
  const domain = DOMAIN_BY_ID.get(domainScore.domainId)
  const icon = DOMAIN_ICONS[domainScore.domainId] || '📌'
  const confidencePct = Math.round(domainScore.confidence * 100)

  return (
    <div className="score-domain">
      <div className="score-domain__header">
        <span className="score-domain__icon">{icon}</span>
        <div className="score-domain__info">
          <span className="score-domain__name">
            {domain?.label || domainScore.domainId}
          </span>
          <span className="score-domain__meta">
            {domainScore.platformCount} platform{domainScore.platformCount !== 1 ? 's' : ''} · {confidencePct}% confidence
          </span>
        </div>
        <div className="score-domain__score">
          <span className="score-domain__score-value">{domainScore.score}</span>
          <span className="score-domain__score-max">/100</span>
        </div>
      </div>

      {domainScore.topNiches.length > 0 && (
        <div className="score-domain__niches">
          {domainScore.topNiches.map((niche) => {
            const nicheCategory = domain?.categories
              .flatMap((c) => c.niches)
              .find((n) => n.id === niche.nicheId)

            return (
              <div key={niche.nicheId} className="score-domain__niche">
                <div className="score-domain__niche-header">
                  <span className="score-domain__niche-name">
                    {nicheCategory?.label || niche.nicheId}
                  </span>
                  <span className="score-domain__niche-score">
                    {niche.score}
                  </span>
                </div>
                <div className="score-domain__breakdown">
                  <BreakdownBar label="Creation" value={niche.breakdown.creation} max={30} color="var(--color-primary)" />
                  <BreakdownBar label="Regularity" value={niche.breakdown.regularity} max={25} color="var(--color-success)" />
                  <BreakdownBar label="Community" value={niche.breakdown.community} max={20} color="var(--color-gold)" />
                  <BreakdownBar label="Monetization" value={niche.breakdown.monetization} max={15} color="var(--color-error)" />
                  <BreakdownBar label="Seniority" value={niche.breakdown.anciennete} max={10} color="var(--color-text-muted)" />
                </div>
              </div>
            )
          })}
        </div>
      )}

      {domainScore.topNiches.length === 0 && (
        <p className="score-domain__empty">
          Connect platforms to generate niche scores
        </p>
      )}
    </div>
  )
}

export default ScoreDomainCard
