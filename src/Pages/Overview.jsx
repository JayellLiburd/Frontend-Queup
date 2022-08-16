import React, { useState, useContext, useEffect, } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import axios from 'axios'
import jwt_decode from 'jwt-decode'

import Activelines from '../Components/Overview/Activelines'
import Lineoverview from '../Components/Overview/Lineoverview'
import Create from '../Components/Overview/Create/Create'
import { usersContext } from '../Connections/user'


function Overview() {

  const nav = useNavigate();
  const {setAuth, setOpenLog, setUser, setUI} = useContext(usersContext)

  const [view, setView] = useState(true)

  useEffect(() => { 
    axios.get('https://app.queueupnext.com/verify', {withCredentials: true}).then((response) => {
        // const key = (jwt_decode((document.cookie).split('=')[1]))

        console.log(response)
        // Setting access and some visuals
        if (response.data[0]) {setAuth(true); setUser(response.data[0].name)}
        else {setAuth(false)}

        //UI prefrences
        if (localStorage.prfs) { setUI( jwt_decode(localStorage.prfs) ) }
    })
  }, [])

  const [bus, setBus] = useState(true)
  const [active, setActive] = useState(false)
  const [set, setSet] = useState(false)

  const buttonbus = () => {setBus(true); setActive(false); setSet(false)}
  const buttonactive = () => {setActive(true); setBus(false); setSet(false)}
  const buttonset = () => {setSet(true); setActive(false); setBus(false) }
  

  return (
    <Wrapper>
      {view ? 
        <>
        <div id='banner'><h1>Taqueria Durango</h1></div>
        <nav id='views'>
          <button className='pages' onClick={buttonbus} style={bus  ? {backgroundColor: '#bcd6ee'} : {} }>Lines</button>
          <button className='pages' onClick={buttonactive} style={active  ? {backgroundColor: '#dbbb90'} : {}}>Active</button>
          <button className='pages' onClick={buttonset} style={set  ? {backgroundColor: '#4a6781'} : {} }>Create</button>
        </nav>
        <div style={{minHeight: '90vh'}}>
        {bus ? <Lineoverview/> : <></>}
        {active ? <Activelines/> : <></>}
        {set ? <Create/> : <></>}
        </div>
        </>
        :
        <></>}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column; 
  justify-content: center; 
  align-items: center;

  position: relative;
  top: 4rem;

  #banner{
    display: flex;
    align-items: center;

    width: 100vw;
    min-height: 10rem;

    background-color: grey;
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
  
  @media (max-width: 1800px) {
  }
  
`

export default Overview