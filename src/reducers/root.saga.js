import { all, call } from 'redux-saga/effects'

import insuranceDataSagas from './insurance-data/insurance-data.sagas'
import moveInCostsSagas from './move-in-costs/move-in-costs.sagas'
import rentNowAfterSagas from './rent-now-after/rent-now-after.sagas'

export default function* rootSaga() {
  yield all([
    call(insuranceDataSagas),
    call(moveInCostsSagas),
    call(rentNowAfterSagas),
  ])
}
