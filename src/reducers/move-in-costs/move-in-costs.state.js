import { Record } from 'immutable'
import moment from 'moment'

const Form = Record({
  unitId: '',
  dateNeeded: moment().format(),
  dateMoveIn: moment().add(2, 'days').format(),
  insuranceCoverageId: '',
  concessionId: '',
  insuranceLabel: '',
})

const InitialState = Record({
  useInsurancePlans: false,
  isRequesting: false,
  error: null,
  response: null,
  total: '',
  startDate: '',
  endDate: '',
  moveInCosts: [],
  form: new Form(),
  useAnyDate: false,
})

export default InitialState
