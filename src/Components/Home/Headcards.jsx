import React from 'react'
import styled from 'styled-components'

import { IoTicketOutline, IoFastFoodOutline } from 'react-icons/io5'
import { GiJumpAcross } from 'react-icons/gi'

class Displaycase extends React.Component {

  constructor(props) {
    super(props);

    this.state = 
    { cases:  [
      {   'id': 1, 'image': 'Images/idea1.webp', 'label': 'Food', 'image': IoFastFoodOutline},
      {   'id': 2, 'image': 'Images/idea2.jpg', 'label': 'Raffles', 'image': IoTicketOutline},
      {   'id': 3, 'image': 'Images/idea3.jpg', 'label': 'Events', 'image': GiJumpAcross}
    ]}
  };

render() {


  return (
    <Wrapper>
      <div id='Container'>
        {this.state.cases.map ((item) => {
          return(
            <div id='Case' key={item.id}>
              <item.image/>
              <div>
              <span id='card'>{item.label}</span>
              </div>
            </div>
          )
        })}
        </div>
    </Wrapper>
  );
}
}

const Wrapper = styled.div`
  margin-top: 2rem;
  overflow-x: hidden;

  span{font-size: .7rem;}

 
  #Container{
    display: flex;
    position: relative;
  }

  #Case{
    display: flex;
    flex-direction: column; 
    justify-content: center; 
    align-items: center;
    position: relative;
    margin: 0rem 1.5rem;

    font-size: 1.5rem;
    font-family: 'Cinzel', serif;
    font-weight: bold;
    width: 4.5rem;;
    height: 5rem; 

    color: black;
    border-radius: 10px;
    border: 1px solid grey;

    background-color: #b19665bc;

  }


  `


export default Displaycase