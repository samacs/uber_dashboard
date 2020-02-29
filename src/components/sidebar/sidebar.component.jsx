import React from 'react'
import { Nav } from 'reactstrap'

import SidebarMenu from '../sidebar-menu/sidebar-menu.component'

const menuItems = [
  {
    title: 'TenantUnitConcessionInsuranceData',
    id: 'insurance-data',
  },
  {
    title: 'MoveInCostReservationWithDiscount',
    id: 'move-in-costs',
  },
  {
    title: 'RentNowAfterReservation',
    id: 'rent-now-after',
  },
  {
    title: 'UpdateTenantAfterPayment',
    id: 'update-tenant-after-payment',
  },
  {
    title: 'ShortReservationToRentNow',
    id: 'short-rent-now',
  },
]

const Sidebar = () => (
  <Nav tag="nav" className="col-md-2 d-none d-md-block bg-light sidebar">
    <div className="sidebar-sticky">
      <SidebarMenu items={menuItems} />
    </div>
  </Nav>
)

export default Sidebar
