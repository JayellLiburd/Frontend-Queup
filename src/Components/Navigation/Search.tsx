import { Testwords } from 'Helpers/words'
import { useEffect, useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import styled from 'styled-components'

function Search({navSize}: {navSize: number}) {

  const 
    [search, setSearch] = useState(''),
    [suggestions, setSuggestions] = useState<string[]>(Testwords)

  useEffect(() => {
    if (search.length === 0) {
      setSuggestions(['CheeseCake Factory', 'Trusted Kicks', 'Micro Center', 'Nike', 'Turkey Leg Hut'])
      return
    } else {
      setTimeout(() => {
        handleSearch(search)
      }, 500);
    }
  }, [search])



  return (
    <Wrapper property={`${navSize}`}>
      <div className="TopNav_SearchBox">
        <BsSearch size={20} color={'#454545'}/>
        <input 
          type="text" 
          placeholder='Search QueueUpNext.com'
          name='search'
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <div className="TopNav_Suggestions">
        <h3>Suggestions</h3>
        {suggestions.filter((word, i) => i < 5).map((word, i) => (
          <p key={i}>{word}</p>
        ))}
      </div>
    </Wrapper>
  )

  function handleSearch(value: string) {
    if(value.length > 0){
      const filtered = Testwords.filter(word => word.toLowerCase().includes(value.toLowerCase()))
      setSuggestions(filtered)
    }else{
      setSuggestions(Testwords)
    }
  }
}

const Wrapper = styled.div.attrs({id: 'TopNav_Search'})`
  margin: 0 auto;
  width: ${props => props.property}px;
  .TopNav_SearchBox{
    display: flex;
    align-items: center;
    margin: .5rem 1.5rem;
    input{
      margin: 0 1rem;
      width: 100%;
      height: 2rem;
      font-size: 1.5rem;
      border: none;
      &:focus{
        outline: none;
      }
    }
  }
  .TopNav_Suggestions{
    margin: 0 1.5rem;
    h3{
      font-size: 1rem;
      font-weight: normal;
      color: #555;
    }
    p{
      font-size: .8rem;
      font-weight: bold;
      cursor: pointer;
    }
  }
`

export default Search