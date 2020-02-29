import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { FormGroup, Col, Label, Input, Button, Row } from 'reactstrap'
import InputMask from 'react-input-mask'
import moment from 'moment'
import creditCardType from 'credit-card-type'

import { CREDIT_CARD_TYPES } from '../../reducers/global/global.constants'
import { selectCustomer } from '../../reducers/insurance-data/insurance-data.selectors'

const mapStateToProps = createStructuredSelector({
  customer: selectCustomer,
})

const future = moment().add(1, 'year')
const defaultCvv = '123'
const defaultYear = future.format('YYYY')
const defaultMonth = future.format('MM')

const creditCardNumbers = {
  invalid: '4111111111111111',
  valid: '4222222222222222',
}

const CreditCardForm = ({ customer, creditCardInfo, onChange }) => {
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

  const creditCardIdFromType = type => CREDIT_CARD_TYPES[type]

  const handleOnCreditCardNumberChanged = e => {
    const { name, value } = e.target
    onChange(name, value)

    const match = /^\d{4}/.exec(value)
    if (match) {
      const type = creditCardType(value)
      if (type.length) {
        const id = creditCardIdFromType(type[0].type)
        onChange('creditCardType', id)
      }
    }
  }

  const handleOnFormFieldChanged = e => {
    const { name, value } = e.target
    onChange(name, value)
  }

  const creditCardSetter = (field, value) => {
    if (value === null) {
      return
    }
    return (
      <div className="text-right">
        <Button
          className="btn-selector text-right"
          color="link"
          size="sm"
          onClick={() => onChange(field, value)}>
          {value}
        </Button>
      </div>
    )
  }

  const setCreditCard = creditCardNumber => {
    const type = creditCardType(creditCardNumber)
    if (type.length) {
      const id = creditCardIdFromType(type[0].type)
      onChange('creditCardType', id)
    }

    onChange('creditCardNumber', creditCardNumber)
    onChange('creditCardExpYear', defaultYear)
    onChange('creditCardExpMonth', defaultMonth)
    onChange('creditCardCvvNumber', defaultCvv)
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
          {customer
            ? creditCardSetter(
                'nameOnCard',
                `${customer.firstName} ${customer.lastName}`,
              )
            : null}
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
            onChange={handleOnCreditCardNumberChanged}
            mask="9999 9999 9999 9999"
            maskChar=" "
            tag={InputMask}
          />
          <Row>
            <Col offset="6" className="text-right">
              <Button
                type="button"
                color="link"
                size="sm"
                onClick={() => setCreditCard(creditCardNumbers.valid)}>
                <span className="text-success">Valid</span>
              </Button>{' '}
              |{' '}
              <Button
                type="button"
                color="link"
                size="sm"
                onClick={() => setCreditCard(creditCardNumbers.invalid)}>
                <span className="text-danger">Invalid</span>
              </Button>
            </Col>
          </Row>
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

export default connect(mapStateToProps)(CreditCardForm)
