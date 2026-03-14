import type { PlatformConfig, ConnectionStatus } from '../../types/reputation'

const CONFIDENCE_LABELS: Record<string, string> = {
  very_high: "Very High",
  high: "High",
  medium: "Medium",
  low: "Low",
}

const STATUS_LABELS: Record<ConnectionStatus, string> = {
  disconnected: "Connect",
  connecting: "Connecting...",
  connected: "Connected",
  error: "Retry",
  expired: "Reconnect",
}

interface PlatformCardProps {
  platform: PlatformConfig
  status: ConnectionStatus
  onConnect: () => void
  onDisconnect: () => void
}

function PlatformCard({
  platform,
  status,
  onConnect,
  onDisconnect,
}: PlatformCardProps) {
  const btnClass =
    status === 'connected' ? 'platform-card__btn--connected' :
    status === 'connecting' ? 'platform-card__btn--connecting' :
    status === 'error' || status === 'expired' ? 'platform-card__btn--error' :
    'platform-card__btn--connect'

  const handleClick = () => {
    if (status === 'connected') {
      onDisconnect()
    } else if (status !== 'connecting') {
      onConnect()
    }
  }

  return (
    <div className={`platform-card${status === 'connected' ? ' platform-card--connected' : ''}`}>
      <div className="platform-card__top">
        <div
          className="platform-card__icon"
          style={{ background: platform.color + '22', color: platform.color }}
        >
          {platform.name.charAt(0).toUpperCase()}
        </div>
        <span className="platform-card__name">{platform.name}</span>
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
      <button
        className={`platform-card__btn ${btnClass}`}
        onClick={handleClick}
      >
        {STATUS_LABELS[status]}
      </button>
    </div>
  )
}

export default PlatformCard
