import InitialState from './update-tenant.state'
import {
  UPDATE_TENANT_FORM_FIELD_CHANGED,
  UPDATE_TENANT_REQUEST,
  UPDATE_TENANT_FAILURE,
  UPDATE_TENANT_SUCCESS,
  UPDATE_TENANT_SET_ALTERNATE_CONTACT,
  UPDATE_TENANT_SET_MILITARY_MEMBER,
  UPDATE_TENANT_SET_BUSINESS_STORAGE,
  UPDATE_TENANT_SET_VEHICLE_STORAGE,
} from './update-tenant.constants'

const initialState = new InitialState()

export default (state = initialState, action) => {
  if (!(state instanceof InitialState)) {
    return initialState.mergeDeep(state)
  }

  switch (action.type) {
    case UPDATE_TENANT_FORM_FIELD_CHANGED: {
      const { field, value } = action.payload
      return state.setIn(['form', field], value)
    }
    case UPDATE_TENANT_REQUEST:
      return state
        .set('isRequesting', true)
        .set('error', null)
        .set('response', null)
    case UPDATE_TENANT_FAILURE:
      console.error(action.payload)
      return state
        .set('isRequesting', false)
        .set('error', action.payload)
        .set('response', null)
    case UPDATE_TENANT_SUCCESS:
      console.info(action.type)
      console.info(action.payload)
      return state
        .set('isRequesting', false)
        .set('error', null)
        .set('response', action.payload)
    case UPDATE_TENANT_SET_ALTERNATE_CONTACT:
      return state.set('alternateContact', action.payload)
    case UPDATE_TENANT_SET_MILITARY_MEMBER:
      return state.set('militaryMember', action.payload)
    case UPDATE_TENANT_SET_BUSINESS_STORAGE:
      return state.set('businessStorage', action.payload)
    case UPDATE_TENANT_SET_VEHICLE_STORAGE:
      return state.set('vehicleStorage', action.payload)
    default:
      return state
  }
}
