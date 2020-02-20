import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createStructuredSelector } from 'reselect'
import { NavItem, NavLink } from 'reactstrap'

import * as globalActions from '../../reducers/global/global.actions'
import { selectActiveTab } from '../../reducers/global/global.selectors'

const mapStateToProps = createStructuredSelector({
  activeTab: selectActiveTab,
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...globalActions }, dispatch),
})

const SidebarItem = ({
  activeTab,
  item: { title, id },
  actions: { globalSetActiveTab },
}) => (
  <NavItem>
    <NavLink
      href={`#${id}`}
      data-toggle="tab"
      role="tab"
      active={id === activeTab}
      onClick={() => globalSetActiveTab(id)}>
      {title}
    </NavLink>
  </NavItem>
)

SidebarItem.propTypes = {
  activeTab: PropTypes.string.isRequired,
  item: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
  }),
  actions: PropTypes.shape({
    globalSetActiveTab: PropTypes.func.isRequired,
  }).isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(SidebarItem)
