import { useState } from 'react'
import type { PlatformConfig, ConnectionStatus, PlatformConnection } from '../../types/reputation'
import { needsUsernameInput } from '../../services/oauthService'
import { getCertifyUrl } from '../../utils/sofiaDetect'

function getPlatformUrl(platform: PlatformConfig): string {
  if (platform.apiBaseUrl) {
    try {
      const { protocol, hostname } = new URL(platform.apiBaseUrl)
      const base = hostname.replace(/^api\./, '').replace(/^www\./, '')
      return `${protocol}//${base}`
    } catch { /* fallback below */ }
  }
  return `https://${platform.id}.com`
}

const CONFIDENCE_LABELS: Record<string, string> = {
  very_high: "Very High",
  high: "High",
  medium: "Medium",
  low: "Low",
}

const STATUS_LABELS: Record<ConnectionStatus, string> = {
  disconnected: "Connect",
  connecting: "Connecting...",
  pending_verification: "Verify",
  connected: "Connected",
  error: "Retry",
  expired: "Reconnect",
}

interface PlatformCardProps {
  platform: PlatformConfig
  status: ConnectionStatus
  connection?: PlatformConnection
  onConnect: () => void
  onDisconnect: () => void
  onStartChallenge?: (username: string) => void
  onVerifyChallenge?: () => void
}

function PlatformCard({
  platform,
  status,
  connection,
  onConnect,
  onDisconnect,
  onStartChallenge,
  onVerifyChallenge,
}: PlatformCardProps) {
  const [usernameInput, setUsernameInput] = useState('')
  const [showInput, setShowInput] = useState(false)
  const requiresUsername = needsUsernameInput(platform.id)

  const btnClass =
    status === 'connected' ? 'platform-card__btn--connected' :
    status === 'connecting' ? 'platform-card__btn--connecting' :
    status === 'pending_verification' ? 'platform-card__btn--verify' :
    status === 'error' || status === 'expired' ? 'platform-card__btn--error' :
    'platform-card__btn--connect'

  const handleClick = () => {
    if (status === 'connected') {
      onDisconnect()
    } else if (status === 'pending_verification') {
      onVerifyChallenge?.()
    } else if (status === 'connecting') {
      return
    } else if (requiresUsername && !showInput) {
      setShowInput(true)
    } else {
      onConnect()
    }
  }

  const handleSubmitUsername = () => {
    if (usernameInput.trim()) {
      onStartChallenge?.(usernameInput.trim())
      setShowInput(false)
    }
  }

  return (
    <div className={`platform-card${status === 'connected' ? ' platform-card--connected' : ''}${status === 'pending_verification' ? ' platform-card--pending' : ''}`}>
      <div className="platform-card__top">
        <div
          className="platform-card__icon"
          style={{ background: platform.color + '22', color: platform.color }}
        >
          {platform.name.charAt(0).toUpperCase()}
        </div>
        <a
          className="platform-card__name"
          href={getPlatformUrl(platform)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
        >
          {platform.name}
        </a>
      </div>

      <div className="platform-card__meta">
        <span className="platform-card__tag">
          {platform.authType}
        </span>
        <span className="platform-card__tag platform-card__tag--confidence">
          {CONFIDENCE_LABELS[platform.signalConfidence]}
        </span>
        {platform.isFreeAccess && (
          <span className="platform-card__tag platform-card__tag--free">
            Free
          </span>
        )}
      </div>

      {/* Username input for public/api_key platforms */}
      {showInput && status === 'disconnected' && (
        <div className="platform-card__input-row">
          <input
            className="platform-card__input"
            type="text"
            placeholder={`Your ${platform.name} username`}
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmitUsername()}
          />
          <button
            className="platform-card__btn platform-card__btn--connect"
            onClick={handleSubmitUsername}
            disabled={!usernameInput.trim()}
          >
            Go
          </button>
        </div>
      )}

      {/* Challenge code display */}
      {status === 'pending_verification' && connection?.challengeCode && (
        <div className="platform-card__challenge">
          <p className="platform-card__challenge-text">
            Paste this code in your {platform.name} bio:
          </p>
          <code className="platform-card__challenge-code">
            {connection.challengeCode}
          </code>
        </div>
      )}

      {/* Error message */}
      {connection?.error && (
        <p className="platform-card__error">{connection.error}</p>
      )}

      {/* Action buttons */}
      {!showInput && (
        <div className="platform-card__actions">
          <button
            className={`platform-card__btn ${btnClass}`}
            onClick={handleClick}
          >
            {STATUS_LABELS[status]}
          </button>
          <a
            className="platform-card__btn platform-card__btn--certify"
            href={getCertifyUrl(getPlatformUrl(platform))}
            target="_blank"
            rel="noopener noreferrer"
          >
            Certify
          </a>
        </div>
      )}
    </div>
  )
}

export default PlatformCard
