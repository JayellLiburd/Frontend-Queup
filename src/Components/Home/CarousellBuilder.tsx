import React, {useContext} from 'react'
import styled from 'styled-components';
import { Updater } from '../../Helpers/Context'


type Media = {
  name: string;
  image: string;
  [key: string]: any;
}

/**

 */

type Options = {
  carousel?: boolean;
}

/**
 * @param {string} props.header - The header of the carousell
 * @param {Array<Media>} props.gallery - An array of objects to be displayed as media
 * 
 * @param {Options} options - An object of options
 * @param {boolean} options.carousel - Whether or not to display the carousell
 * 
 * @typedef {Object} Options
 * @property {boolean} carousel - Whether or not to display the carousell
 * */ 
function CarousellBuilder(props: { header: string, gallery: Array<Media>}, options: Options = {carousel: true}) {


  const placeHolders = Array(7).fill('')
  function shuffle(array: Array<Media>) {
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


  const {setListener, setMedia} = useContext(Updater)
  function Displaymedia(item: Media) {
    setMedia(item)
    setListener(true)
    const outofbounds = document.querySelector('.card')
    if (outofbounds) outofbounds.classList.add('open')
  }

  return (
    <Wrapper property={props.header} theme={options}>
      {props.gallery.length !== 0 ? 
      <>
        <h2>{props.header}</h2>
        <div>
          {shuffle(props.gallery).filter((_, index) => index < 5).map(item => {
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

`

export default CarousellBuilder