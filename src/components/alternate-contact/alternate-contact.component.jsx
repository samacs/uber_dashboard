import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createStructuredSelector } from 'reselect'
import { FormGroup, Button, Collapse, Col, Label, Input, Row } from 'reactstrap'

import * as updateTenantActions from '../../reducers/update-tenant/update-tenant.actions'
import { selectAlternateContact } from '../../reducers/update-tenant/update-tenant.selectors'
import { US_STATES } from '../../reducers/global/global.constants'

const mapStateToProps = createStructuredSelector({
  showAlternateContact: selectAlternateContact,
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...updateTenantActions }, dispatch),
})

const AlternateContact = ({
  form,
  onChange,
  showAlternateContact,
  actions: { updateTenantSetAlternateContact },
}) => {
  const {
    firstNameAlt,
    lastNameAlt,
    phoneAlt,
    addressAlt,
    address1Alt,
    cityAlt,
    stateAlt,
    postalCodeAlt,
    emailAlt,
  } = form

  return (
    <div>
      <Row>
        <Col md="8">
          <h3>Alternate contact</h3>
        </Col>
        <Col className="text-right" md="4">
          <Button
            color="primary"
            onClick={() =>
              updateTenantSetAlternateContact(!showAlternateContact)
            }
            style={{ marginBottom: '1rem' }}>
            {showAlternateContact
              ? 'Hide alternate contact'
              : 'Show alternate contact'}
          </Button>
        </Col>
      </Row>
      <Collapse isOpen={showAlternateContact}>
        <FormGroup row>
          <Col md="6">
            <Label htmlFor="update-tenant-first-name-alt">First name</Label>
            <Input
              id="update-tenant-first-name-alt"
              name="firstNameAlt"
              value={firstNameAlt}
              onChange={onChange}
            />
          </Col>
          <Col md="6">
            <Label htmlFor="update-tenant-last-name-alt">Last name</Label>
            <Input
              id="update-tenant-last-name-alt"
              name="lastNameAlt"
              value={lastNameAlt}
              onChange={onChange}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col>
            <Label htmlFor="update-tenant-address-alt">Street address</Label>
            <Input
              type="text"
              id="update-tenant-address-alt"
              name="addressAlt"
              value={addressAlt}
              onChange={onChange}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col>
            <Label htmlFor="update-tenant-address1-alt">
              Unit #, Suite #, etc.
            </Label>
            <Input
              type="text"
              id="update-tenant-address1-alt"
              value={address1Alt}
              onChange={onChange}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="6">
            <Label htmlFor="update-tenant-city-alt">City</Label>
            <Input
              type="text"
              id="update-tenant-city-alt"
              name="cityAlt"
              value={cityAlt}
              onChange={onChange}
            />
          </Col>
          <Col md="3">
            <Label htmlFor="update-tenant-state-alt">State</Label>
            <Input
              type="select"
              id="update-tenant-state-alt"
              value={stateAlt}
              name="stateAlt"
              onChange={onChange}>
              {US_STATES.map(state => (
                <option key={state.code} value={state.code}>
                  {state.name}
                </option>
              ))}
            </Input>
          </Col>
          <Col md="3">
            <Label htmlFor="update-tenant-postal-code-alt">Zip code</Label>
            <Input
              type="text"
              id="update-tenant-postal-code-alt"
              name="postalCodeAlt"
              value={postalCodeAlt}
              onChange={onChange}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="4">
            <Label htmlFor="update-tenant-phone-alt">Phone number</Label>
            <Input
              type="phone"
              id="update-tenant-phone-alt"
              name="phoneAlt"
              value={phoneAlt}
              onChange={onChange}
            />
          </Col>
          <Col md="8">
            <Label htmlFor="update-tenant-email-alt">Email address</Label>
            <Input
              type="email"
              id="update-tenant-email-alt"
              name="emailAlt"
              value={emailAlt}
              onChange={onChange}
            />
          </Col>
        </FormGroup>
      </Collapse>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(AlternateContact)
