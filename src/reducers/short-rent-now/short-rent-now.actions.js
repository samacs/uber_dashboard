import {
  SHORT_RENT_NOW_FORM_FIELD_CHANGED,
  SHORT_RENT_NOW_REQUEST,
  SHORT_RENT_NOW_SUCCESS,
  SHORT_RENT_NOW_FAILURE,
  SHORT_RENT_NOW_VENDOR_LEAD_REQUEST,
  SHORT_RENT_NOW_VENDOR_LEAD_SUCCESS,
  SHORT_RENT_NOW_VENDOR_LEAD_FAILURE,
} from './short-rent-now.constants'

export const shortRentNowFormFieldChanged = (field, value) => ({
  type: SHORT_RENT_NOW_FORM_FIELD_CHANGED,
  payload: { field, value },
})

export const shortRentNowRequest = params => ({
  type: SHORT_RENT_NOW_REQUEST,
  payload: params,
})

export const shortRentNowSuccess = response => ({
  type: SHORT_RENT_NOW_SUCCESS,
  payload: response,
})

export const shortRentNowFailure = error => ({
  type: SHORT_RENT_NOW_FAILURE,
  payload: error,
})

export const shortRentNowVendorLeadRequest = id => ({
  type: SHORT_RENT_NOW_VENDOR_LEAD_REQUEST,
  payload: id,
})

export const shortRentNowVendorLeadSuccess = vendorLead => ({
  type: SHORT_RENT_NOW_VENDOR_LEAD_SUCCESS,
  payload: vendorLead,
})

export const shortRentNowVendorLeadFailure = error => ({
  type: SHORT_RENT_NOW_VENDOR_LEAD_FAILURE,
  payload: error,
})
