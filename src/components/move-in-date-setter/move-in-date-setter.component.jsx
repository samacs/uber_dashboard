import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createStructuredSelector } from 'reselect'
import { Button } from 'reactstrap'
import Moment from 'react-moment'

import { selectReservation } from '../../reducers/insurance-data/insurance-data.selectors'
import * as moveInCostsActions from '../../reducers/move-in-costs/move-in-costs.actions'

const mapStateToProps = createStructuredSelector({
  reservation: selectReservation,
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...moveInCostsActions }, dispatch),
})

const MoveInDateSetter = ({
  reservation,
  dateFieldName,
  actions: { moveInCostsFormFieldChanged },
}) => (
  <Fragment>
    {reservation ? (
      <div className="text-right">
        <Button
          className="btn-selector text-right"
          color="link"
          size="sm"
          onClick={() =>
            moveInCostsFormFieldChanged(
              dateFieldName,
              reservation[dateFieldName],
            )
          }>
          <Moment format="MM/DD/YYYY">{reservation[dateFieldName]}</Moment>
        </Button>
      </div>
    ) : null}
  </Fragment>
)

MoveInDateSetter.propTypes = {
  reservation: PropTypes.object,
  dateFieldName: PropTypes.string.isRequired,
  actions: PropTypes.shape({
    moveInCostsFormFieldChanged: PropTypes.func.isRequired,
  }),
}

export default connect(mapStateToProps, mapDispatchToProps)(MoveInDateSetter)
