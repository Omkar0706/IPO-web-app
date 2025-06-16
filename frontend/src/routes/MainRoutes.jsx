import React from 'react'
import { Route, Routes} from 'react-router-dom'
import Home from '../pages/Home'
import Pagenotfound from '../pages/Pagenotfound'
import Signup from '../pages/Signup'
import Signin from '../pages/Signin'
import ForgotPassword from '../pages/ForgotPassword'
import Admin from '../pages/Admin'
import ManageIPO from '../IPO/ManageIPO'
import RegisterIPO from '../IPO/RegisterIPO'
import IPO_Subscription from '../IPO/IPO_Subscription'
import IPO_Allotment from '../IPO/IPO_Allotment'
import AllUpcomingIPO from '../IPO/AllUpcomingIPO'

const MainRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/forgotpassword' element={<ForgotPassword/>}/>
        <Route path='/admin/dashboard' element={<Admin/>}/>
        <Route path='/admin/Manage_IPO' element={<ManageIPO/>}/>
        <Route path='/admin/Register_IPO' element={<RegisterIPO/>}/>
        <Route path='/admin/IPO_Subscription'element={<IPO_Subscription/>}/>
        <Route path='/admin/IPO_Allotment' element={<IPO_Allotment/>}/>
        <Route path='/upcoming-IPO' element={<AllUpcomingIPO/>}/>
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
    </>
  )
}

export default MainRoutes
