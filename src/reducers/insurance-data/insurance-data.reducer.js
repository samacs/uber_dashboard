import {
  INSURANCE_DATA_FORM_FIELD_CHANGED,
  INSURANCE_DATA_REQUEST,
  INSURANCE_DATA_FAILURE,
  INSURANCE_DATA_SUCCESS,
  TENANT_UNIT_CONCESSION_INSURANCE_DATA,
  TENANT_UNIT_CONCESSION_INSURANCE_DATA_ERROR,
} from './insurance-data.constants'
import InitialState from './insurance-data.state'

const initialState = new InitialState()

export default (state = initialState, action) => {
  if (!(state instanceof InitialState)) {
    return initialState.mergeDeep(state)
  }

  switch (action.type) {
    case INSURANCE_DATA_FORM_FIELD_CHANGED: {
      const { field, value } = action.payload
      return state.setIn(['form', field], value)
    }
    case INSURANCE_DATA_REQUEST:
      return state
        .set('isRequesting', true)
        .set('error', null)
        .set('response', null)
    case INSURANCE_DATA_FAILURE:
      return state
        .set('isRequesting', false)
        .set('error', action.payload)
        .set('response', null)
    case INSURANCE_DATA_SUCCESS:
      return state
        .set('isRequesting', false)
        .set('error', null)
        .set('response', action.payload)
    case TENANT_UNIT_CONCESSION_INSURANCE_DATA_ERROR:
      const { errorMessage } = action.payload
      console.error(errorMessage)
      return state.set('error', errorMessage)
    case TENANT_UNIT_CONCESSION_INSURANCE_DATA: {
      const { payload } = action
      console.info(action.type)
      console.info(payload)
      if (payload.reservation) {
        return state
          .set('customer', payload.customer)
          .set('reservation', payload.reservation)
          .set('unit', payload.unit)
          .set('insurancePlans', payload.insurancePlans)
      } else {
        return state.set('customer', payload.customer)
      }
    }
    default:
      return state
  }
}
