import Api from './api'

export default class MoveInCostsService extends Api {
  retrieveMoveInCosts = data =>
    this.post('/uber_wow/move_in_costs_reservation', data)
}
