import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { FormGroup, Col, Label, Input, Button } from 'reactstrap'

import { selectCustomer } from '../../reducers/insurance-data/insurance-data.selectors'

const mapStateToProps = createStructuredSelector({
  reservationCustomer: selectCustomer,
})

const CustomerForm = ({ reservationCustomer, customer, onChange }) => {
  const { firstName, lastName, email, phone } = customer

  const handleOnChange = e => {
    const { name, value } = e.target
    onChange(name, value)
  }

  const customerFieldSetter = field => {
    let customerSetter = null
    if (reservationCustomer) {
      customerSetter = (
        <div className="text-right">
          <Button
            className="btn-selector text-right"
            color="link"
            size="sm"
            onClick={() => onChange(field, reservationCustomer[field])}>
            {reservationCustomer[field]}
          </Button>
        </div>
      )
    }
    return customerSetter
  }

  return (
    <Fragment>
      <h3>Customer information</h3>
      <FormGroup row>
        <Col md="6">
          <Label htmlFor="first-name">First name</Label>
          <Input
            type="text"
            id="first-name"
            name="firstName"
            value={firstName}
            onChange={handleOnChange}
          />
          {customerFieldSetter('firstName')}
        </Col>
        <Col md="6">
          <Label htmlFor="last-name">Last name</Label>
          <Input
            type="text"
            id="last-name"
            name="lastName"
            value={lastName}
            onChange={handleOnChange}
          />
          {customerFieldSetter('lastName')}
        </Col>
      </FormGroup>
      <FormGroup row>
        <Col md="8">
          <Label htmlFor="email">Email address</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleOnChange}
          />
          {customerFieldSetter('email')}
        </Col>
        <Col md="4">
          <Label htmlFor="phone">Phone</Label>
          <Input
            type="tel"
            id="phone"
            name="phone"
            value={phone}
            onChange={handleOnChange}
          />
          {customerFieldSetter('phone')}
        </Col>
      </FormGroup>
    </Fragment>
  )
}

export default connect(mapStateToProps)(CustomerForm)
