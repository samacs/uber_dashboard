import { Record } from 'immutable'
import {
  LOCATION_URN,
  ENCRYPT_CLIENT_KEY,
  CLIENT_URN,
} from '../../config/backend.config'

const Form = Record({
  locationUrn: LOCATION_URN,
  clientUrn: CLIENT_URN,
  encryptClientKey: ENCRYPT_CLIENT_KEY,
  waitingId: '',
  encryptedWaitingId: null,
  encrypt: false,
  ab: '',
  accessToken: '',
  billing_28Days: false,
})

const InitialState = Record({
  form: new Form(),
  activeTab: 'insurance-data',
  links: [
    {
      title: 'TenantUnitConcessionInsuranceData',
      id: 'insurance-data',
    },
    {
      title: 'MoveInCostReservationWithDiscount',
      id: 'move-in-costs',
    },
    {
      title: 'RentNowAfterReservation',
      id: 'rent-now-after',
    },
    {
      title: 'UpdateTenantAfterPayment',
      id: 'update-tenant-after-payment',
    },
  ],
})

export default InitialState
