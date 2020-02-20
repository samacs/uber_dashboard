import React, { Fragment, useRef } from 'react'
import { FormGroup, Col, Label, Input } from 'reactstrap'
import InputMask from 'react-input-mask'

import { ACH_ACCOUNT_TYPES } from '../../reducers/global/global.constants'

export const AchForm = ({ achInfo, onChange }) => {
  const { achAccountNumber, achRoutingNumber, achAccountType } = achInfo
  const selectRef = useRef()

  const handleOnFormFieldChange = e => {
    const { name, value } = e.target
    onChange(name, value)
  }

  return (
    <Fragment>
      <h3>ACH information</h3>
      <FormGroup row>
        <Col>
          <Label htmlFor="ach-account-number">Account number</Label>
          <Input
            type="text"
            id="ach-account-number"
            name="achAccountNumber"
            value={achAccountNumber}
            onChange={handleOnFormFieldChange}
            mask="999999999999999999"
            tag={InputMask}
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Col>
          <Label htmlFor="ach-routing-number">Routing number</Label>
          <Input
            type="text"
            id="ach-routing-number"
            name="achRoutingNumber"
            value={achRoutingNumber}
            onChange={handleOnFormFieldChange}
            mask="999999999999"
            tag={InputMask}
          />
        </Col>
        <Col>
          <Label htmlFor="ach-account-type">Account type</Label>
          <Input
            type="select"
            id="ach-account-type"
            name="achAccountType"
            value={achAccountType}
            ref={selectRef}
            onChange={handleOnFormFieldChange}>
            {ACH_ACCOUNT_TYPES.map(accountType => (
              <option key={accountType.value} value={accountType.value}>
                {accountType.text}
              </option>
            ))}
          </Input>
        </Col>
      </FormGroup>
    </Fragment>
  )
}

export default AchForm
