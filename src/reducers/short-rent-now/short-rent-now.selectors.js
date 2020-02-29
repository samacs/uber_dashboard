import { createSelector } from 'reselect'

export const selectShortRentNow = state => state.shortRentNow

export const selectLeadForm = createSelector(
  [selectShortRentNow],
  state => state.leadForm,
)

export const selectForm = createSelector(
  [selectShortRentNow],
  state => state.form,
)

export const selectIsRequesting = createSelector(
  [selectShortRentNow],
  state => state.isRequesting,
)

export const selectStrategyType = createSelector(
  [selectShortRentNow],
  state => state.strategyType,
)

export const selectAccessToken = createSelector(
  [selectShortRentNow],
  state => state.accessToken,
)

export const selectResponse = createSelector(
  [selectShortRentNow],
  state => state.response,
)

export const selectVendorLead = createSelector([selectResponse], response =>
  response ? response.vendorLead : null,
)
