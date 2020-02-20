import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createStructuredSelector } from 'reselect'
import { TabPane, Col, FormGroup, Label, Input, Button, Form } from 'reactstrap'

import {
  selectWaitingId,
  selectEncryptedWaitingId,
  selectEncrypt,
  selectAb,
  selectLocationUrn,
} from '../../reducers/global/global.selectors'
import {
  selectForm,
  selectIsRequesting,
  selectError,
} from '../../reducers/move-in-costs/move-in-costs.selectors'
import { selectInsurancePlans } from '../../reducers/insurance-data/insurance-data.selectors'
import * as globalActions from '../../reducers/global/global.actions'
import * as moveInCostsActions from '../../reducers/move-in-costs/move-in-costs.actions'
import InsuranceCoverageSelector from '../insurance-coverage-selector/insurance-coverage-selector.component'
import UnitSetter from '../unit-setter/unit-setter.component'
import ConcessionSetter from '../concession-setter/concession-setter.component'
import DatesSelector from '../dates-selector/dates-selector.component'

const mapStateToProps = createStructuredSelector({
  locationUrn: selectLocationUrn,
  waitingId: selectWaitingId,
  encrypt: selectEncrypt,
  encryptedWaitingId: selectEncryptedWaitingId,
  ab: selectAb,
  error: selectError,
  isRequesting: selectIsRequesting,
  form: selectForm,
  insurancePlans: selectInsurancePlans,
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    { ...globalActions, ...moveInCostsActions },
    dispatch,
  ),
})

const tabId = 'move-in-costs'

const MoveInCosts = ({
  locationUrn,
  waitingId,
  encrypt,
  encryptedWaitingId,
  ab,
  form,
  isRequesting,
  error,
  insurancePlans,
  actions: {
    globalFormFieldChanged,
    moveInCostsFormFieldChanged,
    moveInCostsRequest,
  },
}) => {
  const {
    unitId,
    dateNeeded,
    dateMoveIn,
    insuranceCoverageId,
    concessionId,
    insuranceLabel,
  } = form

  const handleOnWaitingIdChange = e => {
    const { name, value } = e.target
    globalFormFieldChanged(name, value)
  }

  const handleOnFieldChanged = e => {
    const { name, value } = e.target
    moveInCostsFormFieldChanged(name, value)
  }

  const handleOnSubmit = e => {
    e.preventDefault()

    const params = {
      locationUrn,
      waitingId: encrypt ? encryptedWaitingId : waitingId,
      ab: encrypt ? ab : null,
      ...form.toJS(),
    }
    moveInCostsRequest(params)
  }

  return (
    <TabPane tabId={tabId}>
      <h1 className="h2">MoveInCostReservationWithDiscount</h1>
      <Form onSubmit={handleOnSubmit}>
        <FormGroup row>
          <Col md="4">
            <Label htmlFor="move-in-costs-waiting-id">Waiting ID</Label>
            <Input
              id="move-in-costs-waiting-id"
              name="waitingId"
              value={waitingId}
              onChange={handleOnWaitingIdChange}
            />
            <span style={{ visibility: encrypt ? 'visible' : 'hidden' }}>
              <code>{encryptedWaitingId}</code>
            </span>
          </Col>
          <Col md="4">
            <Label htmlFor="unit-id">Unit ID </Label>
            <Input
              id="unit-id"
              name="unitId"
              value={unitId}
              onChange={handleOnFieldChanged}
            />
            <UnitSetter setter={moveInCostsFormFieldChanged} />
          </Col>
          <Col md="4">
            <Label htmlFor="concession-id">Concession ID</Label>
            <Input
              id="concession-id"
              name="concessionId"
              value={concessionId}
              onChange={handleOnFieldChanged}
            />
            <ConcessionSetter setter={moveInCostsFormFieldChanged} />
          </Col>
        </FormGroup>
        <FormGroup row>
          <DatesSelector dateNeeded={dateNeeded} dateMoveIn={dateMoveIn} />
          <Col md="6">
            <InsuranceCoverageSelector
              value={insuranceCoverageId}
              onChange={moveInCostsFormFieldChanged}
              name="insuranceCoverageId"
              id="insurance-coverage-id"
              insurancePlans={insurancePlans}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col>
            <Label htmlFor="insurance-label">Insurance label</Label>
            <Input
              name="insuranceLabel"
              id="insurance-label"
              value={insuranceLabel}
              onChange={handleOnFieldChanged}
            />
          </Col>
        </FormGroup>
        <div className="pt-2">
          <Button disabled={isRequesting} color="primary">
            Retrieve move-in-costs
          </Button>
        </div>
      </Form>
    </TabPane>
  )
}

MoveInCosts.propTypes = {
  locationUrn: PropTypes.string,
  waitingId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  encrypt: PropTypes.bool.isRequired,
  encryptedWaitingId: PropTypes.string,
  ab: PropTypes.string,
  form: PropTypes.shape({
    unitId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    unitName: PropTypes.string,
    tenantId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    dateNeeded: PropTypes.string,
    dateMoveIn: PropTypes.string,
    insuranceCoverageId: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    concessionId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    insuranceLabel: PropTypes.string,
  }).isRequired,
  isRequesting: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  insurancePlans: PropTypes.array.isRequired,
  actions: PropTypes.shape({
    globalFormFieldChanged: PropTypes.func.isRequired,
    moveInCostsFormFieldChanged: PropTypes.func.isRequired,
    moveInCostsRequest: PropTypes.func.isRequired,
  }).isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(MoveInCosts)
