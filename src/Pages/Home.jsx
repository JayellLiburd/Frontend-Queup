import { React, useContext, useEffect, useState } from 'react'
import styled from 'styled-components'

import Headcards from '../Components/Home/Headcards'
import { usersContext } from '../Connections/user'

function Home() {

  const Test = [{name: "Mc Donald's", Image: "Images/mcd.jpg"}, {name: "Starbucks", Image: "Images/star.jpg"}, {name: "Nike", Image: "Images/nike.png"}, {name: "MD Herrmon", Image: "Images/mem.jpg"}, {name: "Post Houston", Image: "Images/hou.jpg"}, {name: 'Apple', Image: "Images/apple.png"}, {name: 'Sky Zone', Image: "Images/sky.png"}, {name: 'CheeseCake Factory', Image: "Images/cheese.png"}, {name: 'Trusted Kicks', Image: "Images/trusted.jpg"}]

  const {auth, user, ui} =  useContext(usersContext)
  const [ cardInfo, setInfo ] = useState([])
  let name = 'Welcome Back ' + user.name

  var menu = false
  function UI() {
    const view = document.querySelector('#viewmodal')
    if (!menu) {view.classList.add('open'); menu = true}
    else{ view.classList.remove('open');  menu = false}
  }

  function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

  return (
    <Wrapper>
      

      <div className="hero">
        <h2>Queup</h2>
        <h3 className='user'>{auth ? name + '...' : "Lets not wait any longer"}</h3>
        {/* <input type="text" className="search" placeholder="🔎 Let's find something to do..."/> */}
        <div id="gradient" />
        <img src="Images/hero.jpg" alt=""/>
        <div className='headcards'><Headcards/></div>
      </div>

      <div className="content">
        <h3>Trending <button>view more</button></h3>
        <div className='media-container'>
          {shuffle(Test).filter((_, index) => index < 6).map(item => {return (
            <div className="case">
                <div className='media'> 
                  <img src={item.Image} alt="" loading='lazy'/> 
                </div>
              <h3>{item.name}</h3>
          </div>
          )})}
        </div>
        <h3>Hotspots <button>view more</button></h3>
        <div className='media-container'>
          {shuffle(Test).filter((_, index) => index < 6).map(item => {return (
            <div className="case">
              <div className='media'> 
                <img src={item.Image} alt="" loading='lazy'/> 
              </div>
            <h3>{item.name}</h3>
        </div>
          )})}
        </div>
        <h3>Yummy Spots <button>view more</button></h3>
        <div className='media-container'>
          {shuffle(Test).filter((_, index) => index < 6).map(item => {return (
            <div className="case">
              <div className='media'> 
                <img src={item.Image} alt="" loading='lazy'/> 
              </div>
            <h3>{item.name}</h3>
        </div>
          )})}
        </div>
        <h3>Raffles <button>view more</button></h3>
        <div className='media-container'>
          {shuffle(Test).filter((_, index) => index < 6).map(item => {return (
            <div className="case">
              <div className='media'> 
                <img src={item.Image} alt="" loading='lazy'/> 
              </div>
              <h3>{item.name}</h3>
            </div>
          )})}
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  width: 100vw;
  margin-top: 4rem;
  min-height: 60rem;
  z-index: 1;

  .hero{
    display: flex;
    justify-content: center;
    /* position: sticky; */
    top: 0;
    height: 18rem;
    box-shadow: 0px -15px 50px 0px #acacac;
    overflow: hidden;
    z-index: -1;
    h2{
      position: absolute;
      top: 2rem;
      left: 2rem;
      font-size: 1.8rem;
      font-family: 'Cinzel', serif;
      color: silver;
    }
    h3{
      position: absolute;
      top: 5.3rem;
      left: 4rem;
      font-size: 1rem;
      font-family: 'Cinzel', serif;
      color: silver;
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
    }
    .headcards{
      position: absolute;
      left: 0rem;
    }
  }

  .content{
    display: flex;
    flex-direction: column; 
    overflow-x: hidden;
    margin-bottom: 1rem;
    padding-top: 2rem;
    min-height: 50rem;
    background-color: white;
    z-index: 5;
    h3{
      display: flex; 
      justify-content: space-between;
      margin: 0 1rem;
      padding: 0;
      color: #2b2118c1;
      font-family: 'Cinzel', serif;
      button{
        color: #2b2118;
      }
    }
    .media-container{
      display: flex;
      position: relative;
      flex-direction: row;
      align-items: top;
      overflow-x: scroll;
      width: 95vw;
      min-height: 11rem;
      margin-bottom: 1rem;
      padding-top: .5rem;
      padding-right: 1rem;
      h3{
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        top: .3rem;
        font-size: .8rem;
        font-family: unset;
      }
    }
    .media{
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      margin: 0 .2rem;
      margin-left: .5rem;
      min-width: 6rem; 
      height: 8.5rem;
      background-color: white;
      border-radius: .5rem;
      box-shadow: 0 0 10px 1px #dbdbdb;
      overflow: hidden;
      img{
        position: absolute;
        transform: scale(.7);
        -webkit-user-drag: none;
        -khtml-user-drag: none;
        -moz-user-drag: none;
        -o-user-drag: none;
      }
    }
  }

  @media screen and (min-width: 940px){
    margin-top: 5rem;
    width: 60vw;
    .filter{display: none;} 
    .hero{
      height: 22rem;
      border-radius: .5rem;
      position: relative;
      h2{left: 10rem;}
      h3{left: 12rem; font-size: 1rem;}
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
      .headcards{
        position: relative;
        left: 37rem;
        top: 2rem;
      }
    }
    .content{
      background-color: transparent;
      .media-container{
        transition-delay: 1s;
        min-height: 12rem;
        &::-webkit-scrollbar{ width: 15px; height: 10px;}
        &::-webkit-scrollbar-track{background-color: rgba(0, 0, 0, 0);}
        &::-webkit-scrollbar-thumb{ background-color: rgba(252, 222, 190, 0.096); border-radius: 12px;}
        &:hover{ ::-webkit-scrollbar-thumb{ background-color: rgba(211, 178, 142, 0.747);  border-radius: 12px;}}
      }
      .media{
        min-width: 17rem;
        height: 9rem;
        box-shadow: none;
        border: 2px solid #b9b6b1;
        border-radius: .5rem;
        h3{
          align-items: center;
          padding: 1.5rem .2rem;
          padding-bottom: 1rem;
          margin: 0;
          font-size: .9rem;
          min-width: 17rem;
          height: 2rem;
          z-index: 2;
      }
        img{background-size: cover;}
      }
    }
  }
`


export default Home