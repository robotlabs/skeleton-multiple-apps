import React, { useEffect, useState, useRef } from 'react'

import Routes from './routes/routes'
import STATUS from './shared/constants'
import { routesLoad } from './routes/routes-parser'
import './jardiance-app.scss'

function JardianceApp () {
  const [status, setStatus] = useState(STATUS.LOADING)
  const experiencesMap = useRef()
  useEffect(() => {
    const fetchData = async () => {
      experiencesMap.current = await routesLoad()
      setStatus(STATUS.LOADED)
    }
    fetchData()
  }, [])

  return (
    <div className='jardiance-app'>
      {(status === STATUS.LOADING) && <div>Loading Routes</div>}
      {(status === STATUS.LOADED) && <Routes experiencesMap={experiencesMap.current} />}
    </div>
  )
}

export default JardianceApp
