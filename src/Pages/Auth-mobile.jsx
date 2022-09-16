import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components'
import { GoogleLogin } from '@react-oauth/google';

import { setAbclogin, standardLogin } from '../Connections/login';


function Authmobile() {


  const [checkUsername, setCheckusername] = useState('')
  const [checkPassword, setCheckpassword] = useState('')

  //Connections

  //login
  const setUserLogin = () => {standardLogin(checkUsername, checkPassword)}

  const responseGoogle = (response) => { setAbclogin(response) } 
  


  return (

    <Wrapper>
        <div id='log'>
            <div className='abc'>
                <GoogleLogin 
                    onSuccess={responseGoogle}
                    size='medium' 
                    width='300'
                    ux_mode='redirect'
                />
            </div>
            <label htmlFor="Login">Login</label>
            <input className='inputreg'
                type="text"
                placeholder='Username or Email' 
                name='username' 
                onChange={(e) => {
                    setCheckusername(e.target.value)}}
            />
            <input className='inputreg'
                type="text"
                placeholder='Password' 
                name='password' 
                onChange={(e) => {
                    setCheckpassword(e.target.value)}}
            />
            <h3 style={{color: 'black', fontSize: '.8rem', marginTop: '1rem' }}>{'If you do not have an account go to '}
                <NavLink to='/reg' style={{color: 'brown'}}>Signup Page</NavLink>
            </h3>
            <button id='btn' onClick={setUserLogin}>login</button>
        </div>
    </Wrapper>

  )
}

const Wrapper = styled.div`
  padding: 5rem 0;

  color: white;
  width: 100vw;
  min-height: 80vh;
  font-size: 1.5rem;

  #log{
      all: unset;
      display: flex;
      flex-direction: column;
      align-items: center;
      .abc{padding: 1rem 0; border-bottom: 2px solid black;}
      label{margin: 1rem 0; color: black; font-weight: bold;}
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
    }

`


export default Authmobile