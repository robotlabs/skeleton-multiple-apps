import React, { Suspense, lazy } from 'react'

import {
  HashRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

const AppA = lazy(async () => {
  // load any script, like external libs that are specific to this app
  return import('../apps-src/app-a/app')
})
const AppB = lazy(async () => {
  // load any script, like external libs that are specific to this app
  return import('../apps-src/app-b/app')
})
const AppC = lazy(async () => {
  // load any script, like external libs that are specific to this app
  return import('../apps-src/app-c/app')
})

function routes (props) {
  return (
    <Router>
      <Suspense fallback={<div>Loading lazy components</div>}>
        <Switch>
          {routesBuilder(props.experiencesMap)}
          <Route default>
            <Home experiencesMap={props.experiencesMap} />
          </Route>
        </Switch>
      </Suspense>
    </Router>
  )
}

function Home (props) {
  return (
    <nav>
      <ul>
        {homeBuilder(props.experiencesMap)}
      </ul>
    </nav>
  )
}

function routesBuilder (experiencesMap) {
  return experiencesMap.map((item, index) => {
    return (
      <Route
        key={index}
        exact path={'/' + item.url}
        render={(props) => getComponent(props, item)}
      />
    )
  })
}

function getComponent (props, item) {
  document.body.style.backgroundColor = item.backgroundColor
  document.body.style.color = item.color
  switch (item.id) {
    //* * MOTION build component */
    case 'app-a':
      return <AppA {...props} appInfo={item} />
    //* * MOTION build component */
    case 'app-b':
      return <AppB {...props} appInfo={item} />

    //* * QUIZ FAMILY build component */
    case 'app-c':
      return <AppC {...props} appInfo={item} />

    default:
  }
}

function homeBuilder (experiencesMap) {
  document.body.style.backgroundColor = '#008c7d'
  document.body.style.color = '#ffffff'
  return experiencesMap.map((item, index) => {
    return (
      <li
        key={index}
      >
        <Link to={'/' + item.url}>{item.name}</Link>
      </li>
    )
  })
}

export default routes
