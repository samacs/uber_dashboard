import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createStructuredSelector } from 'reselect'
import { Col, TabPane, FormGroup, Label, Input, Button, Form } from 'reactstrap'

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
  selectResponse,
} from '../../reducers/insurance-data/insurance-data.selectors'
import * as globalActions from '../../reducers/global/global.actions'
import * as insuranceDataActions from '../../reducers/insurance-data/insurance-data.actions'

const mapStateToProps = createStructuredSelector({
  locationUrn: selectLocationUrn,
  waitingId: selectWaitingId,
  encrypt: selectEncrypt,
  encryptedWaitingId: selectEncryptedWaitingId,
  ab: selectAb,
  isRequesting: selectIsRequesting,
  error: selectError,
  response: selectResponse,
  form: selectForm,
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    { ...globalActions, ...insuranceDataActions },
    dispatch,
  ),
})

const tabId = 'insurance-data'

const InsuranceData = ({
  locationUrn,
  waitingId,
  encrypt,
  encryptedWaitingId,
  ab,
  form,
  isRequesting,
  error,
  response,
  actions: {
    globalFormFieldChanged,
    insuranceDataFormFieldChanged,
    insuranceDataRequest,
  },
}) => {
  const handleOnWaitingIdChange = e => {
    const { name, value } = e.target
    globalFormFieldChanged(name, value)
  }

  const handleOnCheckboxChange = e => {
    const { name, checked } = e.target
    insuranceDataFormFieldChanged(name, checked)
  }

  const handleOnSubmit = e => {
    e.preventDefault()

    const params = {
      locationUrn,
      waitingId: encrypt ? encryptedWaitingId : waitingId,
      ab: encrypt ? ab : null,
      requireTodayMoveIn: form.requireTodayMoveIn,
    }
    insuranceDataRequest(params)
  }

  return (
    <TabPane tabId={tabId}>
      <h1 className="h2">TenantUnitConcessionInsuranceData</h1>
      <Form onSubmit={handleOnSubmit}>
        <FormGroup row>
          <Col md="4">
            <Label htmlFor="insurance-data-waiting-id">Waiting ID</Label>
            <Input
              id="insurance-data-waiting-id"
              name="waitingId"
              value={waitingId}
              onChange={handleOnWaitingIdChange}
            />
            <span style={{ visibility: encrypt ? 'visible' : 'hidden' }}>
              <code>{encryptedWaitingId}</code>
            </span>
          </Col>
        </FormGroup>
        <FormGroup row check>
          <Col md="3">
            <Label check id="requireTodayMoveIn">
              <Input
                name="requireTodayMoveIn"
                id="requireTodayMoveIn"
                type="checkbox"
                checked={form.requireTodayMoveIn}
                onChange={handleOnCheckboxChange}
              />{' '}
              Require today move-in?
            </Label>
          </Col>
        </FormGroup>
        <div className="pt-2">
          <Button disabled={isRequesting} color="primary">
            Retrieve insurance data
          </Button>
        </div>
      </Form>
    </TabPane>
  )
}

InsuranceData.propTypes = {
  locationUrn: PropTypes.string,
  waitingId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  encrypt: PropTypes.bool.isRequired,
  encryptedWaitingId: PropTypes.string,
  ab: PropTypes.string,
  form: PropTypes.shape({
    requireTodayMoveIn: PropTypes.bool,
  }).isRequired,
  isRequesting: PropTypes.bool.isRequired,
  error: PropTypes.any,
  response: PropTypes.any,
  actions: PropTypes.shape({
    globalFormFieldChanged: PropTypes.func.isRequired,
    insuranceDataFormFieldChanged: PropTypes.func.isRequired,
    insuranceDataRequest: PropTypes.func.isRequired,
  }).isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(InsuranceData)
