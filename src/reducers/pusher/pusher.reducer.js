import { PUSHER_SUBSCRIBED, PUSHER_MESSAGE_RECEIVED } from './pusher.constants'
import InitialState from './pusher.state'

const initialState = new InitialState()

export default (state = initialState, action) => {
  if (!(state instanceof InitialState)) {
    return initialState
  }

  switch (action.type) {
    case PUSHER_SUBSCRIBED: {
      let subscriptionCount = state.get('subscriptionCount')
      return state
        .set('subscriptionCount', ++subscriptionCount)
        .set('showSpinner', true)
    }
    case PUSHER_MESSAGE_RECEIVED: {
      let subscriptionCount = state.get('subscriptionCount')
      let showSpinner = state.get('showSubscription')

      --subscriptionCount
      if (subscriptionCount > 0) {
        showSpinner = false
      }
      return state
        .set('subscriptionCount', subscriptionCount)
        .set('showSpinner', showSpinner)
        .set('lastMessage', action.payload)
    }
    default:
      return state
  }
}
