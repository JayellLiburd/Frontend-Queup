import { BusinessTypes } from 'Connections/lib/@Types';
import React, {useContext} from 'react'
import styled from 'styled-components';
import { Updater } from '../../Helpers/Context'

type Options = {
  carousel?: boolean;
}

function HCCarousell(props: { header: string, results: Array<BusinessTypes>}, options: Options = {carousel: true}) {

  const placeHolders = Array(7).fill('')

  const {setListener, setMedia} = useContext(Updater)
  function Displaymedia(item: BusinessTypes) {
    setMedia(item)
    setListener(true)
    const outofbounds = document.querySelector('.card')
    if (outofbounds) outofbounds.classList.add('open')
  }

  return (
    <Wrapper property={props.header} theme={options}>
    {props.results.length !== 0 ? 
      <>
        <h2>{props.header}</h2>
        <div>
          {shuffle(props.results).filter((_, index) => index < 5).map(item => {
            return (
              <div className="carousellcard" onClick={e => Displaymedia(item)}>
                <div>
                  <img src={'https://storage.googleapis.com/queup-images/' + item.image} loading='lazy' alt="" />
                  <h4>{'Open'}</h4>
                </div>
                <h3 className='h3'>{item.name}</h3>
                <p>{'20 in Queue'}</p>
              </div>
            )
          })}
        </div>
      </>
    : 
      <>
        <h2>{props.header}</h2>
        <div>
          {placeHolders.filter((_, index) => index < 5).map(item => {
            return (
              <div className="carousellcard empty" onClick={e => Displaymedia(item)}>loading</div>
              )
            })}
        </div>
      </>
    }
    </Wrapper>
  )
}

const Wrapper = styled.div.attrs(props => ({id: props.property}))`
margin-bottom: 1rem;
h2{
  justify-content: space-between;
  margin: 0.5rem 1rem;
  padding: 0;
  color: #686767;
  font-size: 1rem;
  font-family: 'Cinzel',serif;
  font-weight: 600;
}
div{
  display: flex; 
  overflow: auto;
  height: calc(85%);
  &::-webkit-scrollbar{height: 4px}
  &::-webkit-scrollbar-track{background-color: rgba(167, 167, 167, 0); margin: 0 10vw;}
  &::-webkit-scrollbar-thumb{ background-color: rgba(157, 123, 96, 0.252); border-radius: 12px;}
  &:hover{::-webkit-scrollbar-thumb{ background-color: rgba(157, 123, 96, 0.752)}}
}
.carousellcard{
  display: block;
  margin: .3rem;
  padding: 0 1.5rem;
  min-width: 13rem;
  max-width: 13rem;
  height: 9rem;
  color: white;
  border-radius: .8rem;
  background-color: #686767;
  box-shadow: -2px 3px 5px 2px rgba(0,0,0,0.16);
  -webkit-box-shadow: -2px 3px 5px 2px rgba(0,0,0,0.16);
  -moz-box-shadow: -2px 3px 5px 2px rgba(0,0,0,0.16);
  cursor: pointer;
  &:first-child{margin-left: .5rem;}
  &:nth-child(2n){background-color: saddlebrown;}
  div{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: unset;
    img{
      margin-top: .5rem;
      width: 4.5rem;
      height: 4rem;
      object-fit: cover;
    }
  }
  .h3{ margin: unset; color: white; font-size: .8rem; margin-top: 1rem; margin-bottom: .2rem;}
  p{ margin: 0; font-size: .8rem;}
  &.empty{
    display: flex;
    justify-content: center;
    align-items: center;
    color: #c0c0c0a6;
    background: #eee;
    background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
    border-radius: 5px;
    background-size: 200% 100%;
    animation: 1.5s shine linear infinite;
    cursor: default;
    &:nth-child(2n){background: #e2e1e1;}
    @keyframes shine {
      to {
        background-position-x: -200%;
      }
    }
  }
}
@media (max-width: 1400px) {
  width: 95vw;
  .carousellcard{
    min-width: 13rem;
    max-width: 13rem;
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

export default HCCarousell