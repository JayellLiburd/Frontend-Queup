import { React, useContext, useState } from 'react'
import styled from 'styled-components'

import Displaycase from '../Components/Home/Displaycase'
import Headcards from '../Components/Home/Headcards'
import { usersContext } from '../Connections/user'
import { modelContext } from '../Helpers/Context'

import { GrDown } from "react-icons/gr";
import Card_model from '../Components/Models/Card_model'


function Home() {

  const {auth, user, ui} =  useContext(usersContext)
  const [ cardInfo, setInfo ] = useState([])
  let name = 'Welcome Back ' + user.name

  var menu = false
  function UI() {
    console.log('ajhd')
    const view = document.querySelector('#viewmodal')
    if (!menu) {view.classList.add('open'); menu = true}
    else{ view.classList.remove('open');  menu = false}
    
  }

  return (
    <modelContext.Provider value={{UI, setInfo}}>
    <Wrapper>
      <div className='anding'>

      </div>
          <i className='glow' style={{top: '20rem', left: '40rem'}}/>
          <i className='glow' style={{top: '70rem', left: '100rem'}}/>
          <i className='glow' style={{top: '150rem', left: '40rem'}}/>
          <i className='glow' style={{top: '80rem', left: '-5rem'}}/>
          <i className='glow' style={{top: '60rem', right: '-12rem'}}/>
          <i className='glow' style={{top: '10rem', left: '120rem'}}/>
          <i className='glow' style={{top: '155rem', right: '10rem'}}/>
          <i className='glow' style={{top: '100rem', right: '100rem'}}/>
      <Contents>
        <div id='Hero'>
          <img src='Images/hero.jpg' alt="" />
          <h2 className='user'>{auth ? name + '...' : "Lets find something to do "}</h2>
          <div id='smallheader'>
            <h2>Queup</h2>
            <p>Lets find something to do {auth ? user.name : ''}</p>
            <form action="">
              <input type="text" placeholder='Search...'/>
            </form>
          <Headcards/>
          </div>
        </div>
        <div id='viewmodal'><Card_model data={cardInfo}/></div>
        <div id='media'>
          <Displaycase name='Hotspots in Houston'/>
          <Displaycase name='Food'/>
          <Displaycase name='Hidden Gems'/>
          <Displaycase name='HypeGear'/>
          <Displaycase name='Raffles'/>
        </div>
      </Contents>
    </Wrapper>
    </modelContext.Provider>
  )
}

const Wrapper = styled.div`
  @media (max-width: 800px) {
    width: 100vw;
    min-height: 100rem;
  }

  width: 60vw;
  min-height: 140rem;
`


const Contents = styled.div`
  position: relative;

  .glow{
    position: absolute;
    border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
    box-shadow: 0 0 200px 15rem #75631260;
    background-color: transparent;
  }

  .user{
    display: none;
    @media (min-width: 1800px) {
    display: block;
    position: absolute;
    top: 7rem;;
    left: 13rem;

    color: #e9ba94;
    font-size: 1.8rem;
    font-family: 'Cinzel', serif;}
  }



  #Hero{
    position: relative;
    margin-top: 7rem;
    margin-bottom: 3rem;

    @media (max-width: 800px) {width: 100vw; height: 20rem;}
    width: 60vw;
    height: 25rem;

    border: 1px solid grey;
    border-radius: 7px;
    img{  width: 100%; height: 100%; object-fit: cover;}

    @media (max-width: 800px) {margin-top: 4rem; margin-bottom: 2rem; border-radius: 0px; border: none;}

    #smallheader{
      display: none;
      @media (max-width: 1800px) {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: absolute;
      top: 8rem;
      
      width: 100%;

      color: #dadada;
      font-size: 2rem;
      font-family: serif; 

        h2{padding: 0; margin: 0; position: absolute; top: -5rem; left: 10%; font-size: 2.5rem;}
        p{font-size: 1rem; font-weight: bold; position: absolute; top: -3rem; left: 10%;}
        input{
          position: relative;
          padding-left: 1rem;

          
          @media (max-width: 800px) {width: 80vw;}
          width: 40vw;
          height: 2rem;

          background-color: #ffffffa2;
          border: none;
          border-radius: 10px;

          &::placeholder{color: black; font-size: 1rem; font-size: bold;}
        }
      }
    }
  }

  ul{ 
    @media (max-width: 1800px) { top: 4rem; height: 2.5rem;}
    display: flex; 
    position: sticky; 
    align-items: center;

    top: 4.05rem;
    height: 3rem;
    width: 100%;
    padding: 0rem;

    background-color: #ffffffd6;
    backdrop-filter: blur(1px);
    
    z-index: 2; }

  .filter{
    display: flex;
    align-items: center;
    padding: 0.5rem .5rem;
    margin: 0 1rem; 

    height: 1rem;
    font-size: 1rem;
    color: white;

    background-color: #865c3ace;
    border-radius: 20px;

    &:first-child{margin-left: 1rem;}
    h3{margin:0 .5rem;}

    @media (max-width: 800px) {font-size: .6rem; margin: 0 .5rem;}}

  #media{margin-top: -1rem;}

  //  Dark Classes

  #ul{ 
    @media (max-width: 1800px) { padding: 1rem 0; top: 4rem; height: 2rem;}
    display: flex; 
    position: sticky; 
    align-items: center;

    top: 4.05rem;
    height: 3rem;
    width: 100%;
    padding: 0;

    background-color: #ac998262;
    backdrop-filter: blur(1px);
    
    z-index: 2;
  }

  #viewmodal{
    transform: translate(-50%, -50%);
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 3;
    pointer-events: none;
    filter: opacity(0%);
    transition: all .3s ease-in-out;
    &.open{
      filter: unset;
      pointer-events: unset;
      display: block;
    }
  }

  @media screen and (max-width: 1400px) {
    #Viewmodal{ top: 0rem; left: 0; width: 100vw; height: 100vh; transform: unset; position: fixed; }
  }
`


export default Home