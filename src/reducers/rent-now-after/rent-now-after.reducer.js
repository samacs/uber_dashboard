import {
  RENT_NOW_AFTER_REQUEST,
  RENT_NOW_AFTER_FAILURE,
  RENT_NOW_AFTER_SUCCESS,
  RENT_NOW_AFTER_FORM_FIELD_CHANGED,
  RENT_NOW_AFTER_RESERVATION_SUCCESS,
} from './rent-now-after.constants'
import InitialState from './rent-now-after.state'

const initialState = new InitialState()

export default (state = initialState, action) => {
  if (!(state instanceof InitialState)) {
    return initialState
  }

  switch (action.type) {
    case RENT_NOW_AFTER_FORM_FIELD_CHANGED: {
      const { field, value } = action.payload
      return state.setIn(['form', field], value)
    }
    case RENT_NOW_AFTER_REQUEST:
      return state
        .set('isRequesting', true)
        .set('error', null)
        .set('response', null)
    case RENT_NOW_AFTER_FAILURE:
      console.error(action.payload)
      return state
        .set('isRequesting', false)
        .set('error', action.payload)
        .set('response', null)
    case RENT_NOW_AFTER_SUCCESS:
      console.log(action)
      return state
        .set('isRequesting', false)
        .set('error', null)
        .set('response', action.payload)
    case RENT_NOW_AFTER_RESERVATION_SUCCESS:
      console.info(action.type)
      console.info(action.payload)
      return state
        .set('isRequesting', false)
        .set('error', null)
        .set('response', action.payload)
    default:
      return state
  }
}
