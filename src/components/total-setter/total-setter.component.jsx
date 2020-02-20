import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Button } from 'reactstrap'

import { selectTotal } from '../../reducers/move-in-costs/move-in-costs.selectors'

const mapStateToProps = createStructuredSelector({
  total: selectTotal,
})

const TotalSetter = ({ total, setter }) => {
  const setTotal = () => {
    setter('total', total)
  }

  return (
    <Fragment>
      {total !== '' ? (
        <div className="text-right">
          <Button
            className="btn-selector"
            color="link"
            size="sm"
            onClick={setTotal}>
            {total}
          </Button>
        </div>
      ) : null}
    </Fragment>
  )
}

TotalSetter.propTypes = {
  total: PropTypes.string,
  setter: PropTypes.func.isRequired,
}

export default connect(mapStateToProps)(TotalSetter)
