import styled from "styled-components"

function Queue({navSize}: {navSize: number}) {
  

  return (
    <Wrapper property={`${navSize}`}>
      <div className="TopNav_Queue_column">
        <h1>Filters</h1>
        <p>Food</p>
        <p>Entertainment</p>
        <p>Outlet Stores</p>
      </div>
      <div className="TopNav_Queue_column">
        <h1>Filters</h1>
        <p>Queue 1</p>
        <p>Queue 2</p>
        <p>Queue 3</p>
      </div>
      <div className="TopNav_Queue_column">
        <h1>Filters</h1>
        <p>Queue 1</p>
        <p>Queue 2</p>
        <p>Queue 3</p>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div.attrs({id: 'TopNav_Queue'})`
  display: flex;
  margin: 0 auto;
  width: ${props => props.property}px;
  .TopNav_Queue_column{
    margin: 0 1rem;
    overflow: hidden;
    h1{
      font-size: .5rem;
      font-weight: normal;
      color: #555;
    }
    p{
      font-size: .8rem;
      font-weight: 600;
      cursor: pointer;
    }
    &:first-child{
      margin: 0 1.5rem;
      h1{
        font-size: .9rem;
      }
      p{
        font-size: 1.2rem;
      }
    }
  }
`

export default Queue