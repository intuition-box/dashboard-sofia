import '../styles/share-modal.css'

interface ShareProfileModalProps {
  isOpen: boolean
  onClose: () => void
  shareUrl: string | null
  ogImageUrl: string
  isLoading: boolean
  error: string | null
  onCopyLink: () => void
  onShareOnX: () => void
  copied: boolean
}

function ShareProfileModal({
  isOpen,
  onClose,
  shareUrl,
  ogImageUrl,
  isLoading,
  error,
  onCopyLink,
  onShareOnX,
  copied,
}: ShareProfileModalProps) {
  if (!isOpen) return null

  return (
    <div className="share-modal__backdrop" onClick={onClose}>
      <div
        className="share-modal__card"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="share-modal__header">
          <h3 className="share-modal__title">Share your Profile</h3>
          <button className="share-modal__close" onClick={onClose}>
            &times;
          </button>
        </div>

        <div className="share-modal__preview">
          <img
            src={ogImageUrl}
            alt="Profile preview"
            className="share-modal__preview-img"
          />
        </div>

        {error && (
          <p className="share-modal__error">{error}</p>
        )}

        <div className="share-modal__actions">
          <button
            className="share-modal__btn share-modal__btn--copy"
            onClick={onCopyLink}
            disabled={isLoading || !shareUrl}
          >
            {copied ? 'Copied!' : isLoading ? 'Creating link...' : 'Copy Link'}
          </button>
          <button
            className="share-modal__btn share-modal__btn--x"
            onClick={onShareOnX}
            disabled={isLoading || !shareUrl}
          >
            Share on X
          </button>
        </div>
      </div>
    </div>
  )
}

export default ShareProfileModal
