import React from 'react'
import styled from 'styled-components'
import PlacesAutoComplete, { geocodeByAddress } from 'react-places-autocomplete'

import { AiOutlineSearch } from 'react-icons/ai'

function LocationPicker() {

  const [address, setAddress] = React.useState('')
  const handleSelect = async (value: any) => {
    let location = []
    let results = await geocodeByAddress(value.address)
    for (const result of results[0].address_components) {
      if (result.types.includes('locality')) {
        location.push({ [result.types[0]]: result.long_name })
      }
      if (result.types.includes('postal_code')) {
        location.push({ [result.types[0]]: result.long_name })
      }
    }

    const LocationInput = document.getElementById('locationInput')
    if (!LocationInput) return
    if (location.length < 1) {
      LocationInput.style.color = '#cf0000'
      setAddress('Location Not Found try to be more specific')
      setTimeout(() => {
        LocationInput.style.color = ''
        setAddress('')
      }, 2500);
    } else {
      location = Object.assign({}, ...location)
      let newLocation = JSON.stringify(location)
      localStorage.setItem('loc', newLocation)
      setAddress(value)
      window.location.assign(window.location.pathname)
    }
  }

  return (
    <Wrapper>
      <PlacesAutoComplete value={address} onChange={setAddress} onSelect={handleSelect} debounce={500}>
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <>
            <div className='searchLoc'>
              <div style={{ margin: '1rem', marginBottom: 0, }}><AiOutlineSearch size={35} /></div>
              <input
                {...getInputProps({
                  type: "text",
                  id: 'locationInput',
                  placeholder: "Search Location by Address or ZIP",
                })}
              />
            </div>
            <div className='location'>
              {loading ? <div>...loading</div> : null}
              {suggestions.map(suggestion => {
                const style = {
                  backgroundColor: suggestion.active ? "#cecece" : ""
                }
                return (
                  <div {...getSuggestionItemProps(suggestion, {onmouseenter})}>
                    <p style={style}>{suggestion.description}</p>
                  </div>
                )
              })}
            </div>
          </>
        )}
      </PlacesAutoComplete>
    </Wrapper>
  )
}

const Wrapper = styled.div.attrs({ id: 'locationPicker' })`
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: fixed;
    top: 30vh;
    width: 50vw;
    min-height: 4rem;
    background-color: #454545a8;
    backdrop-filter: blur(15px);
    border: 1px solid #a8a8a8;
    border-radius: 1rem;
    box-shadow: 0 0 10px 0 rgba(0,0,0,0.5);
    .searchLoc{
        display: flex;
        width: 100%;
    }
    input{
        all: unset;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        width: 100%;
        height: 4rem;
        font-size: 2rem;
        font-weight: 600;
        color: #000000c4;
        &::placeholder{
            color: #1e1e1eeb;
        }
    }
    .location{
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        div{
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 0;
            width: 100%;
            background-color: transparent;
            border-top: 1px solid grey;
        }
        p{
            display: flex;
            align-items: center;
            margin: .2rem auto;
            padding: 0 .5rem;
            width: 95%;
            height: 3rem;
            border-radius: .5rem;
        }
    }
`

export default LocationPicker