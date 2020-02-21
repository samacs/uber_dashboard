import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createStructuredSelector } from 'reselect'
import { TabPane, Col, FormGroup, Label, Input, Form, Button } from 'reactstrap'
import { objectToFormData } from 'object-to-formdata'

// import { HUB_URL } from '../../config/backend.config'
import {
  selectWaitingId,
  selectEncryptedWaitingId,
  selectEncrypt,
  selectAb,
  selectLocationUrn,
  selectClientUrn,
} from '../../reducers/global/global.selectors'
import { selectInsurancePlans } from '../../reducers/insurance-data/insurance-data.selectors'
import {
  selectForm,
  selectIsRequesting,
  selectCreditCardInfo,
  selectAchInfo,
  selectBillingAddressInfo,
  selectCustomer,
} from '../../reducers/rent-now-after/rent-now-after.selectors'
import * as globalActions from '../../reducers/global/global.actions'
import * as rentNowAfterActions from '../../reducers/rent-now-after/rent-now-after.actions'
import PaymentMethodSelector from '../payment-method-selector/payment-method-selector.component'
import BillingAddressForm from '../billing-address-form/billing-address-form.component'
import UnitSetter from '../unit-setter/unit-setter.component'
import ConcessionSetter from '../concession-setter/concession-setter.component'
import RentNowDates from '../rent-now-dates/rent-now-dates.component'
import InsuranceCoverageSelector from '../insurance-coverage-selector/insurance-coverage-selector.component'
import TenantSetter from '../tenant-setter/tenant-setter.component'
import TotalSetter from '../total-setter/total-setter.component'
import CustomerForm from '../customer-form/customer-form.component'

const mapStateToProps = createStructuredSelector({
  waitingId: selectWaitingId,
  encryptedWaitingId: selectEncryptedWaitingId,
  encrypt: selectEncrypt,
  ab: selectAb,
  locationUrn: selectLocationUrn,
  clientUrn: selectClientUrn,
  insurancePlans: selectInsurancePlans,
  form: selectForm,
  creditCardInfo: selectCreditCardInfo,
  achInfo: selectAchInfo,
  billingAddressInfo: selectBillingAddressInfo,
  isRequesting: selectIsRequesting,
  customer: selectCustomer,
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    { ...rentNowAfterActions, ...globalActions },
    dispatch,
  ),
})

const tabId = 'rent-now-after'

