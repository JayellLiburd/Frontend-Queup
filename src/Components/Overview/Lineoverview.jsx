import React, { useEffect, useState, useContext } from 'react'
import styled from 'styled-components'
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { Links } from '../../Helpers/Context';
import { usersContext } from '../../Connections/user';


function Lineoverview() {

  const favorites = []

  const {user, setUser, setAuth} =  useContext(usersContext)
  const {buttonactive, setLink} = useContext(Links)
  
  const [lines, setLines] = useState(false)
  const [fav, setFav] = useState(false)
  const [isloading, setIsloading] = useState(false)
  const [showFav, setshowFav] = useState(false)

  useEffect(() => {
    setIsloading(true)
    axios.get(process.env.REACT_APP_Server + '/MyQueues', {withCredentials: true}).then(response => {
      if ( response.data[0] ) { setLines(response.data) }
      let listofIDs = []
      const favarray = jwt_decode(user.busfav)
      for (let linedata of response.data) {listofIDs.push(linedata.line_id)}
      for (let data of favarray.favorites) {if (data.line_id) { favorites.push(data)} else {favorites.push({address_1: 'Click to add a Favorite'}) }}
      setFav(favorites)
      setIsloading(false)
      setLink(response.data[0].line_id)
    })
  },[setLink, user])
  
  const SwitchTabs = (id) => { setLink(id); buttonactive(); }
  
  var i = 0
  const selctitem = (item) => {
    axios.post(process.env.REACT_APP_Server + '/MyQueues/favorite', {[showFav]: item}, {withCredentials: true}).then(response => {
      axios.get(process.env.REACT_APP_Server + '/verify',{withCredentials:true}).then((response) => {
        if (response.data[0]) {setAuth(true); setUser(response.data[0])}
        else {setAuth(false)}
      })
      setshowFav(false)
    })
  }

  const removeFav = (index) => {
    axios.post(process.env.REACT_APP_Server + '/MyQueues/favorite', showFav, {withCredentials: true}).then(response => {
      // axios.get(process.env.REACT_APP_Server + '/verify',{withCredentials:true}).then((response) => {
      //   if (response.data[0]) {setAuth(true); setUser(response.data[0])}
      //   else {setAuth(false)}
      // })
    })
  }

  return (
    <Wrapper>
      <div id='main'>
      {!isloading && lines ? <>
        <div className="linesheader">
        <img src="https://storage.googleapis.com/queup-images/e74cfc7e06b00ef4e1c232df3e50a5cb.jpg" alt="" />
        <div className="favorites">
          <section>
            <input type="text" placeholder='Search for specific line...' />
            <div className="favitems" id='favitems'>
              {fav.map(item => {
                  item['index'] = i++
                  return(
                    <div className="favbox" key={item} onClick={e => {if (!item.bus_name) {setshowFav(item.index)} else {SwitchTabs(item.line_id)} }}>
                      {item.bus_name ? <span className="remove" onClick={() => removeFav(item.index)}>x</span> : ''}
                      <h4>{item.bus_name}</h4>
                      <p>{item.address_1}</p>
                    </div>
                  )
                })
              }
            </div>
          </section>
        </div>
        </div>
        <h2>Your Lines</h2>
        {lines.map((item) => {
          return(
          <div className='businesses' key={item.line_id}>
            <h3 onClick={e => SwitchTabs(item.line_id)}>{item.bus_name}:</h3>
            <p id='description' style={{fontWeight: '600'}}>{item.address_1}</p>
            {/* <p>Currently in line: {item.currentline}</p> */}
            <p>Rate Served per hour: {item.rate}</p>
            {/* <p>Max: {item.max}</p> */}
            <p>Running Promo's: {item.promo}</p>
            <p>Current Manager: {item.host}</p>
          </div>
        )})}
        {showFav === false ? <></> : <>
          <div className="background" onClick={() => setshowFav(false)} />
          <div className="favselector">
            <h2>Select a Line to add</h2>
            <input type="text" placeholder='Search for specific line...' />
            {lines.map((item) => {
              return(
                <div className='businesses' key={item.line_id} onClick={e => {selctitem(item)}}>
                  <h3>{item.bus_name}:</h3>
                  <p id='description' style={{fontWeight: '600'}}>{item.address_1}</p>
                </div>
            )})}
          </div>
        </>}
      </>: <></>}
      </div>
    </Wrapper>
  )
}



