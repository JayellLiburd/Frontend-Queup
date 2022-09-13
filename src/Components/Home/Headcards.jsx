import React from 'react'
import styled from 'styled-components'

import { IoTicketOutline, IoFastFoodOutline } from 'react-icons/io5'
import { MdFavoriteBorder } from 'react-icons/md'

class Displaycase extends React.Component {

  constructor(props) {
    super(props);

    this.state = 
    { cases:  [
      {   'id': 1, 'image': 'Images/idea1.webp', 'label': 'Food', 'image': IoFastFoodOutline},
      {   'id': 2, 'image': 'Images/idea2.jpg', 'label': 'Raffles', 'image': IoTicketOutline},
      {   'id': 3, 'image': 'Images/idea3.jpg', 'label': 'Favorites', 'image': MdFavoriteBorder}
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
  span{font-size: .7rem;}
  #Container{
    display: flex;
    flex-direction: row;
    position: relative;
  }
  #Case{
    display: flex;
    flex-direction: column; 
    justify-content: center; 
    align-items: center;
    position: relative;
    &:nth-child(2) {margin: 0rem 3vw}

    font-size: 1.5rem;
    font-family: 'Cinzel', serif;
    font-weight: bold;
    width: 4vw;
    height: 5.5rem;

    color: black;
    border-radius: 5px;
    border: 1px solid grey;
    background-color: #b19665f2;
    z-index: 2;
    cursor: pointer;
    span{
      margin-top: 3rem;
    }
  }

  @media screen and (max-width: 1800px){
    #Case{    
      width: 4.5rem;
      height: 5rem; 
    }
  }
`


export default Displaycase