import Api from './api'

export default class InsuranceDataService extends Api {
  retrieveInsuranceData = data =>
    this.post('/uber_wow/tenant_unit_concession_insurance_data', data)
}