const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  margin-bottom: 10rem;

  width: 50vw;

  #main{margin-top: 2rem;}
  .background{position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background-color: #3b3b3bb2; z-index: 9;}
  img{
    width: 250px;
    height: 250px;
  }
  input{ 
    all: unset; 
    height: 1.8rem;
    padding-left: 1rem;
    margin: 0 1.8rem;
    width: 92%;
    border: 2px solid #2e2e2e75; 
    border-radius: .5rem;
    font-family: sans-serif;
    color: grey;
    &:hover { border: 2px solid #00000050; transition: all 0.2s ease-in-out; }
    &:focus { border: 2px solid #181818a6; color: black; &::placeholder{color: #646464;}};
  }
  .linesheader{
    display: flex;
  }
  .favorites{
    display: flex;
    section{
      width: 100%;
      margin: 0 5rem;
      .favitems{
        display: grid;
        margin: .5rem 2rem;
        grid-template-columns: auto auto auto;
        column-gap: 15px;
        row-gap: 15px;
        .favbox{
          display: flex;
          position: relative;
          flex-direction: column;
          justify-content: center;
          padding: .2rem .3rem;
          width: 15rem;
          height: 4rem;
          border: 2px solid #AD8C5A;
          border-radius: .5rem;
          overflow: clip;
          cursor: pointer;
          span{all: unset; position: absolute; right: 10px; top: 5px; cursor: pointer; font-weight: 600; transition: all .5s ease; &:hover{color: red;}}
          h4{ margin: 0; transition: all .2s ease; &:hover{color: #62b7c2;}}
          p{ margin: 0; font-size: .7rem;}
        }
      }
    }
  }
  .businesses{
    display: flex; 
    align-items: baseline;
    margin: .5rem 0;
    padding-top: .5rem;
    width: 90%;
    overflow: hidden;
    overflow-x: auto;
    border-top: 1px dashed;
    h3{margin: unset; font-size: 1.3rem; min-width: 12rem; text-decoration: underline; cursor: pointer;}
    p{ margin: unset; padding: .5rem; width: max-content;}}
  .favselector{
    position: fixed;
    width: 40rem;
    height: 25rem;
    top: 0;
    translate: 40% 80%; 
    border: 3px solid grey;
    border-radius: .5rem;
    padding: 1rem;
    background-color: white;
    z-index: 10;
    overflow: auto;
    h2{ margin: 0;}
    .businesses{
      align-items: center;
    }
    input{
      margin: .5rem 0rem;
      width: 85%;
    }
  }


  //showing on small screen//
  @media (max-width: 1800px) {
    margin-top: 0;
    align-items: center;
    width: unset;
    #main{display: flex; flex-direction: column; align-items: center;}
    img{
      width: 150px;
      height: 150px;
    }
    .linesheader{ flex-direction: column; align-items: center; }
    .favorites{ 
      display: flex;
      flex-direction: column-reverse;
      align-items: center;
      section{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: unset;
        .favitems{
          column-gap: 5px;
          row-gap: 0;
          width: 90%;
          height: 12rem;
          margin: unset;
          .favbox{ width: 90%; margin: 0;}
        }
      } 
      input{width: 90vw; margin: 1rem;}
    }
    h2{margin: 1rem auto; width: 90%;}
    .businesses{
      margin: 0 auto;
      flex-direction: column; 
      border-top: 1px dashed; 
      h3{margin-top: 1rem;}
    }
    .favselector{
      position: absolute;
      top: 0;
      padding: 0;
      width: 90vw;
      height: 100vh;
      translate: unset;
      z-index: 10;
      h2{ margin: 1rem auto;}
      input{ margin: .5rem 1.2rem; }
      .businesses{
        margin: 0 auto;
        flex-direction: row; 
        border-top: 1px dashed;
        h3{margin-top: 1rem;}
      }
    }
  }
`


export default Lineoverview


