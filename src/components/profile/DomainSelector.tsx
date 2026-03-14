import { SOFIA_DOMAINS } from '../../config/taxonomy'
import '../styles/domain-selector.css'

// Map domain icon names to emoji
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

interface DomainSelectorProps {
  selectedDomains: string[]
  onToggle: (domainId: string) => void
  onContinue: () => void
  onBack?: () => void
}

function DomainSelector({
  selectedDomains,
  onToggle,
  onContinue,
  onBack,
}: DomainSelectorProps) {

  return (
    <div className="domain-selector">
      <div className="domain-selector__header">
        <h2 className="domain-selector__title">
          Select your domains
        </h2>
        <span className="domain-selector__count">
          <span>{selectedDomains.length}</span> selected
        </span>
      </div>

      <div className="domain-selector__grid">
        {SOFIA_DOMAINS.map((domain) => {
          const isSelected = selectedDomains.includes(domain.id)
          const nicheCount = domain.categories.reduce(
            (sum, c) => sum + c.niches.length, 0
          )

          return (
            <div
              key={domain.id}
              className={`domain-card${isSelected ? ' domain-card--selected' : ''}`}
              onClick={() => onToggle(domain.id)}
              style={{
                '--domain-color': domain.color,
              } as React.CSSProperties}
            >
              <div className="domain-card__check">
                <svg viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
              </div>
              <div className="domain-card__icon">
                {DOMAIN_ICONS[domain.id] || "📌"}
              </div>
              <div className="domain-card__label">
                {domain.label}
              </div>
              <div className="domain-card__meta">
                {domain.categories.length} categories · {nicheCount} niches
              </div>
            </div>
          )
        })}
      </div>

      <div className="domain-selector__actions">
        {onBack && (
          <button
            className="domain-selector__btn domain-selector__btn--secondary"
            onClick={onBack}
          >
            Back
          </button>
        )}
        <button
          className="domain-selector__btn domain-selector__btn--primary"
          onClick={onContinue}
          disabled={selectedDomains.length === 0}
        >
          Continue
        </button>
      </div>
    </div>
  )
}

export default DomainSelector
