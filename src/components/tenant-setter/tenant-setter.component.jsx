import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Button } from 'reactstrap'

import { selectCustomer } from '../../reducers/insurance-data/insurance-data.selectors'

const mapStateToProps = createStructuredSelector({
  customer: selectCustomer,
})

const TenantSetter = ({ customer, setter }) => {
  const setTenantId = () => {
    setter('tenantId', customer.tenantId)
  }

  return (
    <Fragment>
      {customer ? (
        <div className="text-right">
          <Button
            className="btn-selector"
            color="link"
            size="sm"
            onClick={setTenantId}>
            {customer.tenantId}
          </Button>
        </div>
      ) : null}
    </Fragment>
  )
}

TenantSetter.propTypes = {
  customer: PropTypes.shape({
    tenantId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  setter: PropTypes.func.isRequired,
}

export default connect(mapStateToProps)(TenantSetter)
