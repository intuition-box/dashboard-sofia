interface ProfileHeaderProps {
  walletAddress: string
  ensName?: string
  avatar?: string
  stats: { label: string; value: string }[]
  onShare?: () => void
  sharing?: boolean
}

function ProfileHeader({
  walletAddress,
  ensName,
  avatar,
  stats,
  onShare,
  sharing,
}: ProfileHeaderProps) {
  const displayName = ensName || walletAddress.slice(0, 6) + '...' + walletAddress.slice(-4)
  const initials = (ensName || walletAddress).slice(0, 2).toUpperCase()

  return (
    <div className="profile-header">
      {avatar ? (
        <img
          className="profile-header__avatar"
          src={avatar}
          alt={displayName}
        />
      ) : (
        <div className="profile-header__avatar--placeholder">
          {initials}
        </div>
      )}
      <div className="profile-header__info">
        <h1 className="profile-header__name">{displayName}</h1>
        {ensName && (
          <p className="profile-header__address">
            {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
          </p>
        )}
      </div>
      <div className="profile-header__stats">
        {stats.map((stat) => (
          <div key={stat.label} className="profile-header__stat">
            <div className="profile-header__stat-value">{stat.value}</div>
            <div className="profile-header__stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
      {onShare && (
        <button
          className="profile-header__share-btn"
          onClick={onShare}
          disabled={sharing}
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          {sharing ? 'Sharing...' : 'Share'}
        </button>
      )}
    </div>
  )
}

export default ProfileHeader
