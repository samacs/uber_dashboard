import { createStore, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger'
import { persistStore } from 'redux-persist'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'
import createSagasMiddleware from 'redux-saga'

import createRootReducer from '../reducers/root.reducer'
import pusherMiddleware from './middleware/pusher.middleware'
import rootSaga from '../reducers/root.saga'
import GlobalInitialState from '../reducers/global/global.state'
import InsuranceDataInitialState from '../reducers/insurance-data/insurance-data.state'
import MoveInCostsInitialState from '../reducers/move-in-costs/move-in-costs.state'
import PusherInitialState from '../reducers/pusher/pusher.state'
import RentNowAfterInitialState from '../reducers/rent-now-after/rent-now-after.state'

const createInitialState = () => ({
  global: new GlobalInitialState(),
  insuranceData: new InsuranceDataInitialState(),
  moveInCosts: new MoveInCostsInitialState(),
  pusher: new PusherInitialState(),
  rentNowAfter: new RentNowAfterInitialState(),
})

const isProduction = process.env.NODE_ENV === 'production'

const composeEnhancers =
  (!isProduction && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE) || compose
const logger = createLogger({
  predicate: (_getState, _action) => !isProduction,
})
const sagas = createSagasMiddleware()

export const history = createBrowserHistory()

const middleware = [logger, sagas, routerMiddleware(history), pusherMiddleware]

export const store = createStore(
  createRootReducer(history),
  createInitialState(),
  composeEnhancers(applyMiddleware(...middleware)),
)

sagas.run(rootSaga)

export const persistor = persistStore(store)
