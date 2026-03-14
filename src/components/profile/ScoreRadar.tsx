import { useMemo } from 'react'
import { DOMAIN_BY_ID } from '../../config/taxonomy'
import type { DomainScore } from '../../types/reputation'
import '../styles/score-radar.css'

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

interface ScoreRadarProps {
  domains: DomainScore[]
  size?: number
  onDomainClick?: (domainId: string) => void
}

function polarToCartesian(
  cx: number,
  cy: number,
  r: number,
  angleDeg: number,
): { x: number; y: number } {
  const rad = ((angleDeg - 90) * Math.PI) / 180
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  }
}

function ScoreRadar({ domains, size = 300, onDomainClick }: ScoreRadarProps) {
  const cx = size / 2
  const cy = size / 2
  const maxRadius = size * 0.38
  const levels = [25, 50, 75, 100]
  const n = domains.length

  const polygon = useMemo(() => {
    if (n === 0) return ''
    const step = 360 / n
    return domains
      .map((d, i) => {
        const r = (d.score / 100) * maxRadius
        const { x, y } = polarToCartesian(cx, cy, r, i * step)
        return `${x},${y}`
      })
      .join(' ')
  }, [domains, n, cx, cy, maxRadius])

  if (n === 0) {
    return (
      <div className="score-radar score-radar--empty">
        <p className="score-radar__empty-text">
          Select domains and connect platforms to see your score radar
        </p>
      </div>
    )
  }

  const step = 360 / n

  return (
    <div className="score-radar">
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="score-radar__svg"
        width={size}
        height={size}
      >
        {/* Background rings */}
        {levels.map((level) => {
          const r = (level / 100) * maxRadius
          const points = Array.from({ length: n }, (_, i) => {
            const { x, y } = polarToCartesian(cx, cy, r, i * step)
            return `${x},${y}`
          }).join(' ')
          return (
            <polygon
              key={level}
              points={points}
              className="score-radar__ring"
              fill="none"
            />
          )
        })}

        {/* Axis lines */}
        {domains.map((_, i) => {
          const { x, y } = polarToCartesian(cx, cy, maxRadius, i * step)
          return (
            <line
              key={i}
              x1={cx}
              y1={cy}
              x2={x}
              y2={y}
              className="score-radar__axis"
            />
          )
        })}

        {/* Score polygon */}
        <polygon
          points={polygon}
          className="score-radar__polygon"
        />
        <polygon
          points={polygon}
          className="score-radar__polygon-stroke"
          fill="none"
        />

        {/* Score dots */}
        {domains.map((d, i) => {
          const r = (d.score / 100) * maxRadius
          const { x, y } = polarToCartesian(cx, cy, r, i * step)
          return (
            <circle
              key={d.domainId}
              cx={x}
              cy={y}
              r={4}
              className="score-radar__dot"
            />
          )
        })}
      </svg>

      {/* Labels outside SVG for better text rendering */}
      <div className="score-radar__labels" style={{ width: size, height: size }}>
        {domains.map((d, i) => {
          const labelR = maxRadius + 30
          const { x, y } = polarToCartesian(cx, cy, labelR, i * step)
          const domain = DOMAIN_BY_ID.get(d.domainId)
          return (
            <button
              key={d.domainId}
              className="score-radar__label"
              style={{
                left: x,
                top: y,
                transform: 'translate(-50%, -50%)',
              }}
              onClick={() => onDomainClick?.(d.domainId)}
            >
              <span className="score-radar__label-icon">
                {DOMAIN_ICONS[d.domainId] || '📌'}
              </span>
              <span className="score-radar__label-score">{d.score}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default ScoreRadar
