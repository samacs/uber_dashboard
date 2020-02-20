import {
  RENT_NOW_AFTER_FORM_FIELD_CHANGED,
  RENT_NOW_AFTER_REQUEST,
  RENT_NOW_AFTER_SUCCESS,
  RENT_NOW_AFTER_FAILURE,
} from './rent-now-after.constants'

export const rentNowAfterFormFieldChanged = (field, value) => ({
  type: RENT_NOW_AFTER_FORM_FIELD_CHANGED,
  payload: { field, value },
})

export const rentNowAfterRequest = params => ({
  type: RENT_NOW_AFTER_REQUEST,
  payload: params,
})

export const rentNowAfterSuccess = response => ({
  type: RENT_NOW_AFTER_SUCCESS,
  payload: response,
})

export const rentNowAfterFailure = error => ({
  type: RENT_NOW_AFTER_FAILURE,
  payload: error,
})
