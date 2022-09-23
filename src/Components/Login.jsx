import React from 'react';
import styled from 'styled-components'
import { GoogleLogin } from '@react-oauth/google';
import setAbclogin, { standardLogin } from '../Connections/login';


function Log() {

    function menu() {
        const menubg = document.querySelector('.burger')
        const openmenu = document.querySelector('.sidenav')
        const topnavcolor = document.querySelector('.topnav')
        const login = document.querySelector('.login_modal')
        menubg.classList.remove('open');
        openmenu.classList.remove('open')
        topnavcolor.classList.remove('open')
        login.classList.remove('open')
    }

    function Switchform() {
        const login = document.querySelector('.login_modal')
        const signup = document.querySelector('.signup')
        login.classList.remove('open')
        signup.classList.add('open')
    }

    let form = []
    const submit = (e) => {
        form = []
        e.preventDefault()
        const formData = new FormData(document.querySelector('.login'))
        for (var data of formData.entries()) {
          form.push(data[1]);
        }
        standardLogin(form[0], form[1])
    }

    const responseGoogle = (response) => { setAbclogin(response) } 

    return (
      <Wrapper>
        <div className="log">
            <form className='login' name='Login' onSubmit={e => submit(e)}>
                <div className='socials'>
                    <GoogleLogin 
                        onSuccess={responseGoogle}
                        size='medium' 
                        width='350'
                    />
                </div>
                <h2 className='close' onClick={menu}>X</h2>
                <h2>Sign In to Queup</h2>
                <input type="text" name='user' placeholder='Username or Email'/>
                <input type="password" name='password' placeholder='Password'/>
                <h3 style={{ fontSize: '1rem', marginTop: '2rem', fontFamily: 'serif' }}>{'If you do not have an account go to '}
                    <p onClick={Switchform} style={{color: 'brown'}}>{' Signup Page'}</p>
                </h3>
                <button>Login</button>
            </form>
        </div>
      </Wrapper>
    )
  }
  
  const Wrapper = styled.div.attrs({className: 'login_modal'})`
    display: flex;
    justify-content: center;
    width: 100vw;
    height: 0vh;
    background-color: #000000ae;
    z-index: 1;
    .login{
        display: flex;
        flex-direction: column;
        justify-content: center;
        position: relative;
        align-items: center;
        width: 30vw;
        height: 0;
        overflow: hidden;
        background-color: white;
        border-radius: 0 0 .5rem .5rem;
        z-index: 2;
        transition: all 0.2s ease-in-out;
        .close{
            position: absolute;
            right: 2rem; 
            top: 0rem;
            cursor: pointer;
        }
        .socials{
            padding: 1rem 1vw;
            border-bottom: 2px solid black;
        }
        h2{color: #72460c;}
        input{
            all: unset;
            display: none;
            margin: .5rem 0; 
            padding: .5rem;
            padding-left: 1rem;
            width: 20vw;
            height: 1.5rem;
            font-weight: bold;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #8d8d8d;
            border-radius: .5rem;
            &::placeholder{color: white;}
        }
        h3{display: flex; justify-content: center; align-items: center; p{text-indent: .3rem; font-size: .8rem; cursor: pointer;}}
        button{
            all: unset;
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            bottom: 2rem;
            aspect-ratio: 3/1;
            width: 6rem;
            color: white;
            font-weight: bold;
            background-color: #58370b;
            border-radius: .5rem;
            cursor: pointer;
            &:hover{
                border: 1px solid black;
                color: #e0e0e0;
            }
        }
    }
    &.open{
        height: 100vh;
        .login{
            padding: 3rem;
            padding-top: 2rem;
            padding-bottom: 5rem;
            width: 30vw;
            height: max-content;
            input{display: block;}
        }
    }
    @media (max-width: 1400px) {
        display: none;
    }
  `



export default Log