import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Button } from 'reactstrap'

import { selectReservation } from '../../reducers/insurance-data/insurance-data.selectors'

const mapStateToProps = createStructuredSelector({
  reservation: selectReservation,
})

const ConcessionSetter = ({ reservation, setter }) => (
  <Fragment>
    {reservation ? (
      <div className="text-right">
        <Button
          className="btn-selector text-right"
          color="link"
          size="sm"
          onClick={() => setter('concessionId', reservation.concessionId)}>
          {reservation.concessionId}
        </Button>
      </div>
    ) : null}
  </Fragment>
)

ConcessionSetter.propTypes = {
  reservation: PropTypes.object,
  setter: PropTypes.func.isRequired,
}

export default connect(mapStateToProps)(ConcessionSetter)
