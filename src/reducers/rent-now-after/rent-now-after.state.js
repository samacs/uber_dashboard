import { Record } from 'immutable'
import moment from 'moment'

import { ACH_ACCOUNT_TYPES } from '../global/global.constants'

const Form = Record({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  unitId: '',
  unitName: '',
  tenantId: '',
  concessionId: '',
  insuranceCoverageId: '',
  total: '',
  startDate: moment().format(),
  endDate: moment().format(),
  neededByDate: moment().format(),
  billingAddressLine1: '',
  billingAddressLine2: '',
  billingZip: '',
  billingStateCode: '',
  billingCity: '',
  autoPaySelected: false,
  paperlessSelected: false,
  creditCardType: '',
  creditCardNumber: '',
  creditCardCvvNumber: '',
  creditCardExpYear: moment().year(),
  creditCardExpMonth: moment().month(),
  nameOnCard: '',
  achRoutingNumber: '',
  achAccountNumber: '',
  achAccountType: ACH_ACCOUNT_TYPES[0].value,
  strategyType: 'lead_rent_now_after_reservation_site_link',
  leadUid: '', // NOTE: Just a random value?
  callbackUrl: 'http://who-do-you-gonna-call.com', // NOTE: Just a random URL?
  createdAt: moment().format(), // NOTE: Take the current date?
})

const InitialState = Record({
  isRequesting: false,
  error: false,
  response: null,
  form: new Form(),
  leadForm: 'rent_now_after_reservation_site_link',
})

export default InitialState
