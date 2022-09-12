import { React, useContext, useState } from 'react'
import styled from 'styled-components'

import Headcards from '../Components/Home/Headcards'
import Card_model from '../Components/Models/Card_model'
import { usersContext } from '../Connections/user'

import { shuffle } from '../Functions/Arrayhelpers'

function Home() {

  const Test = [
    {Header: 'Trending', results: [{name: "Mc Donald's", Image: "Images/mcd.jpg"}, {name: "Starbucks", Image: "Images/star.jpg"}, {name: "Nike", Image: "Images/nike.png"}, {name: "MD Herrmon", Image: "Images/mem.jpg"}, {name: "Post Houston", Image: "Images/hou.jpg"}, {name: 'Apple', Image: "Images/apple.png"}, {name: 'Sky Zone', Image: "Images/sky.png"}, {name: 'CheeseCake Factory', Image: "Images/cheese.png"}, {name: 'Trusted Kicks', Image: "Images/trusted.jpg"}, {name: 'Turkey Leg Hut', Image: "Images/turkey.png"}, {name: 'MicroCenter', Image: "Images/msc.png"}]}, 
    {Header: 'Food', results: [{name: "Mc Donald's", Image: "Images/mcd.jpg"}, {name: "Starbucks", Image: "Images/star.jpg"}, {name: "Nike", Image: "Images/nike.png"}, {name: "MD Herrmon", Image: "Images/mem.jpg"}, {name: "Post Houston", Image: "Images/hou.jpg"}, {name: 'Apple', Image: "Images/apple.png"}, {name: 'Sky Zone', Image: "Images/sky.png"}, {name: 'CheeseCake Factory', Image: "Images/cheese.png"}, {name: 'Trusted Kicks', Image: "Images/trusted.jpg"}, {name: 'Turkey Leg Hut', Image: "Images/turkey.png"}, {name: 'MicroCenter', Image: "Images/msc.png"}]},
    {Header: 'Raffles', results: [{name: "Mc Donald's", Image: "Images/mcd.jpg"}, {name: "Starbucks", Image: "Images/star.jpg"}, {name: "Nike", Image: "Images/nike.png"}, {name: "MD Herrmon", Image: "Images/mem.jpg"}, {name: "Post Houston", Image: "Images/hou.jpg"}, {name: 'Apple', Image: "Images/apple.png"}, {name: 'Sky Zone', Image: "Images/sky.png"}, {name: 'CheeseCake Factory', Image: "Images/cheese.png"}, {name: 'Trusted Kicks', Image: "Images/trusted.jpg"}, {name: 'Turkey Leg Hut', Image: "Images/turkey.png"}, {name: 'MicroCenter', Image: "Images/msc.png"}]},
    {Header: 'Hype-Gear', results: [{name: "Mc Donald's", Image: "Images/mcd.jpg"}, {name: "Starbucks", Image: "Images/star.jpg"}, {name: "Nike", Image: "Images/nike.png"}, {name: "MD Herrmon", Image: "Images/mem.jpg"}, {name: "Post Houston", Image: "Images/hou.jpg"}, {name: 'Apple', Image: "Images/apple.png"}, {name: 'Sky Zone', Image: "Images/sky.png"}, {name: 'CheeseCake Factory', Image: "Images/cheese.png"}, {name: 'Trusted Kicks', Image: "Images/trusted.jpg"}, {name: 'Turkey Leg Hut', Image: "Images/turkey.png"}, {name: 'MicroCenter', Image: "Images/msc.png"}]},
    {Header: 'Hidden Gems', results: [{name: "Mc Donald's", Image: "Images/mcd.jpg"}, {name: "Starbucks", Image: "Images/star.jpg"}, {name: "Nike", Image: "Images/nike.png"}, {name: "MD Herrmon", Image: "Images/mem.jpg"}, {name: "Post Houston", Image: "Images/hou.jpg"}, {name: 'Apple', Image: "Images/apple.png"}, {name: 'Sky Zone', Image: "Images/sky.png"}, {name: 'CheeseCake Factory', Image: "Images/cheese.png"}, {name: 'Trusted Kicks', Image: "Images/trusted.jpg"}, {name: 'Turkey Leg Hut', Image: "Images/turkey.png"}, {name: 'MicroCenter', Image: "Images/msc.png"}]}
  ]

  const {auth, user} =  useContext(usersContext)
  const [media, setMedia] = useState([{name: "sorry something went wrong..."},{Image: "Images/temp.png"}])
  let name = 'Welcome Back ' + user.name

  function Displaymedia(item) {
    setMedia(item)
    const outofbounds = document.querySelector('.card')
    outofbounds.classList.add('open')
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
      <div className="card"><Card_model info={media}/></div>
      <div className="content">
        {Test.map((item) => {
        return (
          <div key={item.Header}>
            <h3>{item.Header}<button>View More</button></h3>
            <div className='media-container'>
                {shuffle(item.results).filter((_, index) => index < 7).map(item => {return (
                <button className="outter-case" key={item.name} onClick={e => Displaymedia(item)}>
                    <div className='media'>
                      <button onClick={e => Displaymedia(item)}>View</button>
                      <img src={item.Image} alt="" loading='lazy'/> 
                    </div>
                    <h3>{item.name}</h3>
                </button>)})}
            </div>
          </div>
          )
        })}
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
    h2{
      position: absolute;
      top: 2rem;
      font-size: 1.8rem;
      font-family: 'Cinzel', serif;
      color: silver;
    }
    h3{
      position: absolute;
      top: 5.3rem;
      /* left: 4rem; */
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
      margin-top: -5rem;
      width: 100vw;
      height: 25rem;
    }
    .headcards{
      position: absolute;
      bottom: 2rem;
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
      box-shadow: 0 0 10px 1px #d1d1d1;
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
        transition-delay: .1s;
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
  }

  @media screen and (min-width: 940px){
    margin-top: 2rem;
    width: 60vw;
    .filter{display: none;} 
    .hero{
      width: 60vw;
      height: 15rem;
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
    .displaymedia{top: 15rem;}
    .content{
      background-color: transparent;
      .media-container{
        transition-delay: 1s;
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
          font-size: .9rem;
          min-width: 17rem;
          height: 2rem;
          z-index: 2;
      }
        img{background-size: cover; transform: scale(.6);}
      }
    }
  }
`


export default Home