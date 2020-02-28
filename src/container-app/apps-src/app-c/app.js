import React, { Component } from 'react'

import './app.scss'

class App extends Component {
  state = {
    status: 'loading'
  }

  componentDidMount () {
    this.timeoutLoadingId = setTimeout(() => {
      this.setState({ status: 'loaded' })
    }, 500)
  }

  componentWillMount () {
    window.clearTimeout(this.timeoutLoadingId)
  }

  render () {
    const { status } = this.state
    return (
      <div className='app-a'>
        {status === 'loading' &&
          <div>Loading app </div>}
        {status === 'loaded' &&
          <div>This is App C </div>}

      </div>
    )
  }
}

export default App
