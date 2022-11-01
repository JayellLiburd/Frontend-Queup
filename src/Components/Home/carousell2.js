import React, {useContext, useEffect} from 'react'
import styled from 'styled-components'
import { usersContext } from '../../Connections/user'
import { shuffle } from '../../Functions/Arrayhelpers'

function Carousell2 (props) {

  useEffect(() => {
    const outofbounds = document.querySelector('.card')
  })

  const {setMedia} =  useContext(usersContext)
  function Displaymedia(item) {
    setMedia(item)
    const outofbounds = document.querySelector('.card')
    outofbounds.classList.add('open')
  }

  return (
    <Wrapper>
        {props.array.map((item) => {
        return (
          <div key={item.Header}>
            <h3>{item.Header}<button>View More</button></h3>
            <div className='media-container'>
                {shuffle(item.results).filter((_, index) => index < 7).map(item => {return (
                <div className="outter-case" key={item.name} onClick={e => Displaymedia(item)}>
                    <div className='media'>
                      <button onClick={e => Displaymedia(item)}>View</button>
                      <img src={item.Image} alt="" loading='lazy'/> 
                    </div>
                    <h3>{item.name}</h3>
                </div>)})}
            </div>
          </div>
          )
        })}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  max-width: 100%;
  &::-webkit-scrollbar{ width: 8px; height: 8px}
  &::-webkit-scrollbar-track{background-color: rgba(167, 167, 167, 0); margin: 0;}
  &::-webkit-scrollbar-thumb{ background-color: rgba(157, 123, 96, 0.252); border-radius: 12px;}
  &:hover{::-webkit-scrollbar-thumb{ background-color: rgba(157, 123, 96, 0.752)}}
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
      border: unset;
      border-radius: 1rem;
      font-size: .7rem;
      font-weight: bold;
      color: #2b2118;
      cursor: pointer;
      &:hover{
        border: 1px solid silver;
      }
    }
  }
  .media-container{
      display: flex;
      position: relative;
      flex-direction: row;
      overflow-x: scroll;
      width: 97vw;
      min-height: 13rem;
      &::-webkit-scrollbar{ width: 8px; height: 8px}
      &::-webkit-scrollbar-track{background-color: rgba(167, 167, 167, 0); margin: 0 1rem;}
      &::-webkit-scrollbar-thumb{ background-color: rgba(157, 123, 96, 0.952); border-radius: 12px;}
      .outter-case{
        all: unset;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        padding-top: .5rem;
        min-width: 7rem;
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
      &:hover{
        &::after{visibility: visible}
        button{visibility: visible; }
      }
      img{
        position: absolute;
        transform: scale(.4);
        -webkit-user-drag: none;
        -khtml-user-drag: none;
        -moz-user-drag: none;
        -o-user-drag: none;
      }
    }
  @media (min-width: 1400px) {
    width: 95vw;
    .media-container{
        transition-delay: .3s;
        min-height: 12rem;
        width: 60vw;
        height: 18rem;
        &::-webkit-scrollbar{ width: 15px; height: 10px;}
        &::-webkit-scrollbar-track{background-color: rgba(0, 0, 0, 0);}
        &::-webkit-scrollbar-thumb{ background-color: rgba(252, 222, 190, 0.096); border-radius: 12px;}
        &:hover{ ::-webkit-scrollbar-thumb{ background-color: rgba(211, 178, 142, 0.747);  border-radius: 12px;}}
        .outter-case{
          min-width: 11rem;
        }
      }
      .media{
        width: 9.5rem;
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

export default Carousell2 