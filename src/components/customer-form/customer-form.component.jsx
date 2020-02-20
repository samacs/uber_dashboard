import React, { Fragment } from 'react'
import { FormGroup, Col, Label, Input } from 'reactstrap'

const CustomerForm = ({ customer, onChange }) => {
  const { firstName, lastName, email, phone } = customer

  const handleOnChange = e => {
    const { name, value } = e.target
    onChange(name, value)
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
        </Col>
      </FormGroup>
    </Fragment>
  )
}

export default CustomerForm