const RentNowAfter = ({
  waitingId,
  encryptedWaitingId,
  encrypt,
  ab,
  locationUrn,
  clientUrn,
  insurancePlans,
  form,
  creditCardInfo,
  achInfo,
  billingAddressInfo,
  isRequesting,
  customer,
  actions: {
    rentNowAfterFormFieldChanged,
    globalFormFieldChanged,
    rentNowAfterRequest,
  },
}) => {
  const {
    unitId,
    unitName,
    tenantId,
    concessionId,
    insuranceCoverageId,
    total,
    startDate,
    endDate,
    neededByDate,
    autoPaySelected,
    paperlessSelected,
  } = form

  const handleOnWaitingIdChange = e => {
    const { name, value } = e
    globalFormFieldChanged(name, value)
  }

  const handleOnFieldChanged = e => {
    const { name, value } = e.target
    rentNowAfterFormFieldChanged(name, value)
  }

  const handleOnCheckboxChange = e => {
    const { name, checked } = e.target
    rentNowAfterFormFieldChanged(name, checked)
  }

  const handleOnSubmit = e => {
    e.preventDefault()

    const params = {
      // locationUrn,
      // waitingId: encrypt ? encryptedWaitingId : waitingId,
      // ab: encrypt ? ab : null,
      // ...form.toJS(),
      // leadUid: moment().format('X'),
      // createdAt: moment().format(),
      // locationUid: `${HUB_URL}/clients/${clientUrn}/locations/${locationUrn}`,
      // clientUid: `${HUB_URL}/clients/${clientUrn}`,
      'p-first-name': form.firstName,
      'p-last-name': form.lastName,
      'u-email': form.email,
      'p-tel': form.phone,
      'p-waiting-id': encrypt ? encryptedWaitingId : waitingId,
      'p-unit-id': form.unitId,
      'p-unit-name': form.unitName,
      'p-tenant-id': form.tenantId,
      'p-total': form.total.replace(/\$/gi, ''),
      'p-start-date': form.startDate,
      'p-end-date': form.endDate,
      'p-address1': form.billingAddressLine1,
      'p-address2': form.billingAddressLine2,
      'p-postal-code': form.billingZip,
      'p-city': form.billingCity,
      'p-state-code': form.billingStateCode,
      'p-auto-pay-selected': form.autoPaySelected,
      'p-paperless-selected': form.paperlessSelected,
      'p-needed-by-date': form.neededByDate,
      'p-gate-code-prefix': '*',
      'p-gate-code-suffix': '#',
      test_mode: false,
      'p-concession-id': form.concessionId,
      'p-insurance-coverage-id': form.insuranceCoverageId,
      'p-card-type': form.creditCardType,
      'p-card-number': form.creditCardNumber.replace(/\s+/gi, ''),
      'p-card-exp-date-month': form.creditCardExpMonth,
      'p-card-exp-date-year': form.creditCardExpYear,
      'p-cvv-number': form.creditCardCvvNumber,
      'p-credit-card-name': form.nameOnCard,
      'p-ab': encrypt ? ab : null,
      ga_client_id: '131441893.1581704404',
    }
    const data = objectToFormData(params)
    rentNowAfterRequest(data)
  }

  return (
    <TabPane tabId={tabId}>
      <h1 className="h2">RentNowAfterReservation</h1>
      <Form onSubmit={handleOnSubmit}>
        <FormGroup row>
          <Col md="4">
            <Label htmlFor="rent-now-after-waiting-id">Waiting ID</Label>
            <Input
              id="rent-now-after-waiting-id"
              name="waitingId"
              value={waitingId}
              onChange={handleOnWaitingIdChange}
            />
            <span style={{ visibility: encrypt ? 'visible' : 'hidden' }}>
              <code>{encryptedWaitingId}</code>
            </span>
          </Col>
          <Col md="4">
            <Label htmlFor="rent-now-unit-id">Unit ID </Label>
            <Input
              id="rent-now-unit-id"
              name="unitId"
              value={unitId}
              onChange={handleOnFieldChanged}
            />
            <UnitSetter includeUnitName setter={rentNowAfterFormFieldChanged} />
          </Col>
          <Col md="4">
            <Label htmlFor="unit-name">Unit name</Label>
            <Input
              id="unit-name"
              name="unitName"
              value={unitName}
              onChange={handleOnFieldChanged}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="4">
            <Label htmlFor="rent-now-after-concession-id">Concession ID</Label>
            <Input
              id="rent-now-after-concession-id"
              name="concessionId"
              value={concessionId}
              onChange={handleOnFieldChanged}
            />
            <ConcessionSetter setter={rentNowAfterFormFieldChanged} />
          </Col>
          <Col md="4">
            <Label htmlFor="tenant-id">Tenant ID</Label>
            <Input
              id="tenant-id"
              name="tenantId"
              value={tenantId}
              onChange={handleOnFieldChanged}
            />
            <TenantSetter setter={rentNowAfterFormFieldChanged} />
          </Col>
          <Col md="4">
            <Label htmlFor="total">Total</Label>
            <Input
              id="total"
              name="total"
              value={total}
              onChange={handleOnFieldChanged}
            />
            <TotalSetter setter={rentNowAfterFormFieldChanged} />
          </Col>
        </FormGroup>
        <RentNowDates
          startDate={startDate}
          endDate={endDate}
          neededByDate={neededByDate}
          onChange={rentNowAfterFormFieldChanged}
        />
        <FormGroup row>
          <Col md="6">
            <InsuranceCoverageSelector
              value={insuranceCoverageId}
              onChange={rentNowAfterFormFieldChanged}
              name="insuranceCoverageId"
              id="rent-now-after-insurance-coverage-id"
              insurancePlans={insurancePlans}
            />
          </Col>
        </FormGroup>
        <CustomerForm
          customer={customer}
          onChange={rentNowAfterFormFieldChanged}
        />
        <PaymentMethodSelector
          creditCardInfo={creditCardInfo}
          achInfo={achInfo}
          onChange={rentNowAfterFormFieldChanged}
        />
        <BillingAddressForm
          billingAddressInfo={billingAddressInfo}
          onChange={handleOnFieldChanged}
        />
        <FormGroup row>
          <Col md="3">
            <FormGroup check>
              <Label check htmlFor="auto-pay-selected">
                <Input
                  id="auto-pay-selected"
                  name="autoPaySelected"
                  type="checkbox"
                  checked={autoPaySelected}
                  onChange={handleOnCheckboxChange}
                />{' '}
                Autopay?
              </Label>
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup check>
              <Label check htmlFor="paperless-selected">
                <Input
                  id="paperless-selected"
                  name="paperlessSelected"
                  type="checkbox"
                  checked={paperlessSelected}
                  onChange={handleOnCheckboxChange}
                />{' '}
                Paperless?
              </Label>
            </FormGroup>
          </Col>
        </FormGroup>
        <div className="pt-2">
          <Button disabled={isRequesting} color="primary">
            Submit lead
          </Button>
        </div>
      </Form>
    </TabPane>
  )
}

RentNowAfter.propTypes = {
  waitingId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  encryptedWaitingId: PropTypes.string,
  encrypt: PropTypes.bool.isRequired,
  ab: PropTypes.string,
  locationUrn: PropTypes.string,
  clientUrn: PropTypes.string,
  isRequesting: PropTypes.bool.isRequired,
  form: PropTypes.object.isRequired,
  actions: PropTypes.shape({
    rentNowAfterFormFieldChanged: PropTypes.func.isRequired,
    rentNowAfterRequest: PropTypes.func.isRequired,
    globalFormFieldChanged: PropTypes.func.isRequired,
  }),
}

export default connect(mapStateToProps, mapDispatchToProps)(RentNowAfter)
