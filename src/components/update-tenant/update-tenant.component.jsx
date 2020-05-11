import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createStructuredSelector } from 'reselect'
import { TabPane, Col, FormGroup, Label, Input, Form, Button } from 'reactstrap'

import * as updateTenantActions from '../../reducers/update-tenant/update-tenant.actions'
import {
  selectForm,
  selectIsRequesting,
  selectAlternateContact,
  selectBusinessStorage,
  selectVehicleStorage,
  selectMilitaryMember,
} from '../../reducers/update-tenant/update-tenant.selectors'
import { US_STATES } from '../../reducers/global/global.constants'
import AlternateContact from '../alternate-contact/alternate-contact.component'
import MilitaryMember from '../military-member/military-member.component'
import BusinessStorage from '../business-storage/business-storage.component'
import VehicleStorage from '../vehicle-storage/vehicle-storage.component'

const mapStateToProps = createStructuredSelector({
  form: selectForm,
  isRequesting: selectIsRequesting,
  showAlternateContact: selectAlternateContact,
  showBusinessStorage: selectBusinessStorage,
  showVehicleStorage: selectVehicleStorage,
  showMilitaryMember: selectMilitaryMember,
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...updateTenantActions }, dispatch),
})

const tabId = 'update-tenant-after-payment'

const UpdateTenant = ({
  form,
  isRequesting,
  showAlternateContact,
  showBusinessStorage,
  showVehicleStorage,
  showMilitaryMember,
  actions: { updateTenantFormFieldChanged, updateTenantRequest },
}) => {
  const { identificationLastFour, identificationRegion, itemsWithLien } = form

  console.log('showAlternateContact', showAlternateContact)
  console.log('showMilitaryMember', showMilitaryMember)
  console.log('showBusinessStorage', showBusinessStorage)
  console.log('showVehicleStorage', showVehicleStorage)

  const handleOnSubmit = e => {
    e.preventDefault()

    const params = {
      'p-identification': identificationLastFour,
      'p-region': identificationRegion,
      'p-items-with-lien': itemsWithLien,
      'p-return-url': '', // returnUrl,
      ga_client_id: '131441893.1581704404',
    }
    if (showAlternateContact) {
      params['p-alt-contact-first-name'] = form.firstNameAlt
      params['p-alt-contact-last-name'] = form.lastNameAlt
      params['p-alt-contact-phone'] = form.phoneAlt
      params['p-alt-contact-address1'] = form.addressAlt
      params['p-alt-contact-address2'] = form.address1Alt
      params['p-alt-contact-city'] = form.cityAlt
      params['p-alt-contact-state'] = form.stateAlt
      params['p-alt-contact-postal-code'] = form.postalCodeAlt
      params['p-alt-contact-email'] = form.emailAlt
    }
    if (showMilitaryMember) {
      params['p-commanding-officer-name'] = form.commandingOfficerName
      params['p-commanding-officer-phone'] = form.commandingOfficerPhone
    }
    if (showBusinessStorage) {
      params['p-business-tax-id'] = form.businessTaxId
      params['p-business-name'] = form.businessName
    }
    if (showVehicleStorage) {
      params['p-vehicle-vin'] = form.vehicleVin
    }
    updateTenantRequest(params)
  }

  const handleOnFieldChanged = e => {
    const { name, value } = e.target
    updateTenantFormFieldChanged(name, value)
  }

  return (
    <TabPane tabId={tabId}>
      <h1 className="h2">UpdateTenantAfterPayment</h1>
      <Form onSubmit={handleOnSubmit} name="updateTenantAfterPayment">
        <FormGroup row>
          <Col md="8">
            <Label htmlFor="update-tenant-identification-last-four">
              Last 4 digits of State ID
            </Label>
            <Input
              id="update-tenant-identification-last-four"
              name="identificationLastFour"
              value={identificationLastFour}
              onChange={handleOnFieldChanged}
            />
          </Col>
          <Col md="4">
            <Label htmlFor="update-tenant-identification-region">
              ID State
            </Label>
            <Input
              type="select"
              id="update-tenant-identification-region"
              name="identificationRegion"
              value={identificationRegion}
              onChange={handleOnFieldChanged}>
              {US_STATES.map(state => (
                <option key={state.code} value={state.code}>
                  {state.name}
                </option>
              ))}
            </Input>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col>
            <Label htmlFor="update-tenant-items-with-lien">
              List any storage items with lien
            </Label>
            <Input
              type="text"
              id="update-tenant-items-with-lien"
              name="itemsWithLien"
              value={itemsWithLien}
              onChange={handleOnFieldChanged}
            />
          </Col>
        </FormGroup>
        <MilitaryMember form={form} onChange={handleOnFieldChanged} />
        <AlternateContact form={form} onChange={handleOnFieldChanged} />
        <BusinessStorage form={form} onChange={handleOnFieldChanged} />
        <VehicleStorage form={form} onChange={handleOnFieldChanged} />
        <div className="pt-2">
          <Button disabled={isRequesting} color="primary">
            Update tenant
          </Button>
        </div>
      </Form>
    </TabPane>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateTenant)
