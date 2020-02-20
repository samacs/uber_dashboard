import React, { Fragment, useState } from 'react'
import { FormGroup, Col, Label, Input } from 'reactstrap'
import InputMask from 'react-input-mask'
import moment from 'moment'
import creditCardType from 'credit-card-type'

import { CREDIT_CARD_TYPES } from '../../reducers/global/global.constants'

const CreditCardForm = ({ creditCardInfo, onChange }) => {
  const {
    nameOnCard,
    creditCardNumber,
    creditCardCvvNumber,
    creditCardExpYear,
    creditCardExpMonth,
  } = creditCardInfo
  const formattedYear = creditCardExpYear.toString().substring(2)
  const formattedMonth = creditCardExpMonth.toString().padStart(2, '0')
  const [creditCardExpDate, setCreditCardExpDate] = useState(
    `${formattedMonth}/${formattedYear}`,
  )

  const handleOnCreditCardExpDateChanged = e => {
    const { value } = e.target
    setCreditCardExpDate(value)

    const match = /^\d{2}\/\d{2}/.exec(value)
    if (match) {
      const date = match[0].split('/')
      const month = date[0]
      const year = `${moment()
        .year()
        .toString()
        .substring(0, 2)}${date[1]}`
      onChange('creditCardExpYear', year)
      onChange('creditCardExpMonth', month)
    }
  }

  const creditCardIdfromType = type => CREDIT_CARD_TYPES[type]

  const hanldeOnCreditCardNumberChanged = e => {
    const { name, value } = e.target
    onChange(name, value)

    const match = /^\d{4}/.exec(value)
    if (match) {
      const type = creditCardType(value)
      if (type.length) {
        const id = creditCardIdfromType(type[0].type)
        onChange('creditCardType', id)
      }
    }
  }

  const handleOnFormFieldChanged = e => {
    const { name, value } = e.target
    onChange(name, value)
  }

  return (
    <Fragment>
      <h3>Credit card information</h3>
      <FormGroup row>
        <Col>
          <Label htmlFor="name-on-card">Name on card</Label>
          <Input
            id="name-on-card"
            name="nameOnCard"
            value={nameOnCard}
            onChange={handleOnFormFieldChanged}
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Col md="6">
          <Label htmlFor="credit-card-number">
            Credit or debit card number
          </Label>
          <Input
            id="credit-card-number"
            name="creditCardNumber"
            value={creditCardNumber}
            onChange={hanldeOnCreditCardNumberChanged}
            mask="9999 9999 9999 9999"
            maskChar=" "
            tag={InputMask}
          />
        </Col>
        <Col md="3">
          <Label htmlFor="credit-card-exp-date">Expiration date</Label>
          <Input
            id="credit-card-exp-date"
            name="creditCardExpDate"
            value={creditCardExpDate}
            onChange={handleOnCreditCardExpDateChanged}
            mask="99/99"
            maskChar=" "
            tag={InputMask}
          />
        </Col>
        <Col md="3">
          <Label htmlFor="credit-card-cvv-number">CVV</Label>
          <Input
            id="credit-card-cvv-number"
            name="creditCardCvvNumber"
            value={creditCardCvvNumber}
            onChange={handleOnFormFieldChanged}
            mask="999"
            maskChar=" "
            tag={InputMask}
          />
        </Col>
      </FormGroup>
    </Fragment>
  )
}

export default CreditCardForm
