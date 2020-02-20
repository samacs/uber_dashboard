import { createSelector } from 'reselect'

export const selectInsuranceData = state => state.insuranceData

export const selectForm = createSelector(
  [selectInsuranceData],
  state => state.form,
)

export const selectIsRequesting = createSelector(
  [selectInsuranceData],
  state => state.isRequesting,
)

export const selectError = createSelector(
  [selectInsuranceData],
  state => state.error,
)

export const selectResponse = createSelector(
  [selectInsuranceData],
  state => state.response,
)

export const selectInsurancePlans = createSelector(
  [selectInsuranceData],
  state => state.insurancePlans,
)

export const selectReservation = createSelector(
  [selectInsuranceData],
  state => state.reservation,
)

export const selectUnit = createSelector(
  [selectInsuranceData],
  state => state.unit,
)

export const selectCustomer = createSelector(
  [selectInsuranceData],
  state => state.customer,
)
