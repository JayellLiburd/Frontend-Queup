import { BusinessTypes } from 'Connections/lib/@Types';
import React, {useContext} from 'react'
import styled from 'styled-components'
import { Updater } from '../../Helpers/Context'

type Options = {
  carousel?: boolean;
}

function VCCarousell(props: { header: string, results: Array<BusinessTypes>}, options: Options = {carousel: true}) {
  
  const {setListener, setMedia} = useContext(Updater)

  const placeHolders = Array(7).fill('')

  
  function Displaymedia(item: BusinessTypes) {
    setMedia(item)
    setListener(true)
    const outofbounds = document.querySelector('.card')
    if (outofbounds) outofbounds.classList.add('open')
  }

  return (
    <Wrapper property={props.header}>
      {props.results.length !== 0 ? 
        <div key={props.header}>
        <h3>{props.header}<button>View More</button></h3>
        <div className='media-container'>
            {shuffle(props.results).filter((_, index) => index < 7).map(item => {
              return (
              <div className="outter-case" key={item.name} onClick={e => Displaymedia(item)}>
                <div className='media'>
                  <button onClick={e => Displaymedia(item)}>View</button>
                  <img src={'https://storage.googleapis.com/queup-images/' + item.image} alt="" loading='lazy'/> 
                </div>
                <h3>{item.name}</h3>
              </div>)}
            )}
        </div>
      </div>
      : 
      <div>
        <h3>{props.header}<button>View More</button></h3>
        <div className='media-container'>
          {placeHolders.filter((_, index) => index < 7).map(item => {
            return (
              <div className="outter-case" key={item} >
                <div className='media empty'>loading</div>
              </div>
          )})}
        </div>
      </div>
      }
    </Wrapper>
  )
}

const Wrapper = styled.div.attrs(props => ({id: props.property}))`

  h3{
    display: flex; 
    justify-content: space-between;
    margin: .5rem 1rem;
    padding: 0;
    color: #686767;
    font-size: 1rem;
    font-family: 'Cinzel', serif;
    font-weight: 600;
    button{
      padding: 0 1rem;
      border: unset;
      border-radius: .5rem;
      font-size: .7rem;
      font-weight: bold;
      color: #2b2118;
      background: radial-gradient(ellipse at center, #fcf6ef 70%,#84684936 100%);
      transition: all .2s ease-in-out;
      cursor: pointer;
      &:hover{
        background: #e1e1e168;
      }
    }
  }
  .media-container{
      display: flex;
      position: relative;
      flex-direction: row;
      overflow-x: scroll;
      min-height: 13rem;
      &::-webkit-scrollbar{ height: 4px;}
      &::-webkit-scrollbar-track{background-color: rgba(0, 0, 0, 0); margin: 0 10vw;}
      &::-webkit-scrollbar-thumb{ background-color: rgba(157, 123, 96, 0.252); border-radius: 12px;}
      &:hover{::-webkit-scrollbar-thumb{ background-color: rgba(157, 123, 96, 0.752)}}
      .outter-case{
        all: unset;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        padding-top: .5rem;
        min-width: 6.5rem;
        h3{
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          position: relative;
          margin: 0;
          margin-top: .5rem;
          padding: 0;
          font-size: .8rem;
          font-family: unset;
          font-weight: 600;
        }
      }
    }
    .media{
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      margin: 0;
      padding: 0;
      width: 6rem;
      height: 9rem;
      background-color: white;
      border-radius: .3rem;
      box-shadow: -2px 3px 5px 1px rgba(0,0,0,0.16);
      -webkit-box-shadow: -2px 3px 5px 1px rgba(0,0,0,0.16);
      -moz-box-shadow: -2px 3px 5px 1px rgba(0,0,0,0.16);
      overflow: hidden;
      cursor: pointer;
      &::after{
        display: flex;
        visibility: hidden;
        justify-content: center;
        align-items: center;
        position: absolute;
        content: '';
        background: linear-gradient(180deg, rgba(255,255,255,0) 0%, rgb(32,16,5,.5) 100%);
        width: 6rem;
        height: 9rem;
        transition-delay: .1s;
      }
      button{
        all: unset;
        display: flex;
        visibility: hidden;
        justify-content: center;
        align-items: center;
        text-align: center;
        position: relative;
        padding: .5rem;
        aspect-ratio: 1/1;
        width: 2rem;
        font-weight: 600;
        font-family: serif;
        background-color: #c0c0c0a6;
        border-radius: 1rem;
        border: 3px solid grey;
        z-index: 3;
        cursor: pointer;
        transition-delay: .07s;
      }
      img{
        position: absolute;
        aspect-ratio: 1/1;
        width: 100%;
        object-fit: cover;
        mix-blend-mode: multiply;
        -webkit-user-drag: none;
        -khtml-user-drag: none;
        -moz-user-drag: none;
        -o-user-drag: none;
      }
      &:hover{
        &::after{visibility: visible}
        button{visibility: visible; }
      }
      &.empty{
        color: #c0c0c0a6;
        background: #eee;
        background: linear-gradient(110deg, #ececec 18%, #f5f5f5 28%, #ececec 33%);
        border-radius: 5px;
        background-size: 200% 100%;
        animation: 1.5s shine linear infinite;
        pointer-events: none;
        cursor: default;
        @keyframes shine {
          to {
            background-position-x: -200%;
          }
        }
      }
    }
    @media (min-width: 1400px) {
    .media-container{
        position: relative;
        width: 100%;
        transition-delay: .3s;
        min-height: 12rem;
        height: 18rem;
        .outter-case{
          min-width: 10rem;
        }
      }
      .media{
        width: 9rem;
        height: 14rem;
        &::after{
          width: 9.5rem;
          height: 14rem;
        }
        h3{
          align-items: center;
          padding: 1.5rem .2rem;
          padding-bottom: 1rem;
          margin: 0;
          font-size: 2rem;
          min-width: 17rem;
          height: 2rem;
          z-index: 2;
        }
        img{background-size: cover; transform: scale(.6);}
      }
  }
`

function shuffle(array: Array<BusinessTypes> = []) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}


export default VCCarousell