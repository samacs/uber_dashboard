import {
  GLOBAL_FORM_FIELD_CHANGED,
  GLOBAL_SET_ACTIVE_TAB,
  GLOBAL_ENCRYPT_WAITING_ID,
} from './global.constants'
import InitialState from './global.state'
import EncryptionService from '../../services/encryption.service'

const initialState = new InitialState()
const encryptionService = new EncryptionService()

export default (state = initialState, action) => {
  if (!(state instanceof InitialState)) {
    return initialState
  }

  switch (action.type) {
    case GLOBAL_FORM_FIELD_CHANGED: {
      const { field, value } = action.payload
      return state.setIn(['form', field], value)
    }
    case GLOBAL_SET_ACTIVE_TAB:
      return state.set('activeTab', action.payload)
    case GLOBAL_ENCRYPT_WAITING_ID: {
      const encryptClientKey = state.getIn(['form', 'encryptClientKey'])
      const waitingId = state.getIn(['form', 'waitingId'])
      const { encryptedWaitingId, ab } = encryptionService.encryptWaitingId(
        encryptClientKey,
        waitingId,
      )
      return state
        .setIn(['form', 'encryptedWaitingId'], encryptedWaitingId)
        .setIn(['form', 'ab'], ab)
    }
    default:
      return state
  }
}
