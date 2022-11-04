import { React, useContext, useState } from 'react'
import styled from 'styled-components'
import Carousell from '../Components/Home/carousell'
import Carousell2 from '../Components/Home/carousell2'
import Carousell3 from '../Components/Home/carousell3'

import Headcards from '../Components/Home/Headcards'
import Cardmodel from '../Components/Models/Card_model'
import { usersContext } from '../Connections/user'

import { shuffle } from '../Functions/Arrayhelpers'

function Home() {

  const Test = [
    [{Header: 'Trending', results: [{name: "Mc Donald's", Image: "Images/mcd.png", date: 'Oct 18'}, {name: "Starbucks", Image: "Images/star.png", date: 'Dec 5'}, {name: "Nike", Image: "Images/nike.png", date: 'Dec 2'}, {name: "MD Herrmon", Image: "Images/mem.png", date: 'Oct 18'}, {name: "Post Houston", Image: "Images/hou.jpg", date: 'Oct 23'}, {name: 'Apple', Image: "Images/apple.png", date: 'Nov 6'}, {name: 'Sky Zone', Image: "Images/sky.png", date: 'Oct 19'}, {name: 'CheeseCake Factory', Image: "Images/cheese.png", date: 'Oct 18'}, {name: 'Trusted Kicks', Image: "Images/trusted.png", date: 'Nov 17'}, {name: 'Turkey Leg Hut', Image: "Images/turkey.png", date: 'Oct 30'}, {name: 'MicroCenter', Image: "Images/msc.png", date: 'Dec 10'}, {name: 'Lyric Tower', Image: "Images/lyrichouston.png", date: 'Dec 10'}]}], 
    [{Header: 'Food', results: [{name: "Mc Donald's", Image: "Images/mcd.png", date: 'Oct 18'}, {name: "Starbucks", Image: "Images/star.png", date: 'Dec 5'}, {name: "Nike", Image: "Images/nike.png", date: 'Dec 2'}, {name: "MD Herrmon", Image: "Images/mem.png", date: 'Oct 18'}, {name: "Post Houston", Image: "Images/hou.jpg", date: 'Oct 23'}, {name: 'Apple', Image: "Images/apple.png", date: 'Nov 6'}, {name: 'Sky Zone', Image: "Images/sky.png", date: 'Oct 19'}, {name: 'CheeseCake Factory', Image: "Images/cheese.png", date: 'Oct 18'}, {name: 'Trusted Kicks', Image: "Images/trusted.png", date: 'Nov 17'}, {name: 'Turkey Leg Hut', Image: "Images/turkey.png", date: 'Oct 30'}, {name: 'MicroCenter', Image: "Images/msc.png", date: 'Dec 10'}, {name: 'Lyric Tower', Image: "Images/lyrichouston.png", date: 'Dec 10'}]}],
    [{Header: 'Hype-Gear', results: [{name: "Mc Donald's", Image: "Images/mcd.png", date: 'Oct 18'}, {name: "Starbucks", Image: "Images/star.png", date: 'Dec 5'}, {name: "Nike", Image: "Images/nike.png", date: 'Dec 2'}, {name: "MD Herrmon", Image: "Images/mem.png", date: 'Oct 18'}, {name: "Post Houston", Image: "Images/hou.jpg", date: 'Oct 23'}, {name: 'Apple', Image: "Images/apple.png", date: 'Nov 6'}, {name: 'Sky Zone', Image: "Images/sky.png", date: 'Oct 19'}, {name: 'CheeseCake Factory', Image: "Images/cheese.png", date: 'Oct 18'}, {name: 'Trusted Kicks', Image: "Images/trusted.png", date: 'Nov 17'}, {name: 'Turkey Leg Hut', Image: "Images/turkey.png", date: 'Oct 30'}, {name: 'MicroCenter', Image: "Images/msc.png", date: 'Dec 10'}, {name: 'Lyric Tower', Image: "Images/lyrichouston.png", date: 'Dec 10'}]}],
    [{Header: 'Raffles', results: [{name: "Mc Donald's", Image: "Images/mcd.png", date: 'Oct 18'}, {name: "Starbucks", Image: "Images/star.png", date: 'Dec 5'}, {name: "Nike", Image: "Images/nike.png", date: 'Dec 2'}, {name: "MD Herrmon", Image: "Images/mem.png", date: 'Oct 18'}, {name: "Post Houston", Image: "Images/hou.jpg", date: 'Oct 23'}, {name: 'Apple', Image: "Images/apple.png", date: 'Nov 6'}, {name: 'Sky Zone', Image: "Images/sky.png", date: 'Oct 19'}, {name: 'CheeseCake Factory', Image: "Images/cheese.png", date: 'Oct 18'}, {name: 'Trusted Kicks', Image: "Images/trusted.png", date: 'Nov 17'}, {name: 'Turkey Leg Hut', Image: "Images/turkey.png", date: 'Oct 30'}, {name: 'MicroCenter', Image: "Images/msc.png", date: 'Dec 10'}, {name: 'Lyric Tower', Image: "Images/lyrichouston.png", date: 'Dec 10'}]}],
    [{Header: 'Upcoming', results: [{name: "Mc Donald's", Image: "Images/mcd.png", date: 'Oct 18'}, {name: "Starbucks", Image: "Images/star.png", date: 'Dec 5'}, {name: "Nike", Image: "Images/nike.png", date: 'Dec 2'}, {name: "MD Herrmon", Image: "Images/mem.png", date: 'Oct 18'}, {name: "Post Houston", Image: "Images/hou.jpg", date: 'Oct 23'}, {name: 'Apple', Image: "Images/apple.png", date: 'Nov 6'}, {name: 'Sky Zone', Image: "Images/sky.png", date: 'Oct 19'}, {name: 'CheeseCake Factory', Image: "Images/cheese.png", date: 'Oct 18'}, {name: 'Trusted Kicks', Image: "Images/trusted.png", date: 'Nov 17'}, {name: 'Turkey Leg Hut', Image: "Images/turkey.png", date: 'Oct 30'}, {name: 'MicroCenter', Image: "Images/msc.png", date: 'Dec 10'}, {name: 'Lyric Tower', Image: "Images/lyrichouston.png", date: 'Dec 10'}]}]
  ]


  const {auth, user, media, setMedia} =  useContext(usersContext)
  let name = 'Welcome Back ' + user.name

  return (
    <Wrapper>
      <div className="hero">
        <div className='header'>
          <h2>Queup</h2>
          <h3 className='user'>{auth ? name + '...' : "Lets not wait any longer"}</h3>
          <div className='headcards'><Headcards/></div>
        </div>
        {/* <input type="text" className="search" placeholder="🔎 Let's find something to do..."/> */}
        <div id="gradient" />
        <img src="Images/hero.jpg" alt=""/>
      </div>
      <div className="card"><Cardmodel info={media}/></div>
      <div className="content">
        <Carousell2 array={Test[0]}/>
        <Carousell array={Test[1]}/>
        <Carousell2 array={Test[2]}/>
        <Carousell2 array={Test[3]}/>
        <Carousell3 array={Test[4]}/>      
      </div>
    </Wrapper>
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
    justify-content: center;
    position: relative;
    top: 0;
    height: 16rem;
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
      padding-top: 3rem;
      z-index: 2;
      h2{
      position: relative;
      margin: 0;
      margin-bottom: -.8rem;
      font-size: 1.8rem;
      font-family: 'Cinzel', serif;
      color: silver;
      }
      h3{
        /* left: 4rem; */
        position: relative;
        margin: 1rem 0;
        font-size: 1rem;
        font-family: 'Cinzel', serif;
        color: silver;
      }
      .headcards{
        position: relative;
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
      border: .5rem;
      margin-top: -5rem;
      width: 100vw;
      height: 25rem;
    }
  }

  .card{
    display: none;
    position: fixed;
    top: 9rem;
    z-index: 6;
    &.open{
      display: block;
    }
  }

  .content{
    display: flex;
    flex-direction: column; 
    overflow-x: hidden;
    padding-top: 2rem;
    background-color: white;
    z-index: 5;
    max-width: 100%;
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
  }
  
  @media screen and (min-width: 940px){
    margin-top: 2rem;
    width: 60vw;
    .filter{display: none;} 
    .hero{
      width: 60vw;
      min-height: 20vh;
      border-radius: .5rem;
      position: relative;
      .search{
        top: 11rem; 
        width: 30vw;
      }
      #gradient{box-shadow: unset;}
      img{
        position: relative;
        top: -10rem;
        background-size: cover;
        width: 60vw;
        height: 40rem;
        z-index: -1;
      }
    }
  }
`


export default Home