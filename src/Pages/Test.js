import React from 'react'
import styled from 'styled-components'

function Test() {

  return (
    <Wrapper>
        <form className='reg'>
            <h2>Sign Up for Queup</h2>
            <div className='name'>
                <input className='inputinfo'
                    type="text" 
                    placeholder='First Name' 
                    name='First' />

                <input className='inputinfo'
                    type="text" 
                    placeholder='Last Name' 
                    name='Last' />
            </div>
            <input className='inputreg'
                    type="text" 
                    placeholder='Email' 
                    name='Email' />

            <input className='inputreg'
                type="text" 
                placeholder='Create Username' 
                name='username' />

            <input className='inputreg' type="text" placeholder='Create Password'/>

            <input className='inputreg'
                type="text"
                placeholder='Re-type Password' 
                name='password'/>
            <button id='btn' >Register</button>
        </form>
    </Wrapper>
  )
}

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    /* background-color: #000000ae; */
    .reg{
        display: flex;
        flex-direction: column;
        justify-content: center;
        position: relative;
        align-items: center;
        padding: 3rem;
        padding-top: 2rem;
        padding-bottom: 5rem;
        width: 30vw;
        height: max-content;
        background-color: white;
        border-radius: 0 0 .5rem .5rem;
        h2{ color: #72460c; }
        input{
            all: unset;
            margin: .5rem 0; 
            padding: .5rem;
            padding-left: 1rem;
            width: 25rem;
            height: 1.5rem;
            font-weight: bold;
            background-color: #8d8d8d;
            border-radius: .5rem;
            &::placeholder{color: white;}
        }
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
            &:hover{
                border: 1px solid black;
                color: #e0e0e0;
            }
        }
        .name{
            display: flex;
            justify-content: center;
            margin: 0;
            width: 30vw;
            input{
                width: 10.7rem; 
                margin: 0 1rem;
            }
        }
    }
`

export default Test