import { useState, useEffect } from 'react'
import { usePrivy } from '@privy-io/react-auth'
import { useNavigate } from 'react-router-dom'
import ProfileHeader from '../components/profile/ProfileHeader'
import ProfileTabs from '../components/profile/ProfileTabs'
import OverviewTab from '../components/profile/OverviewTab'
import DomainSelector from '../components/profile/DomainSelector'
import NicheSelector from '../components/profile/NicheSelector'
import PlatformGrid from '../components/profile/PlatformGrid'
import ScoreView from '../components/profile/ScoreView'
import { useDomainSelection } from '../hooks/useDomainSelection'
import { usePlatformConnections } from '../hooks/usePlatformConnections'
import { useReputationScores } from '../hooks/useReputationScores'
import { useUserProfile } from '../hooks/useUserProfile'
import type { ProfileTab } from '../types/profile'
import '../components/styles/profile.css'

type DomainStep = 'domains' | 'niches'

function ProfilePage() {
  const { authenticated, user } = usePrivy()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<ProfileTab>('overview')
  const [domainStep, setDomainStep] = useState<DomainStep>('domains')
  const {
    selectedDomains,
    selectedNiches,
    toggleDomain,
    toggleNiche,
    maxDomains,
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

  useEffect(() => {
    if (!authenticated) {
      navigate('/')
    }
  }, [authenticated, navigate])

  if (!authenticated || !user?.wallet?.address) return null

  const walletAddress = user.wallet.address

  const headerStats = [
    { label: 'Platforms', value: String(connectedCount) },
    { label: 'Domains', value: String(selectedDomains.length) },
    { label: 'Niches', value: String(selectedNiches.length) },
  ]

  const handleTabChange = (tab: ProfileTab) => {
    setActiveTab(tab)
    if (tab === 'domains') setDomainStep('domains')
  }

  return (
    <section className="profile-page">
      <div className="profile">
        <ProfileHeader
          walletAddress={walletAddress}
          stats={headerStats}
        />
        <ProfileTabs
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
        <div className="profile-content">
          {activeTab === 'overview' && (
            <OverviewTab
              selectedDomains={selectedDomains}
              selectedNiches={selectedNiches}
              getStatus={getStatus}
              domainScores={scores?.domains ?? []}
              recentPositions={profile?.positions}
              onNavigate={(tab) => handleTabChange(tab as ProfileTab)}
              onToggleNiche={toggleNiche}
            />
          )}

          {activeTab === 'domains' && domainStep === 'domains' && (
            <DomainSelector
              selectedDomains={selectedDomains}
              onToggle={toggleDomain}
              onContinue={() => setDomainStep('niches')}
              maxSelection={maxDomains}
            />
          )}

          {activeTab === 'domains' && domainStep === 'niches' && (
            <NicheSelector
              selectedDomains={selectedDomains}
              selectedNiches={selectedNiches}
              onToggleNiche={toggleNiche}
              onBack={() => setDomainStep('domains')}
              onContinue={() => setActiveTab('platforms')}
            />
          )}

          {activeTab === 'platforms' && (
            <PlatformGrid
              selectedNiches={selectedNiches}
              getStatus={getStatus}
              getConnection={getConnection}
              onConnect={connect}
              onDisconnect={disconnect}
              onStartChallenge={startChallenge}
              onVerifyChallenge={verifyChallengeCode}
            />
          )}

          {activeTab === 'scores' && (
            <ScoreView
              selectedDomains={selectedDomains}
              selectedNiches={selectedNiches}
              getStatus={getStatus}
            />
          )}
        </div>
      </div>
    </section>
  )
}

export default ProfilePage
