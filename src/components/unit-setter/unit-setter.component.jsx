import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Button } from 'reactstrap'

import { selectUnit } from '../../reducers/insurance-data/insurance-data.selectors'

const mapStateToProps = createStructuredSelector({
  unit: selectUnit,
})

const UnitSetter = ({ unit, setter, includeUnitName }) => {
  const setUnit = () => {
    setter('unitId', unit.unitId)
    if (includeUnitName) {
      setter('unitName', unit.unitName)
    }
  }

  return (
    <Fragment>
      {unit ? (
        <div className="text-right">
          <Button
            className="btn-selector"
            color="link"
            size="sm"
            onClick={setUnit}>
            Unit {unit.unitName} (ID: {unit.unitId})
          </Button>
        </div>
      ) : null}
    </Fragment>
  )
}

UnitSetter.propTypes = {
  unit: PropTypes.shape({
    unitId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    unitName: PropTypes.string,
  }),
  setter: PropTypes.func.isRequired,
}

export default connect(mapStateToProps)(UnitSetter)
