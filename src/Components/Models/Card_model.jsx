import React, { useState, useContext } from "react";
import styled from "styled-components";
import { modelContext } from "../../Helpers/Context";

function Card_model(props) {

  // UI is a function coming from Home
  const { UI } = useContext(modelContext);

  const model = document.querySelector("#model");
  const info = document.querySelector("#info");
  const main = document.querySelector(".main");

  const unfocus = () => {
    model.classList.remove("open");
    info.classList.remove("open");
    main.classList.remove("open");
    UI();
  };

  let menuOpen = false;
  function menu() {
    if (!menuOpen) {
      info.classList.add("open");
      main.classList.add("open");
      model.classList.add("open");
      menuOpen = true;
    } else {
      info.classList.remove("open");
      main.classList.remove("open");
      model.classList.remove("open");
      menuOpen = false;
    }
  }

  return (
    <Wrapper id="W-Model">
      <button id="close-btn" onClick={unfocus}>X</button>
      <button id="unfocusmodal" onClick={unfocus} />
      <div id="model">
        <div id="info">
          <h3>{props.data.label}</h3>
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
              <p>{"Current people in Queue " + 4}</p>
              <button id="back-btn" onClick={menu}>Hide Info</button>
            </div>
          </div>
        </div>
        <div className="main">
          <img src={props.data.image} alt="" />
          <h2>{props.data.label}</h2>
          <p>5015 Westheimer Rd, Houston, TX 77056</p>

          <div id="btn">
            <button id="btn-info" onClick={menu}>
              Info
            </button>
            <button>Join Queue</button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`

#close-btn{ all: unset; position: fixed; top: 5vh; right: 3vw; font-size: 1.2rem; font-weight: bold; z-index: 3;}

  #model {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 30rem;
    height: 60vh;

    backdrop-filter: blur(15px);

    background: linear-gradient(
      90deg,
      #bd6a6ae1 0%,
      #a75050e6 14%,
      #b95b5bef 25%,
      #c96c6cfb 48%,
      #b15e5eda 65%,
      #b65656f9 79%,
      #964b4bca 100%
    );
    border-radius: 2rem;

    transition: all 0.5s ease-in-out;
    z-index: 3;

    &.open {
      flex-direction: row;
      justify-content: space-between;
      width: 80rem;
      button {
        margin-left: 2rem;
      }
      div {
        margin: 2rem;
      }
    }

    #info {
      display: none;
      &.open {
        display: flex;
        flex-direction: column;
        height: 35rem;
        margin: 0 5rem;
        animation: fadeout 0.8s;


        
      #back-btn{display: none; color: white !important;}
        button {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-left: 2rem;
          width: 8rem;
          height: 2rem;
          font-size: .8rem;
          color: black !important;
          padding: 1rem;
          border: unset;
          border-radius: 1rem;
          background-color: #ffffffd7;
          color: white;
          font-weight: 600;
          cursor: pointer;
        }

        h3 {
          font-size: 2rem;
          color: white;
          text-indent: 2rem;
        }

        h4 {
          font-size: 1.3rem;
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

    .main {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      transition: all .5s ease-in-out;
      img {
        background-color: #000000ab;
        margin-bottom: 1rem;
        width: 18rem;
        height: 18rem;
        border: 2px solid;
      }
      p {
        margin-top: -1rem;
        font-size: 0.9rem;
      }
      #btn {
        display: flex;
        margin-top: 4rem;
        button {
          min-width: 8rem;
          padding: 0.5rem 0rem;
          margin: 0 1rem;

          border: unset;

          border-radius: 1rem;
          font-weight: 600;
          cursor: pointer;
          &:first-child {
            content: "dawin";
            background-color: #020202;
            color: white;
            font-weight: 600;
          }
        }
      }
      &.open {
        animation: fadeout 0.8s;
      }
    }
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
  }
  #unfocusmodal {
    all: unset;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    transform: translate(-40%, -20%);

    width: 150vw;
    height: 100vh;
    z-index: 0;
    &.open {
      display: none;
    }
  }

  @media screen and (max-width: 1400px) {
    
    #close-btn{ right: 10vw; }
    #model{width: 100vw; height: 100vh; border-radius: unset; transition: all .3s ease-in-out; 
    }
    
    #info{
      margin: 0rem 0rem !important; 
      filter: opacity(0%);
      
      div{
        position: relative; 
        min-width: 15rem;}
      h3 {font-size: 1.7rem !important; 
        text-indent: 2rem;}
      #back-btn{
        display: block !important; 
        position: relative; 
        top: 5vh; 
        left: 30vw;
        padding: 0rem !important; 
        background-color: #000000d8 !important;}

      &.open{ 
        position: relative;
        width: 100vw; 
        left: 5vw;
        filter: opacity(100%);}}
  }
`

export default Card_model;
