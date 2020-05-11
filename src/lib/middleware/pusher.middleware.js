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
  prefix,
  store,
) => {
  try {
    const pusher = new Pusher(pusherKey)
    pusher.bind_global((eventName, data) => {
      console.log(eventName, data)
    })
    const channel = pusher.subscribe(pusherChannel)
    const actionType = prefix ? `${prefix}${pusherEvent}` : pusherEvent
    channel.bind(
      pusherEvent,
      handleMessageReceived(pusher, channel, actionType, store),
    )
    channel.bind('error', data => {
      const action = {
        type: `${actionType.toUpperCase()}`,
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
      const { pusherKey, pusherChannel, pusherEvent, prefix } = action.payload
      handleChannelSubscribe(
        pusherKey,
        pusherChannel,
        pusherEvent,
        prefix,
        store,
      )
      break
    default:
      return next(action)
  }
}
