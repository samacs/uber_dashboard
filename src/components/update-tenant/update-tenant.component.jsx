import React from 'react'
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

import {} from '../../reducers/update-tenant/update-tenant.selectors'

const tabId = 'update-tenant-after-payment'

const UpdateTenant = ({}) => {
  return (
    <TabPane tabId={tabId}>
      <h1 className="h2">UpdateTenantAfterPayment</h1>
    </TabPane>
  )
}

export default connect()(UpdateTenant)
