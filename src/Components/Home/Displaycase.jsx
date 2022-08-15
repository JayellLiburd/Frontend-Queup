import React, { useContext } from 'react'
import styled from 'styled-components'
import { usersContext } from '../../Connections/user';


function Displaycase(props) {

  const Cases =  [
    { 'id': 1, 'image': 'Images/idea1.webp', 'label': 'Previews' },
    { 'id': 2, 'image': 'Images/idea2.jpg', 'label': 'Previews' },
    { 'id': 3, 'image': 'Images/idea3.jpg', 'label': 'Previews' },
    { 'id': 4, 'image': 'Images/idea3.jpg', 'label': 'Previews' },
    { 'id': 5, 'image': 'Images/idea3.jpg', 'label': 'Previews' },
    { 'id': 6, 'image': 'Images/idea3.jpg', 'label': 'Previews' },
  ]

  const {ui} =  useContext(usersContext)



  return (

    <Wrapper>
      <div id='catagory'>
        <h2>{props.name}</h2>
        <h2 id='view'>Veiw More</h2>
      </div>
      <div id={ui.dark === 'true' ? 'dkContainer' : 'Container'}>
        {Cases.map((item) => {
          return(
            <div id='Case' key={item.id}>
              <h3>{item.label}</h3>
              <img src={item.image} alt="" />
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
align-items: left;

margin: 3rem 0rem;

overflow-x: hidden;

h2{
  margin: unset;
  padding: .5rem 0rem;

  color: #818181;
  font-size: 1.2rem;
  font-family: 'Cinzel', serif;
  text-indent: 1rem;}
  
h3{
  display: flex;
  justify-content: center; 
  align-items: center;
  position: absolute;
  margin-top: 13rem;
  top: -3rem;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 50%;
  height: 2rem;
  color: #d6d6d6;
  font-size: 1.5rem;

  background-color: #000000c8;
  backdrop-filter: blur(1.5px);
  border: 3px #83634e6a solid;
  border-radius: 5px;
  z-index: 1;}

#Container{
  display: flex;
  position: relative;
  overflow-x: scroll;
  ::-webkit-scrollbar{ width: 15px; height: 10px;}
  ::-webkit-scrollbar-track{background-color: rgba(0, 0, 0, 0);}

  ::-webkit-scrollbar-thumb{ 
    background-color: #5858589d;  
    border-radius: 12px;
  &:hover{background-color: #ccccccad;}
  } }

#Case{
  position: relative;
  margin: 1rem 2rem;

  min-width: 22rem;
  height: 12rem;

  border-radius: 10px;
  border: 1px solid grey;

  img{ width: 100%; height: 100%; object-fit: cover; border-radius: 12px; }
} #Case:first-child{ margin-left: 0rem;}
  

#catagory {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;}

#view{
    padding: .4rem;

    color: #865c3ace;
    font-size: .7rem;
    text-indent: 0;

    background-color: silver;
    border-radius: 12px;}


@media (max-width: 800px) { 
  h3{width: 50%; height: 2.5rem; top: -3.5rem; font-size: 1rem;};
  #Case{min-width: 8.5rem; max-width: 20rem; height: 12rem; margin: 1rem 1vw;};
  #Container{margin-left: .5rem;};
  }

  //dark classes
  #dkContainer{
    display: flex;
    position: relative;
    overflow-x: scroll;
    ::-webkit-scrollbar{ width: 15px; height: 10px;}
    ::-webkit-scrollbar-track{background-color: rgba(0, 0, 0, 0);}

    ::-webkit-scrollbar-thumb{ 
      background-color: #6e6e6e;  
      border-radius: 12px;
    &:hover{background-color: #ccccccad;};};}

`
export default Displaycase