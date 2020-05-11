import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createStructuredSelector } from 'reselect'
import { Row, Col, Label, Input, FormGroup, Button, Collapse } from 'reactstrap'

import { selectBusinessStorage } from '../../reducers/update-tenant/update-tenant.selectors'
import { updateTenantSetBusinessStorage } from '../../reducers/update-tenant/update-tenant.actions'

const mapStateToProps = createStructuredSelector({
  showBusinessStorage: selectBusinessStorage,
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ updateTenantSetBusinessStorage }, dispatch),
})

const BusinessStorage = ({
  form,
  onChange,
  showBusinessStorage,
  actions: { updateTenantSetBusinessStorage },
}) => {
  const { businessName, businessTaxId } = form

  return (
    <div>
      <Row>
        <Col md="8">
          <h3>Business storage</h3>
        </Col>
        <Col md="4" className="text-right">
          <Button
            color="primary"
            onClick={() => updateTenantSetBusinessStorage(!showBusinessStorage)}
            style={{ marginBottom: '1rem' }}>
            {showBusinessStorage
              ? 'Hide business storage'
              : 'Show business storage'}
          </Button>
        </Col>
      </Row>
      <Collapse isOpen={showBusinessStorage}>
        <FormGroup row>
          <Col md="6">
            <Label htmlFor="update-tenant-business-name">Business name</Label>
            <Input
              type="text"
              id="update-tenant-business-name"
              name="businessName"
              value={businessName}
              onChange={onChange}
            />
          </Col>
          <Col md="6">
            <Label htmlFor="update-tenant-business-tax-id">
              Business Tax ID
            </Label>
            <Input
              type="text"
              id="update-tenant-business-tax-id"
              name="businessTaxId"
              value={businessTaxId}
              onChange={onChange}
            />
          </Col>
        </FormGroup>
      </Collapse>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(BusinessStorage)
