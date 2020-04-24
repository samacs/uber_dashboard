import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createStructuredSelector } from 'reselect'
import {
  TabPane,
  Col,
  FormGroup,
  Label,
  Input,
  Form,
  Button,
  Row,
} from 'reactstrap'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'
import humps from 'humps'

import {
  selectLocationUrn,
  selectClientUrn,
} from '../../reducers/global/global.selectors'
import {
  selectForm,
  selectIsRequesting,
  selectVendorLead,
} from '../../reducers/short-rent-now/short-rent-now.selectors'
import * as globalActions from '../../reducers/global/global.actions'
import * as shortRentNowActions from '../../reducers/short-rent-now/short-rent-now.actions'

const mapStateToProps = createStructuredSelector({
  form: selectForm,
  isRequesting: selectIsRequesting,
  locationUrn: selectLocationUrn,
  clientUrn: selectClientUrn,
  vendorLead: selectVendorLead,
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    { ...globalActions, ...shortRentNowActions },
    dispatch,
  ),
})

const tabId = 'short-rent-now'

const ShortRentNow = ({
  form,
  isRequesting,
  locationUrn,
  clientUrn,
  vendorLead,
  actions: {
    shortRentNowFormFieldChanged,
    shortRentNowRequest,
    shortRentNowVendorLeadRequest,
    globalFormFieldChanged,
  },
}) => {
  const {
    firstName,
    lastName,
    phone,
    email,
    message,
    reservationDate,
    storageUnitExternalId,
    rentalRate,
    size,
    promotion,
    amenities,
    locationUid,
    clientUid,
  } = form

  const handleOnSubmit = e => {
    e.preventDefault()

    const params = {
      'p-first-name': form.firstName,
      'p-last-name': form.lastName,
      'p-tel': form.phone,
      'u-email': form.email,
      'p-reservation-date': form.reservationDate,
      'p-unit-external-id': form.storageUnitExternalId,
      'p-rental-rate': form.rentalRate,
      'p-unit-size': form.size,
      'p-spacial-desc': form.promotion,
      'p-amenities': form.amenities,
      'p-special-id': 'what?',
      ga_client_id: '131441893.1581704404',

      locationUrn,
      clientUrn,
      createdAt: moment().format(),
      leadUid: moment().format('X'),
    }
    const formData = new FormData()
    for (let field in params) {
      formData.set(humps.decamelize(field), params[field])
    }
    shortRentNowRequest(formData)
  }

  const handleOnChange = e => {
    const { name, value } = e.target
    shortRentNowFormFieldChanged(name, value)
  }

  const handleOnDateChanged = (field, date) => {
    shortRentNowFormFieldChanged(field, date)
  }

  const retrieveVendorLead = () => {
    shortRentNowVendorLeadRequest(vendorLead.id)
  }

  return (
    <TabPane tabId={tabId}>
      <h1 className="h2">ShortReservationToRentNow</h1>
      <Form onSubmit={handleOnSubmit} name="shortReservationToRentNow">
        <FormGroup row>
          <Col md="6">
            <Label htmlFor="client-uid">Client UID</Label>
            <Input
              type="text"
              id="client-uid"
              name="clientUid"
              value={clientUid}
              onChange={handleOnChange}
            />
          </Col>
          <Col md="6">
            <Label htmlFor="location-uid">Location UID</Label>
            <Input
              type="text"
              id="location-uid"
              name="locationUid"
              value={locationUid}
              onChange={handleOnChange}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="6">
            <Label htmlFor="short-rent-now-first-name">First name</Label>
            <Input
              type="text"
              id="short-rent-now-first-name"
              name="firstName"
              value={firstName}
              onChange={handleOnChange}
            />
          </Col>
          <Col md="6">
            <Label htmlFor="short-rent-now-last-name">Last name</Label>
            <Input
              type="text"
              id="short-rent-now-last-name"
              name="lastName"
              value={lastName}
              onChange={handleOnChange}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="8">
            <Label htmlFor="short-rent-now-email">Email address</Label>
            <Input
              type="email"
              id="short-rent-now-email"
              name="email"
              value={email}
              onChange={handleOnChange}
            />
          </Col>
          <Col md="4">
            <Label htmlFor="short-rent-now-phone">Phone</Label>
            <Input
              type="tel"
              id="short-rent-name-phone"
              name="phone"
              value={phone}
              onChange={handleOnChange}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col>
            <Label htmlFor="short-rent-now-message">Message</Label>
            <Input
              type="textarea"
              id="short-rent-now-message"
              name="message"
              value={message}
              onChange={handleOnChange}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="9">
            <Label htmlFor="storage-unit-external-id">
              Storage Unit External ID
            </Label>
            <Input
              type="text"
              name="storageUnitExternalId"
              id="storage-unit-external-id"
              onChange={handleOnChange}
              value={storageUnitExternalId}
            />
          </Col>
          <Col md="3">
            <Label htmlFor="reservation-date">Reservation date</Label>
            <DatePicker
              className="form-control"
              selected={moment(reservationDate || new Date()).toDate()}
              onChange={date =>
                handleOnDateChanged(
                  'reservationDate',
                  moment(date).format('YYYY-MM-DD'),
                )
              }
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="3">
            <Label htmlFor="rental-rate">Rental Rate</Label>
            <Input
              type="text"
              name="rentalRate"
              id="rental-rate"
              value={rentalRate}
              onChange={handleOnChange}
            />
          </Col>
          <Col md="3">
            <Label htmlFor="size">Size</Label>
            <Input
              type="text"
              name="size"
              id="size"
              value={size}
              onChange={handleOnChange}
            />
          </Col>
          <Col md="3">
            <Label htmlFor="promotion">Promotion</Label>
            <Input
              type="text"
              name="promotion"
              id="promotion"
              value={promotion}
              onChange={handleOnChange}
            />
          </Col>
          <Col md="3">
            <Label htmlFor="amenities">Amenities</Label>
            <Input
              type="text"
              name="amenities"
              id="amenities"
              value={amenities}
              onChange={handleOnChange}
            />
          </Col>
        </FormGroup>
        <div className="pt-2">
          <Row>
            <Col>
              <Button disabled={isRequesting} color="primary">
                Submit lead
              </Button>
            </Col>
            <Col className="text-right">
              <Button
                type="button"
                disabled={isRequesting && !vendorLead}
                color="success"
                className="text-right"
                onClick={retrieveVendorLead}>
                Retrieve lead
              </Button>
            </Col>
          </Row>
        </div>
      </Form>
    </TabPane>
  )
}

ShortRentNow.propTypes = {
  actions: PropTypes.shape({
    shortRentNowFormFieldChanged: PropTypes.func.isRequired,
    shortRentNowRequest: PropTypes.func.isRequired,
  }),
  form: PropTypes.object.isRequired,
  isRequesting: PropTypes.bool.isRequired,
  locationUrn: PropTypes.string.isRequired,
  clientUrn: PropTypes.string.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(ShortRentNow)
