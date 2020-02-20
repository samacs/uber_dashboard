import { takeLatest, put, call, all, select } from 'redux-saga/effects'

import { RENT_NOW_AFTER_REQUEST } from './rent-now-after.constants'
import { CLS_API_ENDPOINT } from '../../config/backend.config'
import {
  rentNowAfterFailure,
  rentNowAfterSuccess,
} from './rent-now-after.actions'
import { selectLocationUrn } from '../global/global.selectors'
import { pusherSubscribe } from '../pusher/pusher.actions'
import LeadsService from '../../services/leads.service'
import { selectLeadForm } from './rent-now-after.selectors'

const service = new LeadsService({ baseURL: CLS_API_ENDPOINT })

export function* submitRentNowAfterReservation({ payload }) {
  try {
    const state = yield select()
    const locationUrn = selectLocationUrn(state)
    const leadForm = selectLeadForm(state)
    const { data: response } = yield service.submitLead(
      locationUrn,
      leadForm,
      payload,
    )
    const { pusher_key, pusher_channel, pusher_event } = response
    yield put(rentNowAfterSuccess(response))
    yield put(pusherSubscribe(pusher_key, pusher_channel, pusher_event))
  } catch (error) {
    yield put(rentNowAfterFailure(error))
  }
}

export function* onRentNowAfterRequest() {
  yield takeLatest(RENT_NOW_AFTER_REQUEST, submitRentNowAfterReservation)
}

export default function* rentNowAfterSagas() {
  yield all([call(onRentNowAfterRequest)])
}
