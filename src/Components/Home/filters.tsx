import React from 'react'
import styled from 'styled-components'

import { IoTicketOutline, IoFastFoodOutline } from 'react-icons/io5'
import { MdFavoriteBorder } from 'react-icons/md'

function Displaycase() {

  const filters = 
  { cases:  [
    {  'id': 1, 'label': 'Food', 'image': IoFastFoodOutline},
    {  'id': 2, 'label': 'Raffles', 'image': IoTicketOutline},
    {  'id': 3, 'label': 'Favorites', 'image': MdFavoriteBorder}
  ]}

  return (
    <Wrapper>
        {filters.cases.map ((item) => {
          return(
            <div key={item.id}>
              <item.image size={20}/>
              <p>{item.label}</p>
            </div>
          )
        })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: right;
  position: relative;
  left: 1rem;
  margin-top: .9rem;
  width: max-content;
  height: 3rem;
  ::-webkit-scrollbar{
    display: none;
  }
  div{
    display: flex;
    align-items: center;
    position: relative;
    margin: 0 1rem;
    width: 7rem;
    height: 2rem;
    font-size: 1.5rem;
    font-family: 'Cinzel', serif;
    color: black;
    background-color: #ffffffc9;
    border-radius: 5px;
    z-index: 2;
    cursor: pointer;
    &:hover{border: 1px 0 solid silver; font-weight: bold;}
    p{font-size: .8rem; text-indent: 1rem;}
  }

  @media screen and (max-width: 1200px){
    .Case{    
      width: 4.5rem;
      height: 5rem; 
    }
  }
`


export default Displaycase