import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import styled from 'styled-components'

function Lineup() {
  
  let array = [{name: 'Jayell', timeJoined: '', otherData: '', user_id: ''}]
  const [spots, setSpots] = useState([array])
  const [isloading, setIsloading] = useState(true)

  useEffect(() => {
    
  })

  return (
    <Wrapper>
      <h1>Guests in Line</h1>
      <p>Current Line Count: 37 people</p>
      {spots.map(holder => {
        return (
          <div className="spot" key={holder.user_id}>
            <h2>{holder.name}</h2>
            <div className='buttons'>
              <button style={{"background-color": '#52e672a7'}}>Ready</button>
              <button style={{"background-color": '#e6d752c5'}}>Skip</button>
              <button style={{"background-color": '#ff0f0fa7'}}>Remove</button>
            </div>
            <p>{holder.otherData}</p>
          </div>
        )
      })}
        
    </Wrapper>
  )
}
const Wrapper = styled.div`
  h1{
    margin: 0;
    color: #DBBB90;
    font-family: 'Cinzel', serif;
  }
  .spot{
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    h2{ width: 40%; margin: 0; font-size: 1.2rem;}
    p{ width: 40%; margin: 0; font-size: .8rem;}
    .buttons{
      display: flex;
      align-items: center;
      margin: .5rem;
      button{
        margin: 0rem .5rem;
        padding: .5rem 1rem;
        color: #505050;
        font-weight: bold;
        border-radius: .5rem;
        border: unset;
      }
    }
  }

  @media (max-width: 1200px) {
    position: relative;
    width: 95vw;
    p{ margin:0; margin-bottom: 1rem;}
    .spot{
      h2{ width: 100%; font-size: 1.1rem; margin-top: 1rem; margin-left: 1rem;}
      p{ margin:0;}
      .buttons{
        width: 100%;
        button{
          width: 100%;
          padding: .8rem 1.5rem;
        }
      }
    }

  }
    
`
export default Lineup