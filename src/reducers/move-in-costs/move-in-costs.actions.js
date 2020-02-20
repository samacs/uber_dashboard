import {
  MOVE_IN_COSTS_FORM_FIELD_CHANGED,
  MOVE_IN_COSTS_REQUEST,
  MOVE_IN_COSTS_FAILURE,
  MOVE_IN_COSTS_SUCCESS,
  MOVE_IN_COSTS_SET_USE_INSURANCE_PLANS,
} from './move-in-costs.constants'

export const moveInCostsFormFieldChanged = (field, value) => ({
  type: MOVE_IN_COSTS_FORM_FIELD_CHANGED,
  payload: { field, value },
})

export const moveInCostsRequest = params => ({
  type: MOVE_IN_COSTS_REQUEST,
  payload: params,
})

export const moveInCostsFailure = error => ({
  type: MOVE_IN_COSTS_FAILURE,
  payload: error,
})

export const moveInCostsSuccess = response => ({
  type: MOVE_IN_COSTS_SUCCESS,
  payload: response,
})

export const moveInCostsSetUseInsurancePlans = useOrNot => ({
  type: MOVE_IN_COSTS_SET_USE_INSURANCE_PLANS,
  payload: useOrNot,
})
