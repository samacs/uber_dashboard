import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createStructuredSelector } from 'reselect'
import { Row, Col, Button, Collapse, FormGroup, Label, Input } from 'reactstrap'

import { updateTenantSetMilitaryMember } from '../../reducers/update-tenant/update-tenant.actions'
import { selectMilitaryMember } from '../../reducers/update-tenant/update-tenant.selectors'

const mapStateToProps = createStructuredSelector({
  showMilitaryMember: selectMilitaryMember,
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ updateTenantSetMilitaryMember }, dispatch),
})

const MilitaryMember = ({
  form,
  onChange,
  showMilitaryMember,
  actions: { updateTenantSetMilitaryMember },
}) => {
  const { commandingOfficerName, commandingOfficerPhone } = form

  return (
    <div>
      <Row>
        <Col md="8">
          <h3>Active member of the military</h3>
        </Col>
        <Col className="text-right" md="4">
          <Button
            color="primary"
            onClick={() => updateTenantSetMilitaryMember(!showMilitaryMember)}
            style={{ marginBottom: '1rem' }}>
            {showMilitaryMember
              ? 'Hide military member'
              : 'Show military member'}
          </Button>
        </Col>
      </Row>
      <Collapse isOpen={showMilitaryMember}>
        <FormGroup row>
          <Col md="6">
            <Label htmlFor="update-tenant-commanding-officer-name">
              Commanding officer full name
            </Label>
            <Input
              type="text"
              id="update-tenant-commanding-officer-name"
              name="commandingOfficerName"
              value={commandingOfficerName}
              onChange={onChange}
            />
          </Col>
          <Col md="6">
            <Label htmlFor="update-tenant-commanding-officer-phone">
              Commanding officer phone
            </Label>
            <Input
              type="text"
              id="update-tenant-commanding-officer-phone"
              name="commandingOfficerPhone"
              value={commandingOfficerPhone}
              onChange={onChange}
            />
          </Col>
        </FormGroup>
      </Collapse>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(MilitaryMember)
