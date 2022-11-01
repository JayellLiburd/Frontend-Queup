import React from 'react'
import styled from 'styled-components'
import Carousell3 from '../Components/Home/carousell3'

function Test() {

  
  const Test = [{Header: 'Trending', results: [{name: "Mc Donald's", Image: "Images/mcd.png", date: 'Oct 18'}, {name: "Starbucks", Image: "Images/star.png", date: 'Dec 5'}, {name: "Nike", Image: "Images/nike.png", date: 'Dec 2'}, {name: "MD Herrmon", Image: "Images/mem.png", date: 'Oct 18'}, {name: "Post Houston", Image: "Images/hou.jpg", date: 'Oct 23'}, {name: 'Apple', Image: "Images/apple.png", date: 'Nov 6'}, {name: 'Sky Zone', Image: "Images/sky.png", date: 'Oct 19'}, {name: 'CheeseCake Factory', Image: "Images/cheese.png", date: 'Oct 18'}, {name: 'Trusted Kicks', Image: "Images/trusted.png", date: 'Nov 17'}, {name: 'Turkey Leg Hut', Image: "Images/turkey.png", date: 'Oct 30'}, {name: 'MicroCenter', Image: "Images/msc.png", date: 'Dec 10'}]}]
  return (
    <Wrapper>
      <Carousell3 array={Test}/>
    </Wrapper>
  )
}

const Wrapper = styled.div`

`

export default Test