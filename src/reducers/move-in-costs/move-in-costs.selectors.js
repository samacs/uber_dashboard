import { createSelector } from 'reselect'

export const selectMoveInCostsState = state => state.moveInCosts

export const selectForm = createSelector(
  [selectMoveInCostsState],
  state => state.form,
)

export const selectIsRequesting = createSelector(
  [selectMoveInCostsState],
  state => state.isRequesting,
)

export const selectError = createSelector(
  [selectMoveInCostsState],
  state => state.error,
)

export const selectResponse = createSelector(
  [selectMoveInCostsState],
  state => state.response,
)

export const selectMoveInCosts = createSelector(
  [selectMoveInCostsState],
  state => state.moveInCosts,
)

export const selectUseInsurancePlans = createSelector(
  [selectMoveInCostsState],
  state => state.useInsurancePlans,
)

export const selectTotal = createSelector(
  [selectMoveInCostsState],
  state => state.total,
)

export const selectStartDate = createSelector(
  [selectMoveInCostsState],
  state => state.startDate,
)

export const selectEndDate = createSelector(
  [selectMoveInCostsState],
  state => state.endDate,
)
