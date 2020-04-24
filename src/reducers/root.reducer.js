import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import { connectRouter } from 'connected-react-router'
import storage from 'redux-persist/lib/storage'

import globalReducer from './global/global.reducer'
import insuranceDataReducer from './insurance-data/insurance-data.reducer'
import moveInCostsReducer from './move-in-costs/move-in-costs.reducer'
import pusherReducer from './pusher/pusher.reducer'
import rentNowAfterReducer from './rent-now-after/rent-now-after.reducer'
import shortRentNowReducer from './short-rent-now/short-rent-now.reducer'
import updateTenantReducer from './update-tenant/update-tenant.reducer'

const whitelist = [
  'global',
  'insuranceData',
  'moveInCosts',
  'rentNowAfter',
  'shortRentNow',
  'updateTenant',
]

const persistConfig = {
  key: 'root',
  storage,
  whitelist,
}

const createRootReducer = history =>
  persistReducer(
    persistConfig,
    combineReducers({
      router: connectRouter(history),
      global: globalReducer,
      insuranceData: insuranceDataReducer,
      moveInCosts: moveInCostsReducer,
      pusher: pusherReducer,
      rentNowAfter: rentNowAfterReducer,
      shortRentNow: shortRentNowReducer,
      updateTenant: updateTenantReducer,
    }),
  )

export default createRootReducer
