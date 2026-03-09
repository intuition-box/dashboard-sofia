// ── GraphQL Response Types ──

export interface VaultPositionRaw {
  account_id: string
  shares: string
  total_deposit_assets_after_total_fees: string
  total_redeem_assets_for_receiver: string
}

export interface VaultRaw {
  current_share_price: string
  total_shares: string
  total_assets: string
  position_count: number
  positions: VaultPositionRaw[]
}

export interface GetSeasonPoolPositionsResponse {
  vaults: VaultRaw[]
}

// ── Account Labels Response Types ──

export interface AccountResult {
  id: string
  label?: string | null
  image?: string | null
  atom?: { label?: string | null; image?: string | null } | null
}

export interface GetAccountLabelsResponse {
  accounts: AccountResult[]
}

// ── Trending Response Types ──

export interface TrendingTripleRaw {
  object: {
    label: string
    value?: { thing?: { url?: string } }
  }
  all_positions: Array<{ account: { id: string } }>
}

export interface GetTrendingByPredicateResponse {
  triples: TrendingTripleRaw[]
}
