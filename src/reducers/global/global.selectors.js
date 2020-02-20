import { createSelector } from 'reselect'

export const selectGlobal = state => state.global

export const selectForm = createSelector([selectGlobal], state => state.form)

export const selectLocationUrn = createSelector(
  [selectForm],
  form => form.locationUrn,
)

export const selectClientUrn = createSelector(
  [selectForm],
  form => form.clientUrn,
)

export const selectEncryptClientKey = createSelector(
  [selectForm],
  form => form.encryptClientKey,
)

export const selectWaitingId = createSelector(
  [selectForm],
  form => form.waitingId,
)

export const selectEncrypt = createSelector([selectForm], form => form.encrypt)

export const selectAb = createSelector([selectForm], form => form.ab)

export const selectEncryptedWaitingId = createSelector(
  [selectForm],
  form => form.encryptedWaitingId,
)

export const selectActiveTab = createSelector(
  [selectGlobal],
  state => state.activeTab,
)

export const selectLinks = createSelector([selectGlobal], state => state.links)

export const selectAccessToken = createSelector(
  [selectForm],
  form => form.accessToken,
)
