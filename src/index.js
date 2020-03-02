import React from 'react'
import ReactDOM from 'react-dom'
import './index-styles.scss'
import App from './container-app/container-app'
import * as serviceWorker from './services/service-worker'

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

serviceWorker.unregister()
