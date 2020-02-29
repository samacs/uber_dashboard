import { takeLatest, put, all, call } from 'redux-saga/effects'

import { MOVE_IN_COSTS_REQUEST } from './move-in-costs.constants'
import { moveInCostsFailure, moveInCostsSuccess } from './move-in-costs.actions'
import { pusherSubscribe } from '../pusher/pusher.actions'
import MoveInCostsService from '../../services/move-in-costs.service'

const service = new MoveInCostsService()

export function* retrieveMoveInCosts({ payload }) {
  try {
    const { data: response } = yield service.retrieveMoveInCosts(payload)
    const { pusherKey, pusherChannel, pusherEvent } = response
    yield put(moveInCostsSuccess(response))
    yield put(pusherSubscribe(pusherKey, pusherChannel, pusherEvent))
  } catch (error) {
    yield put(moveInCostsFailure(error))
  }
}

export function* onMoveInCostsRequest() {
  yield takeLatest(MOVE_IN_COSTS_REQUEST, retrieveMoveInCosts)
}

export default function* moveInCostsSagas() {
  yield all([call(onMoveInCostsRequest)])
}
