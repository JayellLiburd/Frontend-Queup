import { useEffect } from 'react'
import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import HCCarousell from '../Components/Home/HCCarousell'
import VCCarousell from '../Components/Home/VCCarousell'
import VStack from '../Components/Home/VStack'
import LocationPicker from '../Components/Home/LocationPicker'

import Headcards from '../Components/Home/filters'
import Cardmodel from '../Components/Models/Card_model'
import { Updater, usersContext } from '../Helpers/Context'
import { BusinessTypes } from 'Connections/lib/@Types'


function Home() {

  const [gallery, setGallery] = useState<Array<BusinessTypes>>([]) 
  const [media, setMedia] = useState<BusinessTypes>({})
  const [listener, setListener] = useState(false)

  useEffect(() => {
    axios.post(process.env.REACT_APP_Server + '/api/gallery', { all: 1, location: location.locality }, {withCredentials: true}).then(res => {
      setGallery(res.data)
    })
  }, [])
  const catalog = [
    {Header: 'Trending', results: gallery }, 
    {Header: 'Hype-Gear', results: gallery },
    {Header: 'Food', results: gallery },
    {Header: 'Raffles', results: gallery },
    {Header: 'Upcoming', results: gallery },
  ]

  const {user} =  useContext(usersContext)
  let location = localStorage.loc ? JSON.parse(localStorage.loc) : {}
  
  const LocationEl = document.getElementById('locationDiv')
  const LocationPickerEl = document.getElementById('locationPicker')
  const LocationInput = document.getElementById('locationInput')
  if ( LocationEl ) {LocationEl.addEventListener('click', ({target}) => {
    if (!LocationPickerEl || !target) return
    else 
      if (!LocationPickerEl.closest('div')?.contains(target as Node)) {
        LocationEl.style.display = 'none'
      }
  })}

  const OpenLocation = () => {
    if (!LocationEl || !LocationInput) return
    LocationEl.style.display = 'flex'
    LocationInput.focus()
  }
  
  return (
    <Updater.Provider value={{listener, setListener, media, setMedia}}>
      <Wrapper>
        <div className="hero" style={{display: ''}}>
          <div className='header'>
            <img src="Images/logo.png" alt="" />
            <div>
              <img src="Images/Queup.gif" alt="" className='neon' />
            </div>
          </div>
          <img src="Images/wait3.jpg" alt=""/>
        </div>
        <div className='headcards'>
          <div className='city' onClick={e => OpenLocation()}>
            <h2>Location</h2>
            <p>{`${location.locality ? location.locality : 'Choose Location'} ${location.postal_code ? location.postal_code : ''}`}</p>
          </div>
          <Headcards/>
        </div>
        <div className="card">{listener ? <Cardmodel {...media} />: ''}</div>
          <div className="content">
            <VCCarousell {...{header: 'Trending', results: gallery}}/>
            <HCCarousell {...{header: 'Hype-Gear', results: gallery}}/>
            <VCCarousell {...{header: 'Food', results: gallery}}/>
            <VCCarousell {...{header: 'Raffles', results: gallery}}/>
            <VStack {...{header: 'Upcoming', results: gallery}}/>     
          </div>
        <div id='locationDiv'><LocationPicker/></div>
      </Wrapper>
    </Updater.Provider>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1;
  .hero{
    display: flex;
    position: relative;
    margin-bottom: 1rem;
    height: 20rem;
    width: 100vw;
    box-shadow: 0px 0px 20px 0px #acacac;
    overflow: hidden;
    z-index: -1;
    .header{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: absolute;
      padding-top: 5rem;
      z-index: 2;
      img{
        position: relative;
        top: 7rem;
        left: 12rem;
        width: 15rem;
        height: 100%;
        object-fit: cover;
        transform: rotateY(-65deg) rotateZ(1deg);
      }
      div{
        height: 8.5rem;
      }
      .neon{
        position: relative;
        top: -6rem;
        left: 30rem;
        width: 15rem;
        height: 50%;
        object-fit: cover;
        overflow: hidden;
        transform: rotateY(65deg) rotateZ(2.8deg);
      }
    }
    .search{
      position: absolute;
      top: 8rem;
      width: 80vw;
      font-size: 1rem;
      background-color: transparent;
      border: none;
      border-radius: unset;
      border-bottom: 5px solid silver;
      z-index: 2;
      &::placeholder{color: #d8d8d8; font-weight: bold;}
    }
    #gradient{
      position: absolute;
      width: 100vw;
      height: 18rem;
      box-shadow: inset 0px 0 100px 10px #6868685f;
    }
    img{
      position: relative;
      border: .5rem;
      margin-top: -8rem;
      aspect-ratio: 1/1;
      width: 100%;
      object-fit: cover;
    }
  }
  .headcards{
    display: flex;
    position: relative;
    align-items: center;
    margin-bottom: 1rem;
    width: 60vw;
    overflow: hidden;
    overflow-x: auto;
    .city{
      display: flex;
      flex-direction: column;
      margin: 0 1rem;
      padding: .1rem 1rem;
      min-width: 6rem;
      max-width: 7rem;
      background: radial-gradient(ellipse at center, #fcf6ef 70%,#84684936 100%);
      border-radius: .5rem;
      cursor: pointer;
      h2{font-size: 1rem; margin: 0;}
      p{font-size: .7rem; margin: 0; width: max-content;}
      &:hover{
        background: radial-gradient(ellipse at center, #fff1e3 70%,#84684936 100%);
      }
    }
  }
  .card{
    display: none;
    position: fixed;
    top: 15vh;
    z-index: 6;
    &.open{
      display: block;
    }
  }
  .content{
    display: flex;
    flex-direction: column;
    padding-bottom: 3rem;
    width: 60vw;
    background-color: white;
    overflow-x: hidden;
    z-index: 5;
  }
  #locationDiv{
    display: none;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 7;
  }
  
  @media screen and (max-width: 940px){
    .hero{
      height: 16rem;
    }
    .headcards{
      width: 100vw;
    }
    .content{
      width: 98vw;
    }
  }
`


export default Home