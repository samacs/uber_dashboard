import { createSelector } from 'reselect'

export const selectRentNowAfter = state => state.rentNowAfter

export const selectIsRequesting = createSelector(
  [selectRentNowAfter],
  state => state.isRequesting,
)

export const selectError = createSelector(
  [selectRentNowAfter],
  state => state.error,
)

export const selectResponse = createSelector(
  [selectRentNowAfter],
  state => state.response,
)

export const selectForm = createSelector(
  [selectRentNowAfter],
  state => state.form,
)

export const selectCreditCardInfo = createSelector([selectForm], form => {
  const {
    nameOnCard,
    creditCardType,
    creditCardNumber,
    creditCardCvvNumber,
    creditCardExpYear,
    creditCardExpMonth,
  } = form
  return {
    nameOnCard,
    creditCardType,
    creditCardNumber,
    creditCardCvvNumber,
    creditCardExpYear,
    creditCardExpMonth,
  }
})

export const selectAchInfo = createSelector([selectForm], form => {
  const { achRoutingNumber, achAccountNumber, achAccountType } = form
  return { achRoutingNumber, achAccountNumber, achAccountType }
})

export const selectBillingAddressInfo = createSelector([selectForm], form => {
  const {
    billingAddressLine1,
    billingAddressLine2,
    billingCity,
    billingZip,
    billingStateCode,
    billingAddressIndex,
  } = form
  return {
    billingAddressLine1,
    billingAddressLine2,
    billingCity,
    billingZip,
    billingStateCode,
    billingAddressIndex,
  }
})

export const selectLeadForm = createSelector(
  [selectRentNowAfter],
  state => state.leadForm,
)

export const selectCustomer = createSelector([selectForm], form => {
  const { firstName, lastName, email, phone } = form
  return { firstName, lastName, email, phone }
})
