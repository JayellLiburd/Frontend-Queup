import React, { useContext } from 'react'
import styled from 'styled-components'
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { BsPersonFill } from 'react-icons/bs';
import { AiOutlineSearch } from 'react-icons/ai'

import { usersContext } from '../Connections/user';

import Reg from './Register';
import Log from './Login'
import { useState } from 'react';


function Topnav() {

    const Filters = ['Trending in ' + 'Houston', 'Food', 'Events', 'Hype Gear', 'Unicorns']

    const {auth, openL, setOpenLog, openR, setOpenReg, setMenu} = useContext(usersContext);

    const openLogModal = () => {setOpenLog(true); setOpenReg(false)}
    const openRegModal = () => {setOpenLog(false); setOpenReg(true)}

    const [sidenav, setSidenav] = useState(false)

    const nav = useNavigate()

    const OpenNav = () => {setSidenav(true)}
    const  CloseNav = () => {setSidenav(false)}

    //button animation
    let menuOpen = false;
    function menu(e) {
        const menubg = document.querySelector('.burger')
        const openmenu = document.querySelector('.sidenav')
        if(!menuOpen) {
            menubg.classList.add('open')
            openmenu.classList.add('open')
            menuOpen = true;
        }
        else {
            menubg.classList.remove('open');
            openmenu.classList.remove('open')
            menuOpen = false
        }
    }


    const logout = () => { 
        axios.get('http://localhost:4000/logout', {withCredentials: true}).then((response) => {
            nav('/', {replace: true})
            window.location.reload()
            CloseNav()
        })}


    return (

    <Nav>
        <section className='normal'>
            
            <a href='/' id='Q'><h3></h3></a>
            <input type="text" placeholder='Search...' />
            <div >
                <button><AiOutlineSearch size='1.5rem'/></button>
                <button><BsPersonFill size='1.5rem'/></button>
            </div>
            
        </section>
        <section className='mobile'>
            <div/>
            <button id='burger' onClick={menu}> <div className='burger'/> <p>menu</p></button>
            
            <div className='sidenav'>
                <NavLink onClick={menu} to='/' id='logbutton' className='routes'>Homepage</NavLink>

                {auth  ? <NavLink onClick={menu} to='account' className='routes'>Account</NavLink>
                :<NavLink onClick={menu} to='auth' id='logbutton' className='routes'>Login</NavLink>}

                {auth  ? <NavLink onClick={menu} to='Overview' className='routes'>Business</NavLink>
                :<NavLink onClick={menu} to='/reg' className='routes' id='regbutton'>Sign Up</NavLink>}

                <NavLink onClick={menu} to='/' className='routes'>Rewards</NavLink>

                {auth  ? <button style={{color: '#865c3ace'}} onClick={logout} className='routes'>Log Out</button>
                :<NavLink onClick={menu} to='/' className='routes' id='regbutton'>Contact</NavLink>}
            </div>

        </section>
    </Nav>
    )
}



const Nav = styled.nav`
    all: unset;
    display: flex;
    justify-content: center;
    align-items: center;
    position: sticky;

    min-width: 100vw;
    height: 4rem;

    font-family: 'Cinzel', serif; 

    z-index: 10;

    /* border-bottom: 1px solid #cfcfcf; */


    section{
        display: flex;
        position: fixed;
        justify-content: space-between;
        align-items: center;
        width: 90vw;
        div{
            display: flex;
            justify-content: space-between;
            width: 4rem;
            padding-right: 2rem;
            button{
                all: unset;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
    }

    .normal{
        display: flex;
        justify-content: space-between;
        top: 0;
        margin: 0;
        width: 100vw;
        height: 4rem;
        background-color: #ffffffa6;
        backdrop-filter: blur(15px);
        #Q{ all: unset; font-size: 1.1rem; padding: 0 5rem;}
        #links{
            display: flex;
            margin-left: -10vw;
            .routes{font-size: 1rem; min-width: 5rem;}
            button{ 
                all: unset; 
                display: flex; 
                justify-content: center; 
                align-items: center; 
                margin: 0px 1rem; 
                cursor: pointer; 
                font-weight: 600; 
                text-decoration: 1px underline solid grey; 
                color: #865c3ace;
                border-radius: 8px;
            }
        }
        div{padding: 0 5rem;}
    }
    
    .mobile{
        display: none;
        width: 80vw;
        margin: 0;
        z-index: 4;
    }

    // ------ menu animation ------

    #burger{
        all: unset;
        display: flex; 
        justify-content: center;
        align-items: center;
        position: relative;
        height: 2rem;
        width: 2rem;
        z-index: 2;
        padding: .5rem;

        background: #f7f7f7;
        border: 3px solid #2b211850;
        border-radius: .5rem;
        p{position: absolute; font-size: .8rem; top: 1.1rem;}
    }

    .burger{
        all:unset;
        height: .1rem;
        width: 1.5rem;
        border-radius: 1rem;
        background-color: black;
       //z-index is negative because the small burger visual svg was being pressed rather than the button itself 
        z-index: -1;

        &::before, ::after{
            content: '';
            position: absolute;
            height: .1rem;
            width: 1.5rem;
            border-radius: 1rem;
            background-color: black;
            transition: all 1.2s ease;}
        &::before{transform: translateY(-5px)}
        &::after{transform: translateY(5px) rotate(180deg)}
    }

    .burger.open{
        background-color: transparent;
        &::before {transform: rotate(45deg)}
        &::after{transform: rotate(-45deg)}
    }

    /* #icon{
        display: none;
        justify-content: center;
        align-items: center;
        padding: .7rem;

        background: #f7f7f7;
        border: 3px solid #2b211850;
        border-radius: 50%;
        z-index: 4;
    } */
    
    // ----------------------------

    #login { position: absolute;}
    #reg { position: absolute;}

    input{ 
        all: unset; 
        height: 1.8rem;
        width: 60vh;
        padding-left: 1rem;

        border: 2px solid #2e2e2e37; 
        border-radius: .5rem;

        font-weight: bold;
        font-family: sans-serif;
        color: grey;

        &:hover { border: 2px solid #00000050; transition: all 0.2s ease-in-out; }
        &:focus { border: 2px solid #2e2e2e50; color: #4b4b4b; &::placeholder{color: #646464;}};
    }

    
    // menu for mobile nav
    @media (max-width: 1800px) {
        .sidenav{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            position: fixed;
            bottom: 0vh;
            left: 0rem;

            color: transparent;

            width: 100vw;
            height: 105vh;

            transform: translateY(-300%);
            background-color: #000000f4;

            .routes{padding: 1rem;}
            a{color: white; &:active{background-color: #ffffff29}} 

            transition: all .8s ease-in-out;
        &.open{ transform: translateY(0%); }}
    }

    //small screens showing
    @media (max-width: 1200px) {
        .mobile{display: flex; bottom: 2rem;}
        #icon {display: flex}
        #nav-link{h1{display: none;}}
        .normal{
            margin-left: 0rem; 
            justify-content: space-between;
            #links{display: none;} 
            input{display: none;} 
            #Q{margin-right: 0; padding: 0 1rem;} 
            div{padding: 0 1rem;}
        }
        form{display: none;}
        #Queup{display: none;}
        input{display: none;}
        section div{display: flex;}
    }


`


export default Topnav