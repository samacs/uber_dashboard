import React, { Fragment, useState } from 'react'
import { FormGroup, Col, Label, Input } from 'reactstrap'

import { US_STATES } from '../../reducers/global/global.constants'

const billingAddresses = [
  {
    label: 'Doc Brown',
    billingAddressLine1: '1640 Riverside Drive',
    billingCity: 'Hill Valley',
    billingStateCode: 'CA',
  },
  {
    label: 'Tim Taylor',
    billingAddressLine1: '510 Glenview',
    billingCity: 'Detroit',
    billingStateCode: 'MI',
  },
  {
    label: 'Cliff Huxtable',
    billingAddressLine1: '10 Stigwood Avenue',
    billingCity: 'New York City',
    billingStateCode: 'NY',
  },
  {
    label: 'Tony Nelson',
    billingAddressLine1: '1020 Palm Drive',
    billingCity: 'Cocoa Beach',
    billingStateCode: 'FL',
  },
]

const BillingAddressForm = ({ billingAddressInfo, onChange }) => {
  const {
    billingAddressLine1,
    billingAddressLine2,
    billingCity,
    billingStateCode,
    billingZip,
    billingAddressIndex,
  } = billingAddressInfo

  useState(() => {
    if (!billingAddressIndex) {
      onChange('billingAddressIndex', 0)
    }
  }, [billingAddressIndex])

  const onBillingAddressChanged = value => {
    const billingAddress = billingAddresses[value]
    onChange('billingAddressIndex', value)
    onChange('billingAddressLine1', billingAddress.billingAddressLine1)
    onChange('billingCity', billingAddress.billingCity)
    onChange('billingStateCode', billingAddress.billingStateCode)
    onChange('billingZip', '12345')
  }

  const handleOnChange = e => {
    const { name, value } = e.target
    onChange(name, value)
  }

  return (
    <Fragment>
      <h3>Billing address information</h3>
      <FormGroup row>
        <Col>
          <Label htmlFor="billing-address-index">
            Select a billing address
          </Label>
          <Input
            type="select"
            name="billingAddressIndex"
            id="billing-address-index"
            onChange={e => onBillingAddressChanged(e.target.value)}>
            {billingAddresses.map((billingAddress, index) => (
              <option key={index} value={index}>
                {billingAddress.label} ({billingAddress.billingCity},{' '}
                {billingAddress.billingStateCode})
              </option>
            ))}
          </Input>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Col>
          <Label htmlFor="billing-address-line-1">Billing address line 1</Label>
          <Input
            id="billing-address-line-1"
            name="billingAddressLine1"
            value={billingAddressLine1}
            onChange={handleOnChange}
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
            onChange={handleOnChange}
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
            onChange={handleOnChange}
          />
        </Col>
        <Col md="2">
          <Label htmlFor="billing-state-code">State</Label>
          <Input
            type="select"
            id="billing-state-code"
            name="billingStateCode"
            value={billingStateCode}
            onChange={handleOnChange}>
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
            onChange={handleOnChange}
          />
        </Col>
      </FormGroup>
    </Fragment>
  )
}

export default BillingAddressForm
