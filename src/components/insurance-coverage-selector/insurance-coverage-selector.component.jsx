import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createStructuredSelector } from 'reselect'
import { FormGroup, Label, Input, Button } from 'reactstrap'

import { selectUseInsurancePlans } from '../../reducers/move-in-costs/move-in-costs.selectors'
import * as moveInCostsActions from '../../reducers/move-in-costs/move-in-costs.actions'

const mapStateToProps = createStructuredSelector({
  useInsurancePlans: selectUseInsurancePlans,
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...moveInCostsActions }, dispatch),
})

const InsuranceCoverageSelector = ({
  insurancePlans,
  onChange,
  name,
  id,
  value,
  useInsurancePlans,
  actions: { moveInCostsSetUseInsurancePlans },
}) => {
  const showSelector = insurancePlans && insurancePlans.length > 0
  const formatInsurancePlan = insurancePlan =>
    `Up to ${insurancePlan.coverageAmount} of Coverage - ${insurancePlan.coverageAmount} / mo.`
  const selectRef = useRef()

  const onClick = () => {
    moveInCostsSetUseInsurancePlans(!useInsurancePlans)
  }

  useEffect(() => {
    const forceUpdate =
      useInsurancePlans && value === '' && showSelector && selectRef.current
    if (forceUpdate) {
      const defaultValue = insurancePlans[0].insuranceCoverageId
      onChange(name, defaultValue)
    }
  })

  const handleOnChange = e => {
    const { name, value } = e.target
    onChange(name, value)
  }

  return (
    <FormGroup>
      <Label htmlFor={id}>Insurance coverage</Label>
      {useInsurancePlans ? (
        <Input
          type="select"
          name={name}
          id={id}
          onChange={handleOnChange}
          ref={selectRef}
          value={value}>
          {insurancePlans.map(({ insuranceCoverageId, ...insurancePlan }) => (
            <option key={insuranceCoverageId} value={insuranceCoverageId}>
              {formatInsurancePlan(insurancePlan)}
            </option>
          ))}
        </Input>
      ) : (
        <Input name={name} id={id} onChange={handleOnChange} value={value} />
      )}
      {showSelector ? (
        <div className="text-right">
          <Button
            className="btn-selector"
            color="link"
            size="sm"
            onClick={onClick}>
            {useInsurancePlans
              ? 'Use custom insurance coverage ID'
              : "Use reservation's insurance coverage plans"}
          </Button>
        </div>
      ) : null}
    </FormGroup>
  )
}

InsuranceCoverageSelector.propTypes = {
  insurancePlans: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  useInsurancePlans: PropTypes.bool.isRequired,
  actions: PropTypes.shape({
    moveInCostsSetUseInsurancePlans: PropTypes.func.isRequired,
  }),
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InsuranceCoverageSelector)
