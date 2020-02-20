import Pusher from 'pusher-js'
import humps from 'humps'

import { PUSHER_SUBSCRIBE } from '../../reducers/pusher/pusher.constants'
import {
  pusherSubscribed,
  pusherMessageReceived,
} from '../../reducers/pusher/pusher.actions'

const handleMessageReceived = (
  _pusher,
  channel,
  event,
  { dispatch },
) => data => {
  const action = {
    type: event.toUpperCase(),
    payload: humps.camelizeKeys(data),
  }
  dispatch(pusherMessageReceived(event, data))
  dispatch(action)
  setTimeout(() => {
    channel.unbind(event)
  }, 3000)
}

const handleChannelSubscribe = (
  pusherKey,
  pusherChannel,
  pusherEvent,
  store,
) => {
  try {
    const pusher = new Pusher(pusherKey)
    const channel = pusher.subscribe(pusherChannel)
    channel.bind(
      pusherEvent,
      handleMessageReceived(pusher, channel, pusherEvent, store),
    )
    channel.bind('error', data => {
      const action = {
        type: `${pusherEvent.toUpperCase()}_ERROR`,
        payload: humps.camelizeKeys(data),
      }
      store.dispatch(pusherMessageReceived('error', data))
      store.dispatch(action)
      setTimeout(() => channel.unbind('error'), 3000)
    })
    store.dispatch(pusherSubscribed())
  } catch (error) {
    console.error(error)
  }
}

export default store => next => action => {
  const match = /^(PUSHER)_(.+)$/.exec(action.type)
  if (!match) {
    return next(action)
  }

  switch (action.type) {
    case PUSHER_SUBSCRIBE:
      const { pusherKey, pusherChannel, pusherEvent } = action.payload
      handleChannelSubscribe(pusherKey, pusherChannel, pusherEvent, store)
      break
    default:
      return next(action)
  }
}
