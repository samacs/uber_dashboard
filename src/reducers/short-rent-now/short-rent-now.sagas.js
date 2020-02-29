import { takeLatest, put, call, all, select } from 'redux-saga/effects'

import {
  SHORT_RENT_NOW_REQUEST,
  SHORT_RENT_NOW_VENDOR_LEAD_REQUEST,
} from './short-rent-now.constants'
import {
  shortRentNowFailure,
  shortRentNowSuccess,
  shortRentNowVendorLeadFailure,
  shortRentNowVendorLeadSuccess,
} from './short-rent-now.actions'
import VendorLeadsService from '../../services/vendor-leads.service'
import { selectAccessToken } from '../global/global.selectors'
import { selectStrategyType } from './short-rent-now.selectors'

const service = new VendorLeadsService()

export function* submitShortRentNowReservation({ payload }) {
  try {
    const state = yield select()
    const strategyType = yield selectStrategyType(state)
    const accessToken = yield selectAccessToken(state)
    const { data: response } = yield service.submitLead(
      {
        strategyType,
        ...payload,
      },
      accessToken,
    )
    yield put(shortRentNowSuccess(response))
  } catch (error) {
    const {
      data: { error: errorPayload },
    } = error.response
    yield put(shortRentNowFailure(errorPayload))
  }
}

export function* retrieveShortRentNowVendorLead({ payload: id }) {
  try {
    const state = yield select()
    const accessToken = yield selectAccessToken(state)
    const { data: response } = yield service.getVendorLead(id, accessToken)
    yield put(shortRentNowVendorLeadSuccess(response))
  } catch (error) {
    const {
      data: { error: errorPayload },
    } = error.response
    yield put(shortRentNowVendorLeadFailure(errorPayload))
  }
}

export function* onShortRentNowRequest() {
  yield takeLatest(SHORT_RENT_NOW_REQUEST, submitShortRentNowReservation)
}

export function* onShortRentNowVendorLeadRequest() {
  yield takeLatest(
    SHORT_RENT_NOW_VENDOR_LEAD_REQUEST,
    retrieveShortRentNowVendorLead,
  )
}

export default function* shortRentNowSagas() {
  yield all([
    call(onShortRentNowRequest),
    call(onShortRentNowVendorLeadRequest),
  ])
}
