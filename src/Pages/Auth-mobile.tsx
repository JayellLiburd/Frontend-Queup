import React from 'react';
import styled from 'styled-components'
import { NavLink } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { session } from 'Connections'
import { usersContext } from '../Helpers/Context';


function Authmobile() {

  const { auth } = React.useContext(usersContext)

  //login
  const setUserLogin = (e: any) => {
    e.preventDefault()
    let form = {

    } as any
    let count = 0
    const formdata = new FormData(document.getElementById('mobilelog') as HTMLFormElement)
    for (let data of formdata.entries()) {
        form[count] = data[1]
        count++
    }
    session.login('standard', {credentials: { username: form[0], password: form[1]}}).then((response) => {
      if (response) {
          if (!auth) {
              window.location.assign('/')
          }
          else {
              window.location.assign(window.location.pathname)
          }
      }
      else {
          alert('Invalid credentials')
      }
    })
  }
  


  return (

    <Wrapper>
        <form id='mobilelog' onSubmit={e => setUserLogin(e)}>
            <div className='abc'>
                <GoogleLogin 
                    onSuccess={(response: object) => session.login('google', {partyData: response})}
                    size='medium' 
                    width='300'
                    ux_mode='redirect'
                />
            </div>
            <label htmlFor="Login">Login</label>
            <input className='inputreg' type="text" placeholder='Username or Email' name='username' required/>
            <input className='inputreg' type="password" placeholder='Password' name='current-password' required/>
            <h3 style={{color: 'black', fontSize: '.8rem', marginTop: '1rem' }}>{'If you do not have an account go to '}
                <NavLink to='/reg' style={{color: 'brown'}}>Signup Page</NavLink>
            </h3>
            <button>login</button>
        </form>
    </Wrapper>

  )
}

const Wrapper = styled.div`
  padding: 5rem 0;

  color: white;
  width: 100vw;
  min-height: 80vh;
  font-size: 1.5rem;

  #mobilelog{
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

        button{
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