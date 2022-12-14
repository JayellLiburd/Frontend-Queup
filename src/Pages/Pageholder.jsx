import React, { useLayoutEffect } from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'
import jwt_decode from 'jwt-decode'

import { GoogleOAuthProvider } from '@react-oauth/google'
import axios from 'axios'

import Foots from '../Components/Foots'
import Topnav from '../Components/Topnav'
import Home from './Home'
import Overview from './Overview'
import Line from './Line'
import Account from './Account'
import Authmobile from './Auth-mobile'
import Regmobile from './Reg-mobile'

import { useState } from 'react'
import { usersContext } from '../Connections/user'
import Test from './Test'
import { CgLaptop } from 'react-icons/cg'


function Pageholder() {

  const [auth, setAuth] = useState(false)
  const [user, setUser] = useState('')

  const [ui, setUI] = useState('')

  //Settings mobile sidebar
  const [menu, setMenu] = useState(false)

  // home.jsx Media card info
  const [media, setMedia] = useState([{name: "sorry something went wrong..."},{Image: "Images/temp.png"}])

  useLayoutEffect( ()=>{
    axios.get(process.env.REACT_APP_Server + '/verify',{withCredentials:true}).then((response) => {
      // const key = (jwt_decode((document.cookie).split('=')[1]))

      // Setting access and some visuals
      if (response.data[0]) {setAuth(true); setUser(response.data[0])}
      else {setAuth(false)}

      //UI prefrences
      if (localStorage.prfs) {
      setUI( jwt_decode(localStorage.prfs) )
      }
    })
    
  }, [])

  const GlobalStyle = createGlobalStyle`
    body { background-color: ${ui.dark === 'true' ? '#292929' : 'white'};}
  `
  
  return (
    <BrowserRouter>
      <usersContext.Provider value={{user, setUser, auth, setAuth, setUI, ui, setMenu, menu, media, setMedia}}>
      <GlobalStyle/>
        <GoogleOAuthProvider clientId={process.env.REACT_APP_google_testing_clientid}>
          <Topnav/>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/Overview' element={<Overview/>}/>
              <Route path='/line' element={<Line/>}/>
              <Route path='/account' element={<Account/>}/>
              <Route path='/auth' element={<Authmobile/>} />
              <Route path='/reg' element={<Regmobile/>} />
              <Route path='/test' element={<Test/>} />
            </Routes>
          <Foots/>
        </GoogleOAuthProvider>
      </usersContext.Provider>
    </BrowserRouter>
  )
}



export default Pageholder