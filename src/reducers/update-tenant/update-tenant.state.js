import { Record } from 'immutable'

const Form = Record({
  firstNameAlt: '',
  lastNameAlt: '',
  phoneAlt: '',
  addressAlt: '',
  cityAlt: '',
  address1Alt: '',
  stateAlt: '',
  postalCodeAlt: '',
  emailAlt: '',
  commandingOfficerName: '',
  commandingOfficerPhone: '',
  identificationLastFour: '',
  identificationRegion: '',
  vehicleVin: '',
  businessName: '',
  businessTaxId: '',
  ledgerId: '',
  tenantId: '',
  returnUrl: '',
  leadUid: '',
  itemsWithLien: '',
})

const InitialState = Record({
  isRequesting: false,
  error: null,
  response: null,
  leadForm: 'update_tenant_after_payment_site_link',
  form: new Form(),
  militaryMember: false,
  alternateContact: false,
  businessStorage: false,
  vehicleStorage: false,
})

export default InitialState
