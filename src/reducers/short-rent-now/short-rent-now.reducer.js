import {
  SHORT_RENT_NOW_FORM_FIELD_CHANGED,
  SHORT_RENT_NOW_REQUEST,
  SHORT_RENT_NOW_SUCCESS,
  SHORT_RENT_NOW_FAILURE,
  SHORT_RESERVATION_TO_RENT_NOW_SUCCESS,
  SHORT_RENT_NOW_VENDOR_LEAD_REQUEST,
  SHORT_RENT_NOW_VENDOR_LEAD_SUCCESS,
  SHORT_RENT_NOW_VENDOR_LEAD_FAILURE,
} from './short-rent-now.constants'
import InitialState from './short-rent-now.state'

const initialState = new InitialState()

export default (state = initialState, action) => {
  if (!(state instanceof InitialState)) {
    return initialState.mergeDeep(state)
  }

  switch (action.type) {
    case SHORT_RENT_NOW_FORM_FIELD_CHANGED: {
      const { field, value } = action.payload
      return state.setIn(['form', field], value)
    }
    case SHORT_RENT_NOW_REQUEST:
    case SHORT_RENT_NOW_VENDOR_LEAD_REQUEST:
      return state
        .set('isRequesting', true)
        .set('error', null)
        .set('response', null)
    case SHORT_RENT_NOW_SUCCESS:
    case SHORT_RENT_NOW_VENDOR_LEAD_SUCCESS:
      console.info(action.type)
      console.info(action.payload)
      return state
        .set('isRequesting', false)
        .set('error', null)
        .set('response', action.payload)
    case SHORT_RENT_NOW_FAILURE:
    case SHORT_RENT_NOW_VENDOR_LEAD_FAILURE:
      console.error(action.payload)
      return state
        .set('isRequesting', false)
        .set('error', action.payload)
        .set('response', null)
    case SHORT_RESERVATION_TO_RENT_NOW_SUCCESS:
      return state
        .set('isRequesting', false)
        .set('error', null)
        .set('response', action.payload)
    default:
      return state
  }
}
