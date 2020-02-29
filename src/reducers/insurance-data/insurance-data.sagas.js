import { takeLatest, put, all, call } from 'redux-saga/effects'

import { INSURANCE_DATA_REQUEST } from './insurance-data.constants'
import {
  insuranceDataFailure,
  insuranceDataSuccess,
} from './insurance-data.actions'
import { pusherSubscribe } from '../pusher/pusher.actions'
import InsuranceDataService from '../../services/insurance-data.service'

const service = new InsuranceDataService()

export function* retrieveInsuranceData({ payload }) {
  try {
    const { data: response } = yield service.retrieveInsuranceData(payload)
    const { pusherKey, pusherChannel, pusherEvent } = response
    yield put(insuranceDataSuccess(response))
    yield put(pusherSubscribe(pusherKey, pusherChannel, pusherEvent))
  } catch (error) {
    yield put(insuranceDataFailure(error))
  }
}

export function* onInsuranceDataRequest() {
  yield takeLatest(INSURANCE_DATA_REQUEST, retrieveInsuranceData)
}

export default function* insuranceDataSagas() {
  yield all([call(onInsuranceDataRequest)])
}
