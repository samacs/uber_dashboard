import { createSelector } from 'reselect'

export const selectUpdateTenant = state => state.updateTenant

export const selectForm = createSelector(
  [selectUpdateTenant],
  state => state.form,
)

export const selectIsRequesting = createSelector(
  [selectUpdateTenant],
  state => state.isRequesting,
)

export const selectAlternateContact = createSelector(
  [selectUpdateTenant],
  state => state.alternateContact,
)

export const selectBusinessStorage = createSelector(
  [selectUpdateTenant],
  state => state.businessStorage,
)

export const selectMilitaryMember = createSelector(
  [selectUpdateTenant],
  state => state.militaryMember,
)

export const selectVehicleStorage = createSelector(
  [selectUpdateTenant],
  state => state.vehicleStorage,
)

export const selectLeadForm = createSelector(
  [selectUpdateTenant],
  state => state.leadForm,
)
