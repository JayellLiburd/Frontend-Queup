import React, { useState, useContext } from "react";
import { IoTerminal } from "react-icons/io5";
import styled from "styled-components";
import { modelContext } from "../../Helpers/Context";

function Card_model(props) {
  
  let media = props.info
  //button animation
  let menuOpen = false;
  function menu(e) {
      const menubg = document.querySelector('.arrow')
      const openmenu = document.querySelector('.info')
      const container = document.querySelector('.Container')
      if(!menuOpen) {
          menubg.classList.add('open')
          openmenu.classList.add('open')
          container.classList.add('open')
          menuOpen = true;
      }
      else {
          menubg.classList.remove('open');
          openmenu.classList.remove('open')
          container.classList.remove('open')
          menuOpen = false
      }
  }

  const outofbounds = document.querySelector('.card')
  function unfocus(e) {
    outofbounds.classList.remove('open')
    console.log(e)
  }


  return (
    <Wrapper>
        <div className="Container">
          <div className="backdrop"/>
          <div className="unfocus" onClick={unfocus} />
          <button className="close" onClick={unfocus}>X</button>
          <div className="container2">
            <div className="info">
              <h3>Queue Info</h3>
              <button>Link To Menu</button>
              <div>
                <h4>Rules</h4>
                <ul>
                  <li>
                    Once we call you when ready you have a 5 minutes to join the physical Line Queue
                  </li>
                  <li>
                    If Missed your skipped once after you will be kicked out of the
                    line
                  </li>
                </ul>
                <div>
                  <p>{"Current people in Queue: " + 4}</p>
                </div>
              </div>
            </div>
            <div className="showcase">
              <div className="imgholder"><img src={media.Image} alt="" /></div>
              <h3>{media.name}</h3>
              <p>5015 Westheimer Rd, Houston, TX 77056</p>
              <div className="buttons">
                <button onClick={menu}><button id='arrow'><div className='arrow'/></button>Info</button>
                <button>Queup</button>
              </div>
            </div>
          </div>
        </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  .Container{    
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    margin-top: -5rem;
    min-width: 85vw;
    min-height: 70vh;
    .close{
      all: unset;
      position: absolute; 
      top: 1vh; 
      right: 5vw;
      font-size: 1.4rem;
      font-weight: bold;
      color: white;
      cursor: pointer;
      &:hover{
        color: silver;
      }
    }
    .backdrop{
      position: relative;
      min-width: 100%;
      min-height: 70vh;
      border-radius: .5rem;
      background: linear-gradient(270deg, #8b0000 0%, #310000 16%, #b82c2c 100%);
      overflow: hidden;
      &::after{
        position: absolute;
        content: '';
        min-width: 60vw;
        min-height: 70vh; 
        backdrop-filter: blur(50px);
        border-radius: .5rem;
      }
    }
    .unfocus{
      position: absolute;
      width: 100vw;
      height:100vh;
      z-index: -1;
    }
    .container2{
      display: flex;
      flex-direction: row;
      position: absolute;
      color: white;
      .showcase{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .imgholder{
          display: flex;
          justify-content: center;
          align-items: center;
          aspect-ratio: 1/1;
          background-color: white;
          width: 15rem;
          border: 5px solid #0a0000;
          overflow: hidden;
        }
        h3{
          font-family: 'Cinzel', serif; 
          color: white
        }
        p{
          margin: 0;
          padding: 0;
          color: white;
          font-size: .8rem;
        }
        .buttons{
          display: flex;
          justify-content: space-evenly;
          width: 100%;
          margin-top: 3rem;
          button{
            display: flex;
            justify-content: center;
            align-items: center;
            width: 6rem;
            height: 2rem;
            padding: .5rem 1rem;
            border-radius: .5rem;
            font-family: 'Cinzel', serif; 
            font-weight: bold;
            font-size: 1rem;
            color: black;
            border: unset;
            cursor: pointer;
            &:first-child{background-color: black; color: white;}
          }
        }
      }
      .info{
        display: flex;
        flex-direction: column;
        width: 40vw;
        visibility: hidden;
        position: absolute;
        &.open {
          visibility: visible;
          position: relative;
          flex-direction: column;
          animation: fadeout 0.5s;
          @keyframes fadeout {
            0% {
              opacity: 0%;
            }
            50% {
              opacity: 0%;
            }
            100% {
              opacity: 100%;
            }
          } 
        #back-btn{
          display: block; 
          display: flex;
          justify-content: center;
          align-items: center;
          color: black;
          }
          button {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 8rem;
            height: 2rem;
            font-size: .8rem;
            color: black;
            padding: 1rem;
            border: unset;
            border-radius: .5rem;
            background-color: #ffffff;
            font-weight: 600;
            cursor: pointer;
          }
          h3 {
            font-family: 'Cinzel', serif; 
            font-size: 2rem;
            color: white;
          }
          h4 {
            font-size: 1.3rem;
            text-decoration: underline black 3px;
          }
          ul {
            all: unset;
            background: rgba(2, 2, 2, 0);
          }
          li {
            margin: 1rem 2rem;
            font-weight: 600;
          }
        }
      }
    }
  }

  #arrow{
        all: unset;
        display: flex; 
        justify-content: center;
        align-items: center;
        position: relative;
        height: 2rem;
        width: 2rem;
        z-index: 2;
        scale: .6;
        .arrow{
          all:unset;
          display: flex; 
          justify-content: unset;
          height: .1rem;
          width: 1.2rem;
          border-radius: 1rem;
          background-color: white;
          //z-index is negative because the small arrow visual svg was being pressed rather than the button itself 
          z-index: -1;

          &::before, ::after{
              content: '';
              position: absolute;
              height: .1rem;
              width: .8rem;
              border-radius: 1rem;
              background-color: white;
              transition: all .8s ease;}
          &::before{transform: translateY(-3px) rotate(-30deg)}
          &::after{transform: translateY(3px) rotate(30deg)}
      }
      .arrow.open{
          background-color: transparent;
          &::before {transform: translateX(1px) rotate(45deg)}
          &::after{transform: translateX(1px) rotate(-45deg)}
      }
    }

  @media screen and (max-width: 940px) {
    .Container{
      min-width: 100vw;
      min-height: 100vh;
      align-items: unset;
      .showcase{
        margin-top: 9rem;
      }
      .backdrop{
        &::after{
          width: 100vw;
          height: 100vh;
        }
      }
      &.open{
        .backdrop{
          min-height: 160vh;
          &::after{
            width: 100vw;
            height: 200vh;
          }
        }
        .info{
          width: 90vw;
          &.open{
            h3{ margin-top: 3rem; font-size: 1rem; color: black}
            h4{font-size: 1rem;}
          }
        }
        .container2{
          flex-direction: column-reverse;
          align-items: center;
          /* margin-top: 0rem; */
        }
      }
    }
    #arrow{
      translate: -4px -1px;
      rotate: -90deg;
    }
  }
`

export default Card_model;
