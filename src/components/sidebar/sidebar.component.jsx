import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Nav } from 'reactstrap'

import { selectLinks } from '../../reducers/global/global.selectors'
import SidebarMenu from '../sidebar-menu/sidebar-menu.component'

const mapStateToProps = createStructuredSelector({
  items: selectLinks,
})

const Sidebar = ({ items }) => (
  <Nav tag="nav" className="col-md-2 d-none d-md-block bg-light sidebar">
    <div className="sidebar-sticky">
      <SidebarMenu items={items} />
    </div>
  </Nav>
)

Sidebar.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default connect(mapStateToProps)(Sidebar)
