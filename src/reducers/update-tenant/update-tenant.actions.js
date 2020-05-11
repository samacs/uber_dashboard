import {
  UPDATE_TENANT_REQUEST,
  UPDATE_TENANT_FORM_FIELD_CHANGED,
  UPDATE_TENANT_SUCCESS,
  UPDATE_TENANT_FAILURE,
  UPDATE_TENANT_SET_MILITARY_MEMBER,
  UPDATE_TENANT_SET_BUSINESS_STORAGE,
  UPDATE_TENANT_SET_ALTERNATE_CONTACT,
  UPDATE_TENANT_SET_VEHICLE_STORAGE,
} from './update-tenant.constants'

export const updateTenantFormFieldChanged = (field, value) => ({
  type: UPDATE_TENANT_FORM_FIELD_CHANGED,
  payload: { field, value },
})

export const updateTenantRequest = params => ({
  type: UPDATE_TENANT_REQUEST,
  payload: params,
})

export const updateTenantSuccess = response => ({
  type: UPDATE_TENANT_SUCCESS,
  payload: response,
})

export const updateTenantFailure = error => ({
  type: UPDATE_TENANT_FAILURE,
  payload: error,
})

export const updateTenantSetMilitaryMember = value => ({
  type: UPDATE_TENANT_SET_MILITARY_MEMBER,
  payload: value,
})

export const updateTenantSetBusinessStorage = value => ({
  type: UPDATE_TENANT_SET_BUSINESS_STORAGE,
  payload: value,
})

export const updateTenantSetAlternateContact = value => ({
  type: UPDATE_TENANT_SET_ALTERNATE_CONTACT,
  payload: value,
})

export const updateTenantSetVehicleStorage = value => ({
  type: UPDATE_TENANT_SET_VEHICLE_STORAGE,
  payload: value,
})
