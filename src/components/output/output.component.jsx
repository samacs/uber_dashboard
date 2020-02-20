import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Row, Col, Button, Spinner } from 'reactstrap'
import { Hook, Console, Decode } from 'console-feed'
import ReactAutoScroll from 'react-to-target-auto-scroll'

import { selectShowSpinner } from '../../reducers/pusher/pusher.selectors'
import { OutputContainer } from './output.styles'

const mapStateToProps = createStructuredSelector({
  showSpinner: selectShowSpinner,
})

class Output extends Component {
  constructor(props) {
    super(props)

    this.state = { logs: [] }
  }

  componentDidMount() {
    Hook(window.console, log => {
      this.setState(({ logs }) => ({ logs: [...logs, Decode(log)] }))
    })
  }

  handleOnClear = e => {
    this.setState({ logs: [] })
  }

  render() {
    const { showSpinner } = this.props
    const { logs } = this.state

    return (
      <Col>
        <h3>Output</h3>
        <Row>
          <Col md="6 d-flex align-items-center">
            {showSpinner ? <Spinner size="sm" color="primary" /> : null}
          </Col>
          <Col md="6">
            <div className="text-right m-2">
              <Button
                color="light"
                onClick={this.handleOnClear}
                size="sm"
                disabled={logs.length === 0}>
                Clear output
              </Button>
            </div>
          </Col>
        </Row>
        <OutputContainer>
          <ReactAutoScroll
            targetPosition={900}
            easeType={'linear'}
            speed={5}
            updateInterval={40}
            scrollTargetRef={this.refs.container}
            isEnabled>
            <Console
              logs={logs}
              variant="dark"
              filter={['info', 'error']}
              ref="container"
            />
          </ReactAutoScroll>
        </OutputContainer>
      </Col>
    )
  }
}

export default connect(mapStateToProps)(Output)
