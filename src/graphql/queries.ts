export const GET_ACCOUNT_LABELS = `
  query GetAccountLabels($ids: [String!]!) {
    accounts(where: { id: { _in: $ids } }) {
      id
      label
      image
      atom {
        label
        image
      }
    }
  }
`

export const GET_TRENDING_BY_PREDICATE = `
  query GetTrendingByPredicate($predicateId: String!, $limit: Int!) {
    triples(
      where: { predicate_id: { _eq: $predicateId } }
      order_by: [{ positions_aggregate: { count: desc } }, { created_at: desc }]
      limit: $limit
    ) {
      object {
        label
        value { thing { url } }
      }
      all_positions: positions(where: { shares: { _gt: "0" } }) {
        account { id }
      }
    }
  }
`

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
