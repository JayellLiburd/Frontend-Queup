import React, { useState, useEffect, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components'

import sendRegistation from '../Connections/Cookies';
import { usersContext } from '../Connections/user';


function Regmobile() {


    const nav = useNavigate();

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [first, setFirst] = useState('')
    const [last, setLast] = useState('')
    const [email, setEmail] = useState('')

    //sign up
    const userRegister = () => {
        sendRegistation(username, password, first, last, email)
        nav('/', {replace: true})
    }

    // redirect after reload
    useEffect(()=>{if(window.location.hash) {nav('/');}})


  return (

    <Wrapper>
        <div id='reg'>
            <label htmlFor="Register">Register</label>
            <div>
                <input className='inputinfo'
                    type="text" 
                    placeholder='First Name' 
                    name='First' 
                    onChange={(e) => {setFirst(e.target.value)}}/>

                <input className='inputinfo'
                    type="text" 
                    placeholder='Last Name' 
                    name='Last' 
                    onChange={(e) => {setLast(e.target.value)}}/>
            </div>
            <input className='inputreg'
                    type="text" 
                    placeholder='Email' 
                    name='Email' 
                    onChange={(e) => {setEmail(e.target.value)}}/>

            <input className='inputreg'
                type="text" 
                placeholder='Create Username' 
                name='username' 
                onChange={(e) => {setUsername(e.target.value)}}/>

            <input className='inputreg' type="text" placeholder='Create Password'/>

            <input className='inputreg'
                type="text"
                placeholder='Re-type Password' 
                name='password' 
                onChange={(e) => {setPassword(e.target.value)}}
            />
            <h3 style={{ fontSize: '.9rem', margin: '1rem' }}>{'If alreay have an account go to '}
                <NavLink to='/auth' style={{color: 'brown'}}>login page</NavLink>
            </h3>
            <button id='btn' onClick={userRegister}>Register</button>
        </div>

    </Wrapper>

  )
}

const Wrapper = styled.div`
  padding: 6rem 0;

  width: 100vw;
  height: 60vh;
  font-size: 1.5rem;

  #reg{
        all: unset;
        display: flex;
        flex-direction: column;
        align-items: center;

        font-size: 1.5rem;

        label{margin-top: -2rem; font-weight: bold;}
        .inputreg{
            display: flex;
            justify-content: start;
            align-items: center;
            position: relative;
            margin: .5rem 0;
            padding-left: 1rem;
            width: 80vw;
            height: 3rem;
            border: unset;
            background-color: #80808045;
            border-radius: .5rem;
            font-size: 1rem;
            font-weight: bold;
            font-family: sans-serif;
            color: #000000;
            transition: all 0.2s ease-in-out;
            &::placeholder{color: #424242da;}
            &input:focus{ border: 2px solid #c5323250;}
        }

        #btn{
            all: unset;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: .5rem;
            aspect-ratio: 3/1;
            width: 6rem;
            color: white;
            font-size: 1rem;
            font-weight: bold;
            background-color: #58370b;
            border-radius: 0.5rem;
            cursor: pointer;
        }
        .inputinfo{
            all: unset; 
            margin: 1rem .5rem;
            padding: 0.5rem;
            width: 36vw;
            height: 2rem;
            border: unset;
            background-color: #80808045;
            border-radius: .5rem;
            font-size: 1rem;
            font-weight: bold;
            font-family: sans-serif;
            color: #000000;
            transition: all 0.2s ease-in-out;
            &::placeholder{color: #424242da;}
            &input:focus{ border: 2px solid #c5323250;}
        }
  }

 @media screen and (min-width: 800px) {
  padding-bottom: 50rem;
 }

`


export default Regmobile