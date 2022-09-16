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
            <button id='btn' onClick={userRegister}>Register</button>
        </div>
        <h3 style={{ fontSize: '1rem', marginLeft: '4rem', marginTop: '3rem', fontFamily: 'serif' }}>{'If alreay have an account go to '}
            <NavLink to='/auth' style={{color: 'yellow'}}>login page</NavLink>
        </h3>

    </Wrapper>

  )
}

const Wrapper = styled.div`
  padding: 6rem 0;

  color: white;
  width: 100vw;
  height: 60vh;
  font-size: 1.5rem;

  background-color: #694b24f0;

  #reg{
        all: unset;
        display: flex;
        flex-direction: column;
        align-items: center;

        color: white;
        font-size: 1.5rem;

        label{margin-top: -2rem;}
        .inputreg{
          all: unset; 
          margin: 1rem 0;
          padding: .5rem;

          width: 19rem;
          height: 1.1rem;
          font-size: 1rem;
          font-family: 'Roboto Mono', monospace;
          
          background-color: grey;
          border: 1px solid #d3d3d3;
          border-radius: .4rem;

          &::placeholder{color: black;}
          &:focus { border: 2px solid white; background-color: grey; color: white; &::placeholder{color: white;}}

          }}
        .inputinfo{
            all: unset; 
            margin: 1rem 1rem;
            padding: 0.5rem;

            width: 8rem;
            height: 1rem;
            font-size: .9rem;
            font-family: 'Roboto Mono', monospace;
            
            background-color: grey;
            border: 1px solid #d3d3d3;
            border-radius: .4rem;

            &::placeholder{color: black;}
            &:focus { border: 2px solid white; background-color: grey; color: white; &::placeholder{color: white;}}
        }

  #btn{margin-top: 1rem; padding: .2rem .5rem; background-color: #ac9787cf; color: white; text-decoration: unset; }

 @media screen and (min-width: 800px) {
  padding-bottom: 50rem;
 }

`


export default Regmobile