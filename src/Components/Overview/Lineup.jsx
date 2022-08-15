import React from 'react'
import styled from 'styled-components'

function Lineup() {
  return (
    <Wrapper>
        <h1 style={{color: '#865c3ace'}}>Guest In Line</h1>
        <h4>Current Line Count: 37 people</h4>
        <div>
            <h2>Guest Name: Javier M.</h2>
            <h3>Party size: 2</h3>
            <div id='key'>
              <button style={{"background-color": '#52e672a7'}} >Arrived</button>
              <button style={{"background-color": '#e6d752c5'}}>Skip</button>
              <button style={{"background-color": '#ff0f0fa7'}}>Remove</button>
            </div>
        </div>
        <div>
            <h2>Guest Name: Ishmael L.</h2>
            <h3>Party size: 2</h3>
            <div id='key'>
              <button style={{"background-color": '#52e672a7'}} >Arrived</button>
              <button style={{"background-color": '#e6d752c5'}}>Skip</button>
              <button style={{"background-color": '#ff0f0fa7'}}>Remove</button>
            </div>
        </div>
        <div>
            <h2>Guest Name: Matthew G.</h2>
            <h3>Party size: 2</h3>
            <div id='key'>
              <button style={{"background-color": '#52e672a7'}} >Arrived</button>
              <button style={{"background-color": '#e6d752c5'}}>Skip</button>
              <button style={{"background-color": '#ff0f0fa7'}}>Remove</button>
            </div>
        </div>
        <div>
            <h2>Guest Name: Carissa M.</h2>
            <h3>Party size: 2</h3>
            <div id='key'>
              <button style={{"background-color": '#52e672a7'}} >Arrived</button>
              <button style={{"background-color": '#e6d752c5'}}>Skip</button>
              <button style={{"background-color": '#ff0f0fa7'}}>Remove</button>
            </div>
        </div>
        <div>
            <h2>Guest Name: Madison W.</h2>
            <h3>Party size: 2</h3>
            <div id='key'>
              <button style={{"background-color": '#52e672a7'}}>Arrived</button>
              <button style={{"background-color": '#e6d752c5'}}>Skip</button>
              <button style={{"background-color": '#ff0f0fa7'}}>Remove</button>
            </div>
        </div>
    </Wrapper>
  )
}
const Wrapper = styled.div`

    display: flex;
    flex-direction: column; 
    align-items: center;
    position: relative;

    min-height: 80vh;

    padding: 3rem 0;


    div{display: flex; align-items: center; justify-content: center; width: 60vw; height: 12rem; margin: 0 1rem;
      @media (max-width: 1400px) {flex-direction: column; margin: 4rem 0rem;}
    } 


    h1{font-family: 'Cinzel'; width: 50%; text-align: center; border-bottom: 2px solid #865c3ace;}
    h2{width: 30rem; text-align: center; margin-bottom: 1rem;}

    @media (min-width: 1400px) {h4{margin-bottom:2rem;}}
    
    h3{color: #777777;}

    #key{
      display: flex; 
      flex-direction: row;
      margin: 1rem 0;
    }

    button{
      @media (max-width: 1400px) {padding: 2rem; width: 5rem;}

        display: flex; 
        flex-direction: row;
        justify-content: center;
        align-items: center;
        

        width: 12rem; 
        height: 2rem;
        font-size: 1rem;
        color: #414141;
        font-weight: bold;

        border: #686868 solid;
        border-radius: 10px;

        &:hover{filter: hue-rotate(20deg); color: grey;}
        &:nth-child(2){margin: 0 1rem;}
    }
`
export default Lineup