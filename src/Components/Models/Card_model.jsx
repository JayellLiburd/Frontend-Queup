import React from "react";
import styled from "styled-components";

function card_Model(props) {
  
  let Queue = [
    {subject: 'Active in Line', data: 4},
    {subject: 'Rate per/h', data: 12},
    {subject: 'Close', data: '10:00pm'},
    {subject: 'Open', data: '9:00am'}
  ]
  
  let media = props.info
  //button animation
  let menuOpen = false

  function menu(e) {
    const menubg = document.querySelector('.arrow')
    const openmenu = document.querySelector('.info')
    const container = document.querySelector('.Container')
    const container2 = document.querySelector('.container2')
      if(!menuOpen) {
          menubg.classList.add('open')
          openmenu.classList.add('open')
          container.classList.add('open')
          container2.scrollTop = 0;
          menuOpen = true;
      }
      else {
          menubg.classList.remove('open')
          openmenu.classList.remove('open')
          container.classList.remove('open')
          menuOpen = false
      }
  }

  const outofbounds = document.querySelector('.card')
  function unfocus(e) {
    if (menuOpen) {menu()}
    outofbounds.classList.remove('open')
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
                  <div className="layout">
                      {Queue.map(data => {return (
                          <div className="data" key={data.subject}>
                              <h3>{data.data}</h3>
                              <p>{data.subject}</p>
                              <span/>
                          </div>
                      )})}
                  </div>
                </div>
              </div>
            </div>
            <div className="showcase">
              <div className="imgholder"><img src={media.Image} alt="" /></div>
              <h3>{media.name}</h3>
              <p>5015 Westheimer Rd, Houston, TX 77056</p>
              <div>
                <h4>20 ppl</h4>
                <h4>40/hr</h4>
              </div>
              <div className="buttons">
                <button onClick={menu}><div id='arrow'><div className='arrow'/></div>Info</button>
                <button>Queup</button>
              </div>
            </div>
          </div>
        </div>
    </Wrapper>
  );
}

const ThemePallets = {
  white: '#fff',
  red: '#ff0000'
}

const Wrapper = styled.div`
  .Container{    
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    min-width: 85vw;
    min-height: 70vh;
    overflow: hidden;
    filter: saturate(70%);
    .close{
      all: unset;
      position: absolute; 
      top: 1vh; 
      right: 5vw;
      font-size: 1.4rem;
      font-weight: bold;
      color: white;
      cursor: pointer;
      z-index: 2;
      &:hover{
        color: silver;
      }
    }
    .backdrop{
      @keyframes animateGradient {
        0% {
          
        }
        50% {

        }
        0% {

        }
      }
      position: relative;
      min-width: 200%;
      min-height: 70vh;
      border-radius: .5rem;
      background: linear-gradient(270deg, #8b0000b9 0%, #5c0000 16%, #8b0000 50%, #b82c2c 100%);
      overflow: hidden;
      animation: animateGradient 10s infinite;
      &::after{
        position: absolute;
        content: '';
        min-width: 200%;
        min-height: 70vh; 
        backdrop-filter: blur(50px);
        border-radius: .5rem;
        animation: animateGradient 10s infinite;
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
      align-items: center;
      position: absolute; 
      color: white;
      overflow: hidden;
      .showcase{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;
        width: 30vw;
        height: 40rem;
        div{
            display: flex;
            margin-top: .5rem;
            h4{
              display: flex;
              padding: .2rem .5rem; 
              margin: 0; 
              font-size: .8rem;
              font-family: 'cinzel', serif;
              &:first-child{ border-right: 4px double;}
            }
        }
        .imgholder{
          display: flex;
          justify-content: center;
          align-items: center;
          aspect-ratio: 1/1;
          background-color: white;
          border: 2px solid #360000d3;
          border-radius: .5rem;
          box-shadow: inset 0px 0px 15px 0px #e7040434, 0px 0px 115px 0px rgba(0,0,0,0.75);
          width: 15rem;
          overflow: hidden;
          img{
            border-radius: .5rem;
            -webkit-user-drag: none;
            -khtml-user-drag: none;
            -moz-user-drag: none;
            -o-user-drag: none;
          }
        }
        h3{
          margin: .5rem;
          font-family: 'Cinzel', serif; 
          color: ${ThemePallets.white};
        }
        p{
          margin: 0;
          padding: 0;
          color: white;
          font-size: .7rem;
        }
        .buttons{
          display: flex;
          justify-content: center;
          width: 100%;
          margin-top: 3rem;
          button{
            display: flex;
            justify-content: center;
            align-items: center;
            padding: .5rem 1rem;
            margin: 0 .5rem;
            width: 6rem;
            height: 2rem;
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
        position: relative;
        width: 80%;
        visibility: hidden;
        position: absolute;
        &.open {
          visibility: visible;
          position: relative;
          flex-direction: column;
          animation: fadeout 0.5s;
          .layout{
            display: flex;
            flex-direction: row; 
            .data{
              display: flex;
              flex-direction: column;
              align-items: center;
              position: relative;
              width: 9rem;
              h3{margin: 0; margin-top: 1rem; color: white; font-size: 1.4rem; z-index: 2;}
              p{
                  margin: 0;
                  text-align: center;
                  color: black;
                  font-weight: bold;
              }
              span{
                  position: absolute;
                  top: 1rem;
                  aspect-ratio: 1/1;
                  width: 0px;
                  background-color: transparent;
                  border-radius: 50%;
                  box-shadow: 0 -5px 50px 1.5vh #7c7a74; 
              }
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
        display: flex; 
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
          display: flex; 
        display: flex; 
        justify-content: unset;
        height: .1rem;
        width: 1.2rem;
        border-radius: 1rem;
        background-color: white;
        //z-index is negative because the small arrow visual svg was being pressed rather than the button itself 
          //z-index is negative because the small arrow visual svg was being pressed rather than the button itself 
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
      margin-top: -6rem;
      .container2{
        display: flex;
        justify-content: center;
        width: 100%;
        overflow-y: hidden;
      }
      .showcase{
        width: max-content;
      }
      .backdrop{
        border-radius: unset;
        &::after{
          width: 100vw;
          height: 100vh;
        }
      }
      &.open{
        .backdrop{
          min-height: 100vh;
          &::after{
            width: 100vw;
            height: 100vh;
          }
        }
        .info{
          width: 90vw;
          padding-bottom: 5rem;
          &.open{
            height: max-content;
            margin-bottom: 20rem;
            h3{ margin-top: 3rem; font-size: 1rem; color: black}
            h4{font-size: 1rem;}
            .layout .data h3{font-size: 1rem}
            .layout .data p{font-size: .9rem}
          }
        }
        .container2{
          flex-direction: column-reverse;
          align-items: center;
          height: 80vh;
          overflow-y: scroll;
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

export default card_Model;
