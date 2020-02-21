import Api from './api'

export default class LeadsService extends Api {
  submitLead = (locationUrn, leadForm, lead) => {
    console.log(lead)
    return this.post(
      `/locations/${locationUrn}/html_forms/${leadForm}/submissions`,
      lead,
      {},
      { 'Content-Type': 'multipart/form-data' },
    )
  }
}
