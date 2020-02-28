import {
  PUSHER_SUBSCRIBE,
  PUSHER_MESSAGE_RECEIVED,
  PUSHER_SUBSCRIBED,
} from './pusher.constants'

export const pusherSubscribe = (
  pusherKey,
  pusherChannel,
  pusherEvent,
  prefix,
) => ({
  type: PUSHER_SUBSCRIBE,
  payload: { pusherKey, pusherChannel, pusherEvent, prefix },
})

export const pusherSubscribed = () => ({
  type: PUSHER_SUBSCRIBED,
})

export const pusherMessageReceived = (event, data) => ({
  type: PUSHER_MESSAGE_RECEIVED,
  payload: { event, data },
})
