import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Button } from 'reactstrap'
import Moment from 'react-moment'

import { FormGroup, Col, Label } from 'reactstrap'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'
import { selectReservation } from '../../reducers/insurance-data/insurance-data.selectors'
import {
  selectStartDate,
  selectEndDate,
} from '../../reducers/move-in-costs/move-in-costs.selectors'

const mapStateToProps = createStructuredSelector({
  moveInStartDate: selectStartDate,
  moveInEndDate: selectEndDate,
  reservation: selectReservation,
})

const RentNowDates = ({
  startDate,
  endDate,
  neededByDate,
  onChange,
  moveInStartDate,
  moveInEndDate,
  reservation,
}) => {
  const handleOnDateChanged = (name, date) => {
    onChange(name, moment(date).format('YYYY-MM-DD'))
  }

  const isBeforeDate = (date, beforeDate) => moment(date).isBefore(beforeDate)

  const moveInDateSetter = (field, value) => {
    if (value === null) {
      return null
    }
    return (
      <div className="text-right">
        <Button
          className="btn-selector text-right"
          color="link"
          size="sm"
          onClick={() => handleOnDateChanged(field, value)}>
          <Moment format="MM/DD/YYYY">{value}</Moment>
        </Button>
      </div>
    )
  }

  return (
    <FormGroup row>
      <Col md="4">
        <Label htmlFor="start-date">Start date</Label>
        <FormGroup>
          <DatePicker
            className="form-control"
            selected={moment(startDate).toDate()}
            onChange={date => handleOnDateChanged('startDate', date)}
            minDate={new Date()}
          />
          {moveInDateSetter('startDate', moveInStartDate)}
        </FormGroup>
      </Col>
      <Col md="4">
        <Label htmlFor="end-date">End date</Label>
        <FormGroup>
          <DatePicker
            className="form-control"
            selected={moment(endDate).toDate()}
            onChange={date => handleOnDateChanged('endDate', date)}
            minDate={moment(
              isBeforeDate(startDate, endDate) ? startDate : new Date(),
            ).toDate()}
          />
          {moveInDateSetter('endDate', moveInEndDate)}
        </FormGroup>
      </Col>
      <Col md="4">
        <Label htmlFor="needed-by-date">Needed by date</Label>
        <FormGroup>
          <DatePicker
            className="form-control"
            selected={moment(neededByDate).toDate()}
            onChange={date => handleOnDateChanged('neededByDate', date)}
            minDate={new Date()}
          />
          {reservation
            ? moveInDateSetter('neededByDate', reservation.dateNeeded)
            : null}
        </FormGroup>
      </Col>
    </FormGroup>
  )
}

export default connect(mapStateToProps)(RentNowDates)
