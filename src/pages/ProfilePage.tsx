import { useState, useEffect } from 'react'
import { usePrivy } from '@privy-io/react-auth'
import { useNavigate } from 'react-router-dom'
import ProfileHeader from '../components/profile/ProfileHeader'
import OverviewTab from '../components/profile/OverviewTab'
import DomainSelector from '../components/profile/DomainSelector'
import NicheSelector from '../components/profile/NicheSelector'
import PlatformGrid from '../components/profile/PlatformGrid'
import ScoreView from '../components/profile/ScoreView'
import ShareProfileModal from '../components/profile/ShareProfileModal'
import { useDomainSelection } from '../hooks/useDomainSelection'
import { usePlatformConnections } from '../hooks/usePlatformConnections'
import { useReputationScores } from '../hooks/useReputationScores'
import { useUserProfile } from '../hooks/useUserProfile'
import { useShareProfile } from '../hooks/useShareProfile'
import '../components/styles/profile.css'

type View = 'overview' | 'interests' | 'niches' | 'platforms' | 'scores'

function ProfilePage() {
  const { authenticated, user } = usePrivy()
  const navigate = useNavigate()
  const [view, setView] = useState<View>('overview')
  const {
    selectedDomains,
    selectedNiches,
    toggleDomain,
    toggleNiche,
  } = useDomainSelection()
  const {
    connect,
    disconnect,
    getStatus,
    getConnection,
    startChallenge,
    verifyChallengeCode,
    connectedCount,
  } = usePlatformConnections()
  const scores = useReputationScores(getStatus, selectedDomains, selectedNiches)
  const { profile } = useUserProfile(
    authenticated && user?.wallet?.address ? user.wallet.address : undefined
  )
  const shareProfile = useShareProfile({
    walletAddress: user?.wallet?.address ?? '',
    domainScores: scores?.domains ?? [],
    connectedCount,
    totalCertifications: profile?.totalCertifications ?? 0,
  })

  useEffect(() => {
    if (!authenticated) {
      navigate('/')
    }
  }, [authenticated, navigate])

  if (!authenticated || !user?.wallet?.address) return null

  const walletAddress = user.wallet.address

  const headerStats = [
    { label: 'Platforms', value: String(connectedCount) },
    { label: 'Interests', value: String(selectedDomains.length) },
    { label: 'Niches', value: String(selectedNiches.length) },
  ]

  const handleNavigate = (target: string) => {
    if (target === 'domains') {
      setView('interests')
    } else {
      setView(target as View)
    }
  }

  return (
    <section className="profile-page">
      <div className="profile">
        <ProfileHeader
          walletAddress={walletAddress}
          stats={headerStats}
          onShare={shareProfile.openShareModal}
          sharing={shareProfile.isLoading}
        />
        <div className="profile-content">
          {view === 'overview' && (
            <OverviewTab
              selectedDomains={selectedDomains}
              selectedNiches={selectedNiches}
              getStatus={getStatus}
              domainScores={scores?.domains ?? []}
              onNavigate={handleNavigate}
              onToggleNiche={toggleNiche}
            />
          )}

          {view === 'interests' && (
            <DomainSelector
              selectedDomains={selectedDomains}
              onToggle={toggleDomain}
              onContinue={() => setView('niches')}
              onBack={() => setView('overview')}
            />
          )}

          {view === 'niches' && (
            <NicheSelector
              selectedDomains={selectedDomains}
              selectedNiches={selectedNiches}
              onToggleNiche={toggleNiche}
              onBack={() => setView('interests')}
              onContinue={() => setView('overview')}
            />
          )}

          {view === 'platforms' && (
            <PlatformGrid
              selectedNiches={selectedNiches}
              getStatus={getStatus}
              getConnection={getConnection}
              onConnect={connect}
              onDisconnect={disconnect}
              onStartChallenge={startChallenge}
              onVerifyChallenge={verifyChallengeCode}
              onBack={() => setView('overview')}
            />
          )}

          {view === 'scores' && (
            <ScoreView
              selectedDomains={selectedDomains}
              selectedNiches={selectedNiches}
              getStatus={getStatus}
              onBack={() => setView('overview')}
            />
          )}
        </div>
      </div>
      <ShareProfileModal
        isOpen={shareProfile.isModalOpen}
        onClose={shareProfile.closeShareModal}
        shareUrl={shareProfile.shareUrl}
        ogImageUrl={shareProfile.ogImageUrl}
        isLoading={shareProfile.isLoading}
        error={shareProfile.error}
        onCopyLink={shareProfile.handleCopyLink}
        onShareOnX={shareProfile.handleShareOnX}
        copied={shareProfile.copied}
      />
    </section>
  )
}

export default ProfilePage
