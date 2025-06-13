import React from 'react'
import { Route, Routes} from 'react-router-dom'
import Home from '../pages/Home'
import Pagenotfound from '../pages/Pagenotfound'

const MainRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
    </>
  )
}

export default MainRoutes
