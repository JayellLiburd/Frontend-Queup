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
            <GoogleLogin 
                onSuccess={responseGoogle}
                size='medium' 
                width='350'
                ux_mode='redirect'
            />
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
            <button id='btn' onClick={setUserLogin}>login</button>
            <h3 style={{ fontSize: '1rem', marginTop: '3rem', fontFamily: 'serif' }}>{'If you do not have an account go to '}
                <NavLink to='/reg' style={{color: 'yellow'}}>Signup Page</NavLink>
            </h3>
        </div>
    </Wrapper>

  )
}

const Wrapper = styled.div`
  margin-top: 4rem;
  padding: 6rem 0;

  color: white;
  width: 100vw;
  height: 60vh;
  font-size: 1.5rem;

  background-color: #694b24f0;

  #log{
      all: unset;
      display: flex;
      flex-direction: column;
      align-items: center;

      label{margin-top: 2rem;}
      input{
          all: unset; 
          margin: 1rem 0;
          padding: .8rem;

          width: 20rem;
          height: 1rem;
          font-size: 1rem;
          font-family: 'Roboto Mono', monospace;
          
          background-color: grey;
          border: 1px solid #d3d3d3;
          border-radius: .4rem;

          &::placeholder{color: black;}
          &:focus { border: 2px solid white; background-color: grey; color: white; &::placeholder{color: white;}}

          }}

          #btn{margin-top: 1rem; padding: .2rem 1rem; background-color: #ac9787cf; color: white; text-decoration: unset; }

 @media screen and (min-width: 800px) {
  padding-bottom: 50rem;
 }

`


export default Authmobile