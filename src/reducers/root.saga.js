import { all, call } from 'redux-saga/effects'

import insuranceDataSagas from './insurance-data/insurance-data.sagas'
import moveInCostsSagas from './move-in-costs/move-in-costs.sagas'
import rentNowAfterSagas from './rent-now-after/rent-now-after.sagas'
import updateTenantSagas from './update-tenant/update-tenant.sagas'
import shortRentNowSagas from './short-rent-now/short-rent-now.sagas'

export default function* rootSaga() {
  yield all([
    call(insuranceDataSagas),
    call(moveInCostsSagas),
    call(rentNowAfterSagas),
    call(updateTenantSagas),
    call(shortRentNowSagas),
  ])
}
