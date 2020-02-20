import React, { useState, Fragment } from 'react'
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'

import CreditCardForm from '../credit-card-form/credit-card-form.component'
import AchForm from '../ach-form/ach-form.component'

const PaymentMethodSelector = ({ creditCardInfo, achInfo, onChange }) => {
  const [paymentMethod, setPaymentMethod] = useState('credit-card')

  return (
    <Fragment>
      <Nav pills>
        <NavItem>
          <NavLink
            href="#"
            active={paymentMethod === 'credit-card'}
            data-toggle="pill"
            role="tab"
            onClick={() => setPaymentMethod('credit-card')}>
            Credit card
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            href="#"
            active={paymentMethod === 'ach'}
            data-toggle="pill"
            role="tab"
            onClick={() => setPaymentMethod('ach')}>
            ACH
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={paymentMethod}>
        <TabPane tabId="credit-card">
          <CreditCardForm creditCardInfo={creditCardInfo} onChange={onChange} />
        </TabPane>
        <TabPane tabId="ach">
          <AchForm achInfo={achInfo} onChange={onChange} />
        </TabPane>
      </TabContent>
    </Fragment>
  )
}

export default PaymentMethodSelector
