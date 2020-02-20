import React from 'react'
import PropTypes from 'prop-types'
import { Nav } from 'reactstrap'

import SidebarItem from '../sidebar-item/sidebar-item.component'

const SidebarMenu = ({ items }) => (
  <Nav className="flex-column" tabs vertical>
    {items.map(item => (
      <SidebarItem key={item.id} item={item} />
    ))}
  </Nav>
)

SidebarMenu.propTypes = {
  items: PropTypes.array.isRequired,
}

export default SidebarMenu
