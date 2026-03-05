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

// ── Queries ──

export const GET_SEASON_POOL_POSITIONS = `
  query GetSeasonPoolPositions($termId: String!, $curveId: numeric!) {
    vaults(where: { term_id: { _eq: $termId }, curve_id: { _eq: $curveId } }) {
      current_share_price
      total_shares
      total_assets
      position_count
      positions(order_by: { shares: desc }) {
        account_id
        shares
        total_deposit_assets_after_total_fees
        total_redeem_assets_for_receiver
      }
    }
  }
`
