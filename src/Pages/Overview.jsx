import React, { useState, useContext, useEffect, } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import axios from 'axios'

import Activelines from '../Components/Overview/Activelines'
import Lineoverview from '../Components/Overview/Lineoverview'
import Create from '../Components/Overview/Create/Create'
import { usersContext } from '../Connections/user'
import { Links } from '../Helpers/Context';


function Overview() {

  const nav = useNavigate();
  const {setAuth, auth, user} = useContext(usersContext)

  useEffect(() => {
    axios.get(process.env.REACT_APP_Server + '/verify', {withCredentials: true}).then((response) => {
        if (response.data.messageAuth) {
          setAuth(false)
          nav('/')
          alert('Please Sign In')
          menu()
        }

        if (response.data[0]) {setAuth(true)}
  })}, [nav, auth, setAuth])

  function menu() {
    const menubg = document.querySelector('.burger')
    const openmenu = document.querySelector('.sidenav')
    const topnavcolor = document.querySelector('.topnav')
    const login = document.querySelector('.login_modal')
    menubg.classList.add('open');
    openmenu.classList.add('open')
    topnavcolor.classList.add('open')
    login.classList.add('open')
  }

  const [bus, setBus] = useState(true)
  const [active, setActive] = useState(false)
  const [set, setSet] = useState(false)

  const buttonbus = () => {setBus(true); setActive(false); setSet(false)}
  const buttonactive = () => {setActive(true); setBus(false); setSet(false)}
  const buttonset = () => {setSet(true); setActive(false); setBus(false) }
  
  
  const [ links, setLink ] = useState('')

  return (

    <Links.Provider value={{links, setLink, buttonactive}} >
    <Wrapper>
      <div id='banner'><h1>{'Welcome Back ' + user.name}</h1></div>
      <nav id='views'>
            <button className='pages' onClick={buttonbus} style={bus ? {backgroundColor: '#bcd6ee'} : {} }>Lines</button>
            <button className='pages' onClick={buttonactive} style={active? {backgroundColor: '#dbbb90'} : {}}>Active</button>
            <button className='pages' onClick={buttonset} style={set ? {backgroundColor: '#4a6781'} : {} }>Create</button>
      </nav>
      <div className="container">
        {auth ? 
          <>
            <div style={{minHeight: '80vh'}}>
              {bus ? <Lineoverview/> : <></>}
              {active ? <Activelines links={links}/> : <></>}
              {set ? <Create/> : <></>}
            </div>
          </>
          :
          <></>}
      </div>
    </Wrapper>
    </Links.Provider>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column; 
  justify-content: center; 
  align-items: center;

  position: relative;

  #banner{
    display: flex;
    align-items: center;

    width: 100vw;
    min-height: 10rem;

    background-color: #ad8c5a;
    h1{margin: 0 5rem; color: white; font-family: 'Cinzel', serif; }
  }

  #views{
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: .1rem;
    margin: 1rem;

    width: 20rem;


    background-color: #f7f7f7;
    border: 2px #dddddd solid;
    border-radius: 1.5rem;
    z-index: 5;
    .pages{
      all: unset; 
      padding: .8rem;

      font-family: sans-serif; 
      font-weight: bold;

      border-radius: 1.5rem;
      transition: all 0.2s ease-in-out;
      &:hover{background-color: #e4e4e4;}
    }
  }

  .container{
    min-height: 60vh;
  }
  
  @media (max-width: 1800px) {
    #banner{
      min-height: 5rem;
      h1{font-size: 1.5rem; margin: 0 auto;}
    }
  }
  
`

export default Overview