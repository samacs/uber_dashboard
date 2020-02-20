import React, { Fragment } from 'react'
import { FormGroup, Col, Label, Input } from 'reactstrap'

import { US_STATES } from '../../reducers/global/global.constants'

const BillingAddressForm = ({ billingAddressInfo, onChange }) => {
  const {
    billingAddressLine1,
    billingAddressLine2,
    billingCity,
    billingStateCode,
    billingZip,
  } = billingAddressInfo

  return (
    <Fragment>
      <h3>Billing address information</h3>
      <FormGroup row>
        <Col>
          <Label htmlFor="billing-address-line-1">Billing address line 1</Label>
          <Input
            id="billing-address-line-1"
            name="billingAddressLine1"
            value={billingAddressLine1}
            onChange={onChange}
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Col>
          <Label htmlFor="billing-address-line-2">Billing address line 2</Label>
          <Input
            id="billing-address-line-2"
            name="billingAddressLine2"
            value={billingAddressLine2}
            onChange={onChange}
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Col md="8">
          <Label htmlFor="billing-city">City</Label>
          <Input
            id="billing-city"
            name="billingCity"
            value={billingCity}
            onChange={onChange}
          />
        </Col>
        <Col md="2">
          <Label htmlFor="billing-state-code">State</Label>
          <Input
            type="select"
            id="billing-state-code"
            name="billingStateCode"
            value={billingStateCode}
            onChange={onChange}>
            {US_STATES.map(state => (
              <option key={state.code} value={state.code}>
                {state.name}
              </option>
            ))}
          </Input>
        </Col>
        <Col md="2">
          <Label htmlFor="billing-zip">Zip code</Label>
          <Input
            id="billing-zip"
            name="billingZip"
            value={billingZip}
            onChange={onChange}
          />
        </Col>
      </FormGroup>
    </Fragment>
  )
}

export default BillingAddressForm
