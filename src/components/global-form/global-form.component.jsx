import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  Container,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Collapse,
  Button,
} from 'reactstrap'
import { createStructuredSelector } from 'reselect'

import {
  selectLocationUrn,
  selectClientUrn,
  selectEncryptClientKey,
  selectEncrypt,
  selectAb,
  selectAccessToken,
} from '../../reducers/global/global.selectors'
import { HUB_URL } from '../../config/backend.config'
import * as globalActions from '../../reducers/global/global.actions'

const mapStateToProps = createStructuredSelector({
  locationUrn: selectLocationUrn,
  clientUrn: selectClientUrn,
  encrypt: selectEncrypt,
  encryptClientKey: selectEncryptClientKey,
  selectEncryptClientKey: selectEncryptClientKey,
  ab: selectAb,
  accessToken: selectAccessToken,
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...globalActions }, dispatch),
})

const GlobalForm = ({
  locationUrn,
  clientUrn,
  encrypt,
  encryptClientKey,
  ab,
  accessToken,
  actions: { globalFormFieldChanged, globalEncryptWaitingId },
}) => {
  const handleOnFormFieldChange = e => {
    const { name, value } = e.target
    globalFormFieldChanged(name, value)
  }

  const handleOnCheckboxChange = e => {
    const { name, checked } = e.target
    globalFormFieldChanged(name, checked)
  }

  return (
    <Container fluid>
      <Row>
        <Col>
          <h1 className="h2">Global parameters</h1>
          <FormGroup row>
            <Col>
              <Label htmlFor="access-token">Access token</Label>
              <Input
                name="accessToken"
                onChange={handleOnFormFieldChange}
                value={accessToken}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col md="6">
              <Label htmlFor="client-urn">Client URN</Label>
              <Input
                name="clientUrn"
                onChange={handleOnFormFieldChange}
                id="client-urn"
                value={clientUrn}
              />
            </Col>
            <Col md="6">
              <Label htmlFor="location-urn">Location URN</Label>
              <Input
                name="locationUrn"
                onChange={handleOnFormFieldChange}
                id="location-urn"
                value={locationUrn}
              />
            </Col>
          </FormGroup>
          <Row>
            <Col>
              <code>{`${HUB_URL}/clients/${clientUrn}/locations/${locationUrn}`}</code>
            </Col>
          </Row>
          <FormGroup row check>
            <Col md="3">
              <Label check>
                <Input
                  name="encrypt"
                  type="checkbox"
                  checked={encrypt}
                  onChange={handleOnCheckboxChange}
                />{' '}
                Use encryption?
              </Label>
            </Col>
          </FormGroup>
          <Collapse isOpen={encrypt}>
            <Row>
              <Col>
                <Label htmlFor="encrypt-client-key">Encrypt Client Key</Label>
                <Input
                  name="encryptClientKey"
                  onChange={handleOnFormFieldChange}
                  id="encrypt-client-key"
                  value={encryptClientKey}
                />
              </Col>
              <Col>
                <Label htmlFor="ab">
                  <code>ab</code> parameter (IV)
                </Label>
                <Input name="ab" readOnly id="ab" value={ab} />
              </Col>
            </Row>
            <Row>
              <Col className="mt-2">
                <Button color="primary" onClick={globalEncryptWaitingId}>
                  Encrypt Waiting ID
                </Button>
              </Col>
            </Row>
          </Collapse>
        </Col>
      </Row>
    </Container>
  )
}

GlobalForm.propTypes = {
  locationUrn: PropTypes.string.isRequired,
  encrypt: PropTypes.bool.isRequired,
  encryptClientKey: PropTypes.string,
  ab: PropTypes.string,
  actions: PropTypes.shape({
    globalFormFieldChanged: PropTypes.func.isRequired,
    globalEncryptWaitingId: PropTypes.func.isRequired,
  }).isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(GlobalForm)
