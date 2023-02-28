import { usersContext } from 'Helpers/Context'
import { useContext } from 'react'
import styled from 'styled-components'

function Navigation({views, setState}: {views: {name: string, icon: any, jsx: JSX.Element, viewing: boolean}[], setState: React.Dispatch<React.SetStateAction<typeof views>>}) {
  const {user} = useContext(usersContext)

  return (
    <Wrapper>
      <img src="images/logo.png" alt="" />
      <h3>{user.first_name} {user.last_name}</h3>
      {views.map((view, index) => {
        return (
          <div 
            key={index} 
            className='Profile_Navigation_item' 
            style={{
              'marginTop': index===0 ? '2rem' : '',
              'backgroundColor': view.viewing ? '#ffffffa8' : '',
            }}
            onClick={() => changeView(index)}
          >
            {view.icon}
            <p>{view.name}</p>
          </div>
        )
      })}
    </Wrapper>
  )

  function changeView(index: number){
    setState(views.map((view, i) => {
      if (i === index) return {...view, viewing: true}
      return {...view, viewing: false}
    }))
  }

}

const Wrapper = styled.div.attrs({id: 'Profile_Navigation'})`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 20rem;
  background-color: #f5eedc79;
  img{
    width: 10rem;
    height: 10rem;
    object-fit: cover;
    pointer-events: none;
  }
  h3{
    margin: 0;
    margin-top: -3rem;
    color: #525252;
  }
  .Profile_Navigation_item{
    display: flex;
    align-items: center;
    margin: .5rem 1.5rem;
    margin-left: 3rem;
    width: 50%;
    padding: 1rem;
    cursor: pointer;
    transition: all .2s ease-in-out;
    &:hover{
      background-color: #f5eedc;
    }
    p{
      margin: 0 1rem;
      font-size: 1rem;
      color: #525252;
    }
  }
`



export default Navigation