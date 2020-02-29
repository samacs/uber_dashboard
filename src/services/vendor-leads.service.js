import Api from './api'

export default class VendorLeadsService extends Api {
  submitLead = (lead, accessToken) =>
    this.post('/vendor_leads', { lead }, { accessToken })

  getVendorLead = (id, accessToken) =>
    this.get(`/vendor_leads/${id}`, { accessToken })
}
