import React from 'react'
import { Route, Routes} from 'react-router-dom'
import Home from '../pages/Home'
import Pagenotfound from '../pages/Pagenotfound'
import Signup from '../pages/Signup'
import Signin from '../pages/Signin'
import ForgotPassword from '../pages/ForgotPassword'
import Admin from '../pages/Admin'

const MainRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/forgotpassword' element={<ForgotPassword/>}/>
        <Route path='/admin' element={<Admin/>}/>
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
    </>
  )
}

export default MainRoutes
