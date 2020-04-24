import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Container, Row, Col, TabContent } from 'reactstrap'

import InsuranceData from '../insurance-data/insurance-data.component'
import MoveInCosts from '../move-in-costs/move-in-costs.component'
import RentNowAfter from '../rent-now-after/rent-now-after.component'
import ShortRentNow from '../short-rent-now/short-rent-now.component'
import UpdateTenant from '../update-tenant/update-tenant.component'

const EndpointTabs = ({ activeTab }) => (
  <div
    className={classNames([
      'd-flex justify-content-between',
      'flex-wrap',
      'flex-md-nowrap',
      'align-items-center',
      'pt-3',
      'pb-2',
      'mb-3',
    ])}>
    <Container fluid>
      <Row>
        <Col>
          <TabContent activeTab={activeTab}>
            <InsuranceData />
            <MoveInCosts />
            <RentNowAfter />
            <ShortRentNow />
            <UpdateTenant />
          </TabContent>
        </Col>
      </Row>
    </Container>
  </div>
)

EndpointTabs.propTypes = {
  activeTab: PropTypes.string.isRequired,
}

export default EndpointTabs
