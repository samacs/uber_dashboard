import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createStructuredSelector } from 'reselect'
import { FormGroup, Col, Label } from 'reactstrap'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'

import { selectReservation } from '../../reducers/insurance-data/insurance-data.selectors'
import * as moveInCostsActions from '../../reducers/move-in-costs/move-in-costs.actions'
import MoveInDateSetter from '../move-in-date-setter/move-in-date-setter.component'

const mapStateToProps = createStructuredSelector({
  reservation: selectReservation,
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...moveInCostsActions }, dispatch),
})

const DatesSelector = ({
  dateNeeded,
  dateMoveIn,
  actions: { moveInCostsFormFieldChanged },
}) => {
  const handleOnDateChanged = (name, date) => {
    moveInCostsFormFieldChanged(name, moment(date).format())
  }

  const isBeforeDate = (date, beforeDate) => moment(date).isBefore(beforeDate)

  return (
    <Fragment>
      <Col md="3">
        <Label htmlFor="date-needed">Date needed</Label>
        <FormGroup>
          <DatePicker
            className="form-control"
            selected={moment(dateNeeded).toDate()}
            onChange={date => handleOnDateChanged('dateNeeded', date)}
            minDate={new Date()}
          />
          <MoveInDateSetter dateFieldName="dateNeeded" />
        </FormGroup>
      </Col>
      <Col md="3">
        <Label htmlFor="date-move-in">Date move in</Label>
        <FormGroup>
          <DatePicker
            className="form-control"
            selected={moment(
              isBeforeDate(dateMoveIn, dateNeeded) ? dateNeeded : dateMoveIn,
            ).toDate()}
            onChange={date => handleOnDateChanged('dateMoveIn', date)}
            minDate={moment(
              isBeforeDate(dateMoveIn, dateNeeded) ? dateNeeded : new Date(),
            ).toDate()}
          />
          <MoveInDateSetter dateFieldName="dateMoveIn" />
        </FormGroup>
      </Col>
    </Fragment>
  )
}

DatesSelector.propTypes = {
  dateNeeded: PropTypes.string,
  dateMoveIn: PropTypes.string,
  actions: PropTypes.shape({
    moveInCostsFormFieldChanged: PropTypes.func.isRequired,
  }).isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(DatesSelector)
