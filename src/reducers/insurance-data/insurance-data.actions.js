import {
  INSURANCE_DATA_FORM_FIELD_CHANGED,
  INSURANCE_DATA_REQUEST,
  INSURANCE_DATA_FAILURE,
  INSURANCE_DATA_SUCCESS,
  INSURANCE_DATA_SET_CUSTOMER,
  INSURANCE_DATA_SET_PLANS,
  INSURANCE_DATA_SET_RESERVATION,
} from './insurance-data.constants'

export const insuranceDataFormFieldChanged = (field, value) => ({
  type: INSURANCE_DATA_FORM_FIELD_CHANGED,
  payload: { field, value },
})

export const insuranceDataRequest = params => ({
  type: INSURANCE_DATA_REQUEST,
  payload: params,
})

export const insuranceDataFailure = error => ({
  type: INSURANCE_DATA_FAILURE,
  payload: error,
})

export const insuranceDataSuccess = response => ({
  type: INSURANCE_DATA_SUCCESS,
  payload: response,
})

export const insuranceDataSetCustomer = customer => ({
  type: INSURANCE_DATA_SET_CUSTOMER,
  payload: customer,
})

export const insuranceDataSetPlans = plans => ({
  type: INSURANCE_DATA_SET_PLANS,
  payload: plans,
})

export const insuranceDataSetReservation = reservation => ({
  type: INSURANCE_DATA_SET_RESERVATION,
  payload: reservation,
})
