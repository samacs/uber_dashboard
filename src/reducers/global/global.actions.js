import {
  GLOBAL_FORM_FIELD_CHANGED,
  GLOBAL_SET_ACTIVE_TAB,
  GLOBAL_ENCRYPT_WAITING_ID,
} from './global.constants'

export const globalFormFieldChanged = (field, value) => ({
  type: GLOBAL_FORM_FIELD_CHANGED,
  payload: { field, value },
})

export const globalSetActiveTab = tabName => ({
  type: GLOBAL_SET_ACTIVE_TAB,
  payload: tabName,
})

export const globalEncryptWaitingId = () => ({
  type: GLOBAL_ENCRYPT_WAITING_ID,
})
