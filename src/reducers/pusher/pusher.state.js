import { Record } from 'immutable'

const InitialState = Record({
  showSpinner: false,
  subscriptionCount: 0,
  lastMessage: null,
})

export default InitialState
