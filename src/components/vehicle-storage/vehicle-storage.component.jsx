import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createStructuredSelector } from 'reselect'
import { Row, Col, Button, Collapse, FormGroup, Label, Input } from 'reactstrap'

import { selectVehicleStorage } from '../../reducers/update-tenant/update-tenant.selectors'
import { updateTenantSetVehicleStorage } from '../../reducers/update-tenant/update-tenant.actions'

const mapStateToProps = createStructuredSelector({
  showVehicleStorage: selectVehicleStorage,
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ updateTenantSetVehicleStorage }, dispatch),
})

const VehicleStorage = ({
  form,
  onChange,
  showVehicleStorage,
  actions: { updateTenantSetVehicleStorage },
}) => {
  const { vehicleVin } = form

  return (
    <div>
      <Row>
        <Col md="8">
          <h3>Vehicle storage</h3>
        </Col>
        <Col md="4" className="text-right">
          <Button
            color="primary"
            onClick={() => updateTenantSetVehicleStorage(!showVehicleStorage)}
            style={{ marginBottom: '1rem' }}>
            {showVehicleStorage
              ? 'Hide vehicle storage'
              : 'Show vehicle storage'}
          </Button>
        </Col>
      </Row>
      <Collapse isOpen={showVehicleStorage}>
        <FormGroup row>
          <Col>
            <Label htmlFor="update-tenant-vehicle-vin">Vehicle VIN #</Label>
            <Input
              type="text"
              id="update-tenant-vehicle-vin"
              name="vehicleVin"
              value={vehicleVin}
              onChange={onChange}
            />
          </Col>
        </FormGroup>
      </Collapse>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(VehicleStorage)
