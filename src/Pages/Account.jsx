import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'

import Profile from '../Components/Account/Profile'
import SettingsNav from '../Components/Account/SettingsNav'
import Connections from '../Components/Account/Connections';

import { settingsContext } from '../Connections/settings';
import { usersContext } from '../Connections/user';
import Notifications from '../Components/Account/Notifications';
import Prefrences from '../Components/Account/prefrences';
import Accountsettings from '../Components/Account/accountsettings';
import { session } from 'Connections';


function Account() {

  const nav = useNavigate();
  const {setAuth, setMenu, menu} = useContext(usersContext)

  const [view, setView] = useState(false)

  useEffect(() => {
    session.verify({}).then(response => {
      if (response.data.messageAuth) {
        setAuth(false)
        nav('/')
        alert('Please Sign In')
        signin()
      }
      if (response.data[0]) {setAuth(true); setView(true)}
  })}, [nav, setAuth])

  function signin() {
    const menubg = document.querySelector('.burger')
    const openmenu = document.querySelector('.sidenav')
    const topnavcolor = document.querySelector('.topnav')
    const login = document.querySelector('.login_modal')
    if (!menubg || !openmenu || !topnavcolor || !login) return
    menubg.classList.add('open');
    openmenu.classList.add('open')
    topnavcolor.classList.add('open')
    login.classList.add('open')
  }

  //settings nav view weather true or false -- active is being set in the settingsNav.jsx in account folder
  const [active, setActive] = useState([{prof: true, con: false, not: false, pref: false, acc: false}])

  const clicked = () => {setMenu(true)}

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
margin-bottom: 4rem;
width: 90vw;
min-height: 90vh;

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
      border-radius: 3rem 3rem 0 0;
    }
  }
  #menu{
    display: none;
    position: absolute;
    top: 5rem;
    left: 22vw;

    padding: 1rem;
    font-size: .5rem;

    background-color: #f5f5f5e1;
    border-radius: 1rem;;
    border: unset;
  }

  @media (max-width: 1400px) {
    width: 100vw;
    min-height: 10rem;

    section{
      width: 100vw;
      #hero{height: 8rem; width: 100vw;}}
    
    #menu{display: block; top: 4rem; left: 10vw}
    #navbigscreen{display: none}


  }

`





export default Account