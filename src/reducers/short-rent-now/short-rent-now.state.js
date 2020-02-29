import { Record } from 'immutable'
import moment from 'moment'

const Form = Record({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  message: '',
  reservationDate: moment().format(),
  storageUnitExternalId: '',
  rentalRate: '',
  size: '',
  promotion: '',
  amenities: '',
  sync: false,
  leadUid: '',
  locationUid: '',
  clientUid: '',
  callbackUrl: 'http://who-do-you-gonna-call.com', // NOTE: Just a random URL?
  createdAt: moment().format(),
})

const InitialState = Record({
  isRequesting: false,
  error: null,
  response: null,
  form: new Form(),
  leadForm: 'short_reservation_to_rent_now_site_link',
  strategyType: 'lead_short_reservation_to_rent_now_site_link',
})

export default InitialState
