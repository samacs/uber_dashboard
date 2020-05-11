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
  requireTodayMoveIn,
  actions: { moveInCostsFormFieldChanged },
  useAnyDate,
}) => {
  const handleOnDateChanged = (name, date) => {
    moveInCostsFormFieldChanged(name, moment(date).format())
  }

  const isBeforeDate = (date, beforeDate) => moment(date).isBefore(beforeDate)

  const minDate = requireTodayMoveIn
    ? dateMoveIn
    : isBeforeDate(dateMoveIn, dateNeeded)
    ? dateNeeded
    : dateMoveIn

  const selectedDate = requireTodayMoveIn
    ? dateMoveIn
    : isBeforeDate(dateMoveIn, dateNeeded)
    ? dateNeeded
    : dateMoveIn

  return (
    <Fragment>
      <Col md="3">
        <Label htmlFor="date-needed">Date needed</Label>
        <FormGroup>
          <DatePicker
            className="form-control"
            selected={moment(dateNeeded).toDate()}
            onChange={date => handleOnDateChanged('dateNeeded', date)}
            minDate={useAnyDate ? null : new Date()}
          />
          <MoveInDateSetter dateFieldName="dateNeeded" />
        </FormGroup>
      </Col>
      <Col md="3">
        <Label htmlFor="date-move-in">Date move in</Label>
        <FormGroup>
          <DatePicker
            className="form-control"
            selected={moment(selectedDate).toDate()}
            onChange={date => handleOnDateChanged('dateMoveIn', date)}
            minDate={useAnyDate ? null : moment(minDate).toDate()}
            maxDate={useAnyDate ? null : moment(dateMoveIn)}
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
  useAnyDate: PropTypes.bool.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(DatesSelector)
