import React from 'react'

import { FormGroup, Col, Label } from 'reactstrap'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'

const RentNowDates = ({ startDate, endDate, neededByDate, onChange }) => {
  const handleOnDateChanged = (name, date) => {
    onChange(name, moment(date).format('YYYY-MM-DD'))
  }

  const isBeforeDate = (date, beforeDate) => moment(date).isBefore(beforeDate)

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
        </FormGroup>
      </Col>
    </FormGroup>
  )
}

export default RentNowDates
