import React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Updater } from '../../Helpers/Context'
import { initializeApp } from "firebase/app";
import { getFirestore, onSnapshot, collection, terminate} from "firebase/firestore";
import { TimeConversion } from "../../Functions/InputFunctions";
import { BusinessTypes } from "Connections/lib/@Types";

function Card_Model(props: BusinessTypes) {

  const [Que, setQue] = useState(0)
  const [view, setView] = useState(false)

  const {setListener} = React.useContext(Updater);

  let Queue = [
    {subject: 'Active in Line', data: Que},
    {subject: 'Rate per/h', data: 12},
    props.open === props.close ? {subject: 'Open', data: '24 hours' } : {subject: 'Open', data: props.open ? TimeConversion(props.open) : 'N/A'},
    props.open === props.close ? {} : {subject: 'Close', data: props.close ?  TimeConversion(props.close) : 'N/A'}
  ]


  const Notes = document.getElementById('card-notes')
  if (props.notes && Notes) {Notes.innerHTML = props.notes};

  //button animation
  let menuOpen = false

  function menu() {
    const arrowAni = document.querySelector(".arrow");
    const infoBtn = document.querySelector(".info");
    const cardModal = document.querySelector(".Container");
    const infoDiv = document.querySelector(".container2");
    if (!arrowAni || !infoBtn || !cardModal || !infoDiv) return;
    if (!menuOpen) {
      arrowAni.classList.add("open");
      infoBtn.classList.add("open");
      cardModal.classList.add("open");
      infoDiv.scrollTop = 0;
      menuOpen = true;
    } else {
      arrowAni.classList.remove("open");
      infoBtn.classList.remove("open");
      cardModal.classList.remove("open");
      menuOpen = false;
    }
  }
      
  function unfocus() {
    const cardModal = document.querySelector(".Container");
    const outofbounds = document.querySelector('.card')
    // deleteApp(getApp()).then(_ => {console.log('offline')})
    if (!outofbounds || !cardModal) return;
    if (menuOpen) {menu()}
    outofbounds.classList.remove('open')
    cardModal.classList.remove('qued')
    setListener(false)
    terminate(db)
  }
      
  const config = {
    apiKey: "AIzaSyDAICINYSy_X7b0CMDNJkRkJxeWE08x58w",
    authDomain: "queup-358912.firebaseapp.com",
    databaseURL: "https://queup-358912-default-rtdb.firebaseio.com/",
    projectId: "queup-358912",
    storageBucket: "queup-358912.appspot.com",
    messagingSenderId: "606581966610",
    appId: "1:606581966610:web:6c532778a4dc45703d95cb",
    measurementId: "G-NTK8LEJN8N"
  }
  initializeApp(config)
  const db = getFirestore();

  // Action when user clicks on the QueUp button
  const queup = () => {

    // Create a point on the edge of the Modal to create a circle animation
    const randomTrueorFalse = Math.random() >= 0.5;
    const randomTrueorFalse2 = Math.random() >= 0.5;
    console.log(randomTrueorFalse, randomTrueorFalse2)
    const circle = document.createElement('div')
    circle.style.position = 'absolute'
    circle.style.background = 'grey'
    if (randomTrueorFalse) {
      circle.style.top = randomTrueorFalse2 ? `${Math.floor(Math.random() * 100) + 1}%` : '0%'
      circle.style.left = !randomTrueorFalse2 ? `${Math.floor(Math.random() * 100) + 1}%` : '0%'
      circle.style.transform = 'translate(-50%, -50%)'
    } else {
      circle.style.bottom = randomTrueorFalse2 ? `${Math.floor(Math.random() * 100) + 1}%` : '0%'
      circle.style.right = !randomTrueorFalse2 ? `${Math.floor(Math.random() * 100) + 1}%` : '0%'
      circle.style.transform = 'translate(50%, 50%)'
    }

    // Create a backdrop to cover the screen & append the circle animation
    const backdrop = document.getElementById('backdrop')
    const cardModal = document.querySelector(".Container");
    const infoDiv = document.querySelector('.container2')
    if (!backdrop || !infoDiv || !cardModal) return;
    backdrop.appendChild(circle)
    circle.classList.add('circle')
    circle.classList.add('animate')
    infoDiv.classList.add('qued')
    backdrop.style.background = ''
    backdrop.classList.add('qued')
    const Queued = document.createElement('div')
    cardModal.append(Queued)

    // Create a confirmation message
    Queued.innerHTML = `<p>Now Queued in <u>${props.name}</u>'s Line</p>`
    Queued.classList.add('confirmQueued')
    setTimeout(() => {
      const confirmationMessage = document.querySelector('.confirmQueued p');
      if (!confirmationMessage) return;

      // todo: add loading animation and then on complete, remove loading animation and add confirmation message
      confirmationMessage.classList.add('animate')
      setTimeout(() => {circle.remove()}, 1000)
    }, 4000);
    // axios.post(process.env.REACT_APP_Server + '/queup', {user: user.name, line: media.line_id}, {withCredentials: true}).then(res => {
    // })
  }

  // Watch for changes in the Que collection count
  useEffect(() => {
    if (view) {
      onSnapshot(collection(db, `Queue/${props.line_id}/Que`), (snap) => {
        setQue(snap.docs.length)
      })
    }
  }, [Que, view, props.line_id, db])

  return (
    <Wrapper {...props}>
        <div className="Container">
          <div id="backdrop" className="backdrop" style={props.color ? JSON.parse((props?.color).replaceAll("'", '"')) : {}}/>
          {/* <div className="unfocus" onClick={unfocus} /> */}
          <button className="close" onClick={() => unfocus()}>X</button>
          <div className="container2">
            <div className="info">
              <h3>Queue Info</h3>
              <button>Link To Menu</button>
              <div>
                <div id="card-notes"></div>
                <div>
                  <div className="layout">
                      {Queue.map(data => {
                        return (
                          <div className="data" key={data.subject}>
                              <h3>{data.data}</h3>
                              <p>{data.subject}</p>
                              {Object.keys(data).length > 0 ? <span/> : <></>}
                          </div>
                      )})}
                  </div>
                </div>
              </div>
            </div>
            <div className="showcase">
              <div className="imgholder"><img src={'https://storage.googleapis.com/queup-images/' + props.image} alt="" /></div>
              <h3>{props.name}</h3>
              <p>{props.address}</p>
              <div>
                <h4>20 ppl</h4>
                <h4>40/hr</h4>
              </div>
              <div className="buttons">
                <button onClick={() => {menu(); setView(true)}}><div id='arrow'><div className='arrow'/></div>Info</button>
                <button onClick={() => queup()}>Queup</button>
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
    min-height: 60vh;
    overflow: hidden;
    filter: saturate(70%);
    .close{
      all: unset;
      position: absolute; 
      top: 2vh; 
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
      position: relative;
      width: 100%;
      min-height: 30rem;
      border-radius: .5rem;
      background: linear-gradient(to bottom, #323232 0%, #3F3F3F 40%, #1C1C1C 150%), linear-gradient(to top, rgba(255,255,255,0.40) 0%, rgba(0,0,0,0.25) 200%);
      background-blend-mode: multiply;
      overflow: hidden;
      transition: all .5s ease;
      &::after{
        position: absolute;
        content: '';
        min-width: 100%;
        min-height: 100%; 
        backdrop-filter: blur(50px);
        border-radius: .5rem;
      }
      &.qued{
        transition: all 5s ease;
        background-color: black;
      }
    }
    .unfocus{
      position: fixed;
      width: 100vw;
      height:100vh;
      z-index: -1;
    }
    .container2{
      display: flex;
      flex-direction: row;
      align-items: center;
      position: absolute; 
      width: min-content;
      color: white;
      overflow-y: hidden;
      div{
        opacity: 1;
      }
      .showcase{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;
        width: 40vw;
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
            transform: scale(.5);
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
        color: #4c4c4c;
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
          }
          h4 {
            font-size: 1.3rem;
            text-decoration: underline black 3px;
          }
          #card-notes{
            color: #4c4c4c;
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
      &.qued{
        transition: all 2s ease;
        div{
          opacity: 0;
        }
      }
    }
    .circle {
      aspect-ratio: 1/1;
      width: 1%;
      /* background-color: #550e0e; */
      border-radius: 50%;
      z-index: 5;
      &.animate {
        animation: animate 5s ease;
        @keyframes animate {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          80% {
            transform: scale(150);
            opacity: 0.5;
          }
          100% {
            transform: scale(100);
            opacity: 0;
          }
        }
      }
    }
    .confirmQueued{
      position: absolute;
      color: black;
      u{
        all: unset;
        font-size: 1.2rem;
        font-weight: bold;
      }
      p {
        color: transparent;
        &.animate {
          transition: all 1s ease;
          color: white;
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
      .confirmQueued{
        top: 40%;
      }
    }
    #arrow{
      translate: -4px -1px;
      rotate: -90deg;
    }
  }
`

export default Card_Model;