import InitialState from './move-in-costs.state'
import {
  MOVE_IN_COSTS_FORM_FIELD_CHANGED,
  MOVE_IN_COSTS_REQUEST,
  MOVE_IN_COSTS_FAILURE,
  MOVE_IN_COSTS_SUCCESS,
  MOVE_IN_COST_RESERVATION,
  MOVE_IN_COSTS_SET_USE_INSURANCE_PLANS,
  MOVE_IN_COSTS_SET_USE_ANY_DATE,
} from './move-in-costs.constants'

const initialState = new InitialState()

export default (state = initialState, action) => {
  if (!(state instanceof InitialState)) {
    return initialState.mergeDeep(state)
  }

  switch (action.type) {
    case MOVE_IN_COSTS_FORM_FIELD_CHANGED: {
      const { field, value } = action.payload
      return state.setIn(['form', field], value)
    }
    case MOVE_IN_COSTS_SET_USE_INSURANCE_PLANS:
      return state.set('useInsurancePlans', action.payload)
    case MOVE_IN_COSTS_REQUEST:
      return state
        .set('isRequesting', true)
        .set('error', null)
        .set('response', null)
    case MOVE_IN_COSTS_FAILURE:
      return state
        .set('isRequesting', false)
        .set('error', action.payload)
        .set('response', null)
    case MOVE_IN_COSTS_SUCCESS:
      return state
        .set('isRequesting', false)
        .set('error', null)
        .set('response', action.payload)
    case MOVE_IN_COST_RESERVATION:
      const { payload } = action
      console.info(action.type)
      console.info(payload)
      return state
        .set('response', payload)
        .set('total', payload.total)
        .set('startDate', payload.startDate)
        .set('endDate', payload.endDate)

        .set('moveInCosts', payload.moveInCosts)
    case MOVE_IN_COSTS_SET_USE_ANY_DATE:
      return state.set('useAnyDate', action.payload)
    default:
      return state
  }
}
