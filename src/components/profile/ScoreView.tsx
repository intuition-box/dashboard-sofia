import { useState } from 'react'
import type { ConnectionStatus } from '../../types/reputation'
import { useReputationScores } from '../../hooks/useReputationScores'
import ScoreRadar from './ScoreRadar'
import ScoreDomainCard from './ScoreDomainCard'
import '../styles/score-radar.css'

interface ScoreViewProps {
  selectedDomains: string[]
  selectedNiches: string[]
  getStatus: (platformId: string) => ConnectionStatus
}

function ScoreView({ selectedDomains, selectedNiches, getStatus }: ScoreViewProps) {
  const profile = useReputationScores(getStatus, selectedDomains, selectedNiches)
  const [expandedDomain, setExpandedDomain] = useState<string | null>(null)

  if (!profile || profile.domains.length === 0) {
    return (
      <div className="profile-placeholder">
        <div className="profile-placeholder__icon">📊</div>
        <p className="profile-placeholder__text">
          Select domains and connect platforms to see your reputation scores
        </p>
      </div>
    )
  }

  const confidencePct = Math.round(profile.globalConfidence * 100)

  return (
    <div className="score-page">
      <div className="score-page__header">
        <h2 className="score-page__title">Reputation Scores</h2>
        <span className="score-page__confidence">
          Global confidence: <span>{confidencePct}%</span> · {profile.totalPlatforms} platform{profile.totalPlatforms !== 1 ? 's' : ''}
        </span>
      </div>

      <ScoreRadar
        domains={profile.domains}
        onDomainClick={(id) =>
          setExpandedDomain(expandedDomain === id ? null : id)
        }
      />

      <div className="score-page__cards">
        {profile.domains.map((ds) => (
          <ScoreDomainCard key={ds.domainId} domainScore={ds} />
        ))}
      </div>
    </div>
  )
}

export default ScoreView
