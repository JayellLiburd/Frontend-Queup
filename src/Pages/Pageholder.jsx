import React, { useLayoutEffect } from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import styled, { createGlobalStyle } from 'styled-components'
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
import Headcards from '../Components/Home/Headcards'


function Pageholder() {

  const [auth, setAuth] = useState(false)
  const [user, setUser] = useState('')

  const [ openL, setOpenLog ] = useState(false)
  const [ openR, setOpenReg ] = useState(false)

  const [ui, setUI] = useState('')

  //Settings mobile sidebar
  const [menu, setMenu] = useState(false)

  useLayoutEffect( ()=>{axios.get('http://localhost:4000/verify', {withCredentials: true}).then((response) => {
    // const key = (jwt_decode((document.cookie).split('=')[1]))

    // Setting access and some visuals
    if (response.data[0]) {setAuth(true); setUser(response.data[0])}
    else {setAuth(false)}

    //UI prefrences
    if (localStorage.prfs) {
     setUI( jwt_decode(localStorage.prfs) )
    }
    
  })}, [])

  const GlobalStyle = createGlobalStyle`
    body { background-color: ${ui.dark === 'true' ? '#292929' : 'white'};}
  `

  return (
    <BrowserRouter>
      <usersContext.Provider value={{user, setUser, auth, setAuth, setOpenLog, openL, setOpenReg, openR, setUI, ui, setMenu, menu}}>
      <GlobalStyle/>
        <GoogleOAuthProvider clientId={process.env.client_id}>
          <Topnav/>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/Overview' element={<Overview/>}/>
              <Route path='/line' element={<Line/>}/>
              <Route path='/account' element={<Account/>}/>
              <Route path='/auth' element={<Authmobile/>} />
              <Route path='/reg' element={<Regmobile/>} />
              <Route path='/test' element={<Headcards/>} />
            </Routes>
          <Foots/>
        </GoogleOAuthProvider>
      </usersContext.Provider>
    </BrowserRouter>
  )
}



export default Pageholder