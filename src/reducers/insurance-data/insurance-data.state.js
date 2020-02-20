import { Record } from 'immutable'

const Form = Record({
  requireTodayMoveIn: false,
})

const InitialState = Record({
  isRequesting: false,
  error: null,
  customer: null,
  reservation: null,
  unit: null,
  form: new Form(),
  insurancePlans: [],
})

export default InitialState
