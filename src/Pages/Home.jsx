import { React, useContext  } from 'react'
import styled from 'styled-components'

import Displaycase from '../Components/Home/Displaycase'
import Headcards from '../Components/Home/Headcards'
import { usersContext } from '../Connections/user'

import { GrDown } from "react-icons/gr";


function Home() {

  const {auth, user, ui} =  useContext(usersContext)
  
  let name = 'Welcome Back ' + user[0]

  return (
    <Wrapper>
      <Contents>
        <div id='Hero'>
          <img src='Images/hero.jpg' alt="" />
          <h2 className='user'>{auth ? name + '...' : "Lets find something to do "}</h2>
          <div id='smallheader'>
            <h2>Queup</h2>
            <p>Lets find something to do {auth ? user[0] : ''}</p>
            <form action="">
              <input type="text" placeholder='Search...'/>
            </form>
          <Headcards/>
          </div>
        </div>

        <ul id={ui.dark === 'true' ? '#ul' : ''}>
          <div className='filter'><h3>Pickup</h3><GrDown/></div>
          <div className='filter'><h3>$$$ Price</h3><GrDown/></div>
          <div className='filter'><h3>Distance</h3><GrDown/></div>
        </ul>
        <div id='media'>
          <Displaycase name='Food'/>
          <Displaycase name='Hotspots'/>
          <Displaycase name='Hidden Gems'/>
          <Displaycase name='HypeGear'/>
          <Displaycase name='Raffles'/>
        </div>
      </Contents>
    </Wrapper>
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

`


export default Home