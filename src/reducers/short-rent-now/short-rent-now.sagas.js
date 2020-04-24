import { takeLatest, put, call, all, select } from 'redux-saga/effects'

import { SHORT_RENT_NOW_REQUEST } from './short-rent-now.constants'
import { CLS_API_ENDPOINT } from '../../config/backend.config'
import {
  shortRentNowFailure,
  shortRentNowSuccess,
} from './short-rent-now.actions'
import LeadsService from '../../services/leads.service'
import { pusherSubscribe } from '../pusher/pusher.actions'
import { selectLocationUrn } from '../global/global.selectors'
import { selectLeadForm } from './short-rent-now.selectors'

const service = new LeadsService({ baseURL: CLS_API_ENDPOINT })

export function* submitShortRentNowReservation({ payload }) {
  try {
    const state = yield select()
    const locationUrn = yield selectLocationUrn(state)
    const leadForm = yield selectLeadForm(state)
    console.log(locationUrn, leadForm)
    const { data: response } = yield service.submitLead(
      locationUrn,
      leadForm,
      payload,
    )
    const { pusherAppKey, pusherChannel } = response
    yield put(shortRentNowSuccess(response))
    yield put(
      pusherSubscribe(
        pusherAppKey,
        pusherChannel,
        'success',
        'short_reservation_to_rent_now_',
      ),
    )
  } catch (error) {
    console.log(error.response)
    const { data: errorPayload } = error.response
    yield put(shortRentNowFailure(errorPayload))
  }
}

// export function* retrieveShortRentNowVendorLead({ payload: id }) {
//   try {
//     const state = yield select()
//     const accessToken = yield selectAccessToken(state)
//     const { data: response } = yield service.getVendorLead(id, accessToken)
//     yield put(shortRentNowVendorLeadSuccess(response))
//   } catch (error) {
//     const {
//       data: { error: errorPayload },
//     } = error.response
//     yield put(shortRentNowVendorLeadFailure(errorPayload))
//   }
// }

export function* onShortRentNowRequest() {
  yield takeLatest(SHORT_RENT_NOW_REQUEST, submitShortRentNowReservation)
}

// export function* onShortRentNowVendorLeadRequest() {
//   yield takeLatest(
//     SHORT_RENT_NOW_VENDOR_LEAD_REQUEST,
//     // retrieveShortRentNowVendorLead,
//   )
// }

export default function* shortRentNowSagas() {
  yield all([
    call(onShortRentNowRequest),
    // call(onShortRentNowVendorLeadRequest),
  ])
}
