import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Container, Row, Col, Navbar, NavbarBrand } from 'reactstrap'

import './App.scss'
import Sidebar from './components/sidebar/sidebar.component'
import GlobalForm from './components/global-form/global-form.component'
import EndpointTabs from './components/endpoint-tabs/endpoint-tabs.component'
import Output from './components/output/output.component'
import { selectActiveTab } from './reducers/global/global.selectors'

const mapStateToProps = createStructuredSelector({
  activeTab: selectActiveTab,
})

const App = ({ activeTab }) => (
  <Fragment>
    <Navbar color="dark" dark className="fixed-top flex-md-nowrap p-0 shadow">
      <NavbarBrand href="#" className="col-sm-3 col-md-2 mr-0">
        Uber 2.5/3.0
      </NavbarBrand>
    </Navbar>
    <Container fluid>
      <Row>
        <Sidebar />
        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <Row>
            <Col md="6">
              <GlobalForm />
              <EndpointTabs activeTab={activeTab} />
            </Col>
            <Col md="5" className="sidebar-right border-left">
              <div className="sidebar-sticky">
                <Output />
              </div>
            </Col>
          </Row>
        </main>
      </Row>
    </Container>
  </Fragment>
)

App.propTypes = {
  activeTab: PropTypes.string.isRequired,
}

export default connect(mapStateToProps)(App)
