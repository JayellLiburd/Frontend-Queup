import React, {useState, lazy, Suspense, useLayoutEffect } from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'
import jwt_decode from 'jwt-decode'

import { GoogleOAuthProvider } from '@react-oauth/google'
import axios from 'axios'

import Foots from '../Components/Navigation/Foots'
import Topnav from '../Components/Navigation/Topnav'
import Index from '../Components/Overview/Context/summary/index'
import { mockData } from 'Tests/mock'

const { usersContext } = require( '../Helpers/Context')

const Home = lazy(() => import('./Home'))
const Overview = lazy(() => import('./Profile'))
// const Line = lazy(() => import('./Line'))
// const Account = lazy(() => import('./Account'))
// const Authmobile = lazy(() => import('./Auth-mobile'))
// const Regmobile = lazy(() => import('./Reg-mobile'))
const Test = lazy(() => import('../Tests/Test'))

function Pageholder() {

  const [auth, setAuth] = useState(false)
  const [user, setUser] = useState('')

  type UI = {
    dark: string
  }
  const [ui, setUI] = useState({dark: 'false'} as UI)

  //Settings mobile sidebar
  const [menu, setMenu] = useState(false)

  useLayoutEffect( ()=>{
    axios.get(process.env.REACT_APP_Server + '/verify',{withCredentials:true}).then((response) => {
      // const key = (jwt_decode((document.cookie).split('=')[1]))

      // Setting access and some visuals
      if (Object.keys(response.data).length > 1) {setAuth(true); setUser(response.data)}
      else {setAuth(false); setUser('')}

      //UI prefrences
      if (localStorage.prfs) {
        setUI( jwt_decode(localStorage.prfs) )
      }
    })
  }, [])
  
  return (
    <Suspense>
      <BrowserRouter>
        <usersContext.Provider value={{user, setUser, auth, setAuth, setUI, ui, setMenu, menu}}>
        <GlobalStyle theme={ui.dark}/>
          <GoogleOAuthProvider clientId={process.env.REACT_APP_google_testing_clientid}>
            <Topnav/>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/Overview' element={<Overview/>}/>
                {/* <Route path='/line' element={<Line/>}/> */}
                {/* <Route path='/account' element={<Account/>}/> */}
                {/* <Route path='/auth' element={<Authmobile/>} /> */}
                {/* <Route path='/reg' element={<Regmobile/>} /> */}
                <Route path='/test' element={<Index {...mockData[0]}/>} />
                <Route path='/test2' element={<Test />} />
              </Routes>
            <Foots/>
          </GoogleOAuthProvider>
        </usersContext.Provider>
      </BrowserRouter>
    </Suspense>
  )
}


const GlobalStyle = createGlobalStyle`
  body { background-color: ${props => props.theme === 'true' ? '#292929' : 'white'};}
`

export default Pageholder