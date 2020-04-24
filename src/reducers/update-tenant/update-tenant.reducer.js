import InitialState from './update-tenant.state'

const initialState = new InitialState()

export default (state = initialState, action) => {
  if (!(state instanceof InitialState)) {
    return initialState.mergeDeep(state)
  }

  switch (action.type) {
    default:
      return state
  }
}
