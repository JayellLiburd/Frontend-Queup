import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'

import Profile from '../Components/Account/Profile'
import SettingsNav from '../Components/Account/SettingsNav'
import Connections from '../Components/Account/Connections';
import axios from 'axios';

import { settingsContext } from '../Connections/settings';
import { usersContext } from '../Connections/user';
import Notifications from '../Components/Account/Notifications';
import Prefrences from '../Components/Account/prefrences';
import Accountsettings from '../Components/Account/accountsettings';


function Account() {

  const nav = useNavigate();
  const {setAuth, setOpenLog, setMenu, menu} = useContext(usersContext)

  const [view, setView] = useState(false)


  useEffect(() => {
      axios.get('https://api.queueupnext.com/verify', {withCredentials: true}).then((response) => {
          if (response.data.message) {
            setAuth(false)
            alert('Please Sign In')
            setOpenLog(true)
            nav('/')
            window.location.reload()
          }

          if (response.data[0]) {setAuth(true); setView(true)}
  })}, [nav, setAuth, setOpenLog])

  //settings nav view weather true or false -- active is being set in the settingsNav.jsx in account folder
  const [active, setActive] = useState([{prof: true, con: false, not: false, pref: false, acc: false}])

  const clicked = (e) => {setMenu(true)}



  return (
    <settingsContext.Provider value={{active, setActive, setMenu}}>
    <Wrapper>
      {view  ?
      <>
      <div id='navbigscreen'><SettingsNav/></div>
      {menu  ?
      <SettingsNav/> :
      <>
      <button id='menu' onClick={clicked}>Settings</button>
      <section>
        <div id='hero'/>
        <div id='Profile'>{active[0].prof  ? <Profile/> : <></>}</div>
        <div id='Connections'>{active[0].con  ? <Connections/> : <></>}</div>
        <div id='Connections'>{active[0].not  ? <Notifications/> : <></>}</div>
        <div id='Connections'>{active[0].pref  ? <Prefrences/> : <></>}</div>
        <div id='Connections'>{active[0].acc  ? <Accountsettings/> : <></>}</div>
      </section>
      </>}
      </>
      : <></>}
    </Wrapper>
    </settingsContext.Provider>
  )
}

const Wrapper = styled.div`

display: flex;
justify-content: center;
position: relative;
top: 4rem;
margin-bottom: 4rem;

width: 90vw;
min-height: 70rem;

  section{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 2rem 5rem;

    width: 60vw;
    border-radius: 3rem;
  
    #hero{
      width: 100%;
      height: 15rem;
      
      background: rgb(210,202,230);
      background: radial-gradient(circle, rgba(250,237,223,1) 0%, rgba(215,239,242,1) 75%, rgba(215,255,249,1) 100%);
      border-radius: 3rem 3rem 0 0;}}
  
  #menu{
    display: none;
    position: absolute;
    top: 5rem;
    left: 22vw;

    padding: 1rem;
    font-size: .5rem;

    background-color: #f5f5f5e1;
    border-radius: 1rem;;
    border: unset;}
  



  @media (max-width: 1400px) {
    width: 100vw;
    min-height: 10rem;
    top: 2rem;

    section{
      width: 100vw;
      #hero{height: 8rem; width: 100vw;}}
    
    #menu{display: block; top: 4rem; left: 10vw}
    #navbigscreen{display: none}


  }

`





export default Account