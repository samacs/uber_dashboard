import { createSelector } from 'reselect'

export const selectPusherState = state => state.pusher

export const selectShowSpinner = createSelector(
  [selectPusherState],
  state => state.showSpinner,
)
