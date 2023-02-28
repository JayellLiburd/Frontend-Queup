import { useEffect, useReducer, useState } from 'react'
import {BusinessTypes} from 'Connections/lib/@Types';
import PlacesAutoComplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import styled from 'styled-components'
// import { manage } from 'Connections';
import { TimeConversion } from 'Functions/InputFunctions';

function Boilerplate(props: BusinessTypes) {

  const [state, dispatch] = useReducer(updateBusiness, props)
  const [address, setAddress] = useState(state.address || '')


  useEffect(() => {
    //Todo: Get data from server
  }, [state])
  
  const handleSuggestions = async (value: string): Promise<void> => {
    setAddress(value)
    let location = {} as BusinessTypes
    await geocodeByAddress(value).then((results) => {
      getLatLng(results[0]).then((res) => {
        if (!res.lat || !res.lng) {
          setAddress(state.address || '')
          //TODO: Add invalid address error maybe displaying "invalid address" for 2 seconds then clearing the input
        }
        else {
          location.coordinates = `${res.lat+', '+res.lng}`
          if (location.coordinates) {
            for (let result of results[0].address_components) {
              switch (result.types[0]) {
                case 'country':
                  location.country = result.long_name
                  break
                case 'administrative_area_level_1':
                  location.area = result.long_name
                  break
                case 'locality':
                  location.city = result.long_name
                  break
                case 'postal_code':
                  location.zip = result.long_name
                  break
                case 'route':
                  location.street = result.long_name
                  break
                case 'street_number':
                  location.street_number = result.long_name
                  break
                default:
                  break
              }
            }
          } else location = {}
        }
      })
    })
    location = {...location, address: value}
    dispatch(location)
  }

  const color = state.color ? JSON.parse(state.color) : {backgroundColor: '#777777'}

  return (
    <Wrapper>
      <form id='Overview_Content_Form' onSubmit={e => e.preventDefault()}>
            <div>Address: 
                <PlacesAutoComplete value={address} onChange={setAddress} onSelect={handleSuggestions} debounce={500}>
                  {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <>
                      <input
                        {...getInputProps({
                          type:"text",
                          id: 'address',
                          placeholder: "ex: Lakewater Path Lane",
                          required: true,
                          readOnly: true,
                          name: 'address',
                        })}
                      /> 
                      <div className='addResults' style={suggestions.length > 0 ? {}: {border: 'unset'}}>
                        {loading ? <div>...loading</div> : null}
                        {suggestions.map(suggestion => {
                          const style = {
                            backgroundColor: suggestion.active ? "#fcead6" : "#fff"
                          }
                          return (
                            <div {...getSuggestionItemProps(suggestion, { style })}>
                              <p>{suggestion.description}</p>
                            </div>
                          )
                        })}
                      </div>
                    </>
                  )}
                </PlacesAutoComplete>
              </div>
              <div>Email: <input readOnly type="email" defaultValue={state.email} placeholder='JohnDoe@host.com' name='email' spellCheck required/></div>
              <div>Website: <input readOnly type="text" value={state.website ? state.website : 'https://'}  name='website' maxLength={200} spellCheck required/></div>
              <div>Phone: <input readOnly type="text" value={state.tele} min={0} minLength={10} maxLength={15} step={1} required placeholder='ex: 123-246-7890'/></div>
              <div>
                Open: 
                <input readOnly type="text" value={TimeConversion(state.open)} name="open" required placeholder='00:00am'/>
                Close: 
                <input readOnly type="text" value={TimeConversion(state.close)} name="close" required placeholder='00:00am'/>
              </div>
              <div>Gradient: <input readOnly type='text' name='color' className='gradient' value={color} onClick={e => e.currentTarget.readOnly ? {} : openGrad()} style={color}/></div>
              <div>People currently in line: 13</div>
              <div>Max people: false</div>
              <div>Movement: 22 Every 30min</div>
              <div>Total people in Queue Today: 68</div>
              <div>Views: 2.3k</div>
              <h4>Configs</h4>
            <button onClick={e => dispatch({})}/>
          </form>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  #Overview_Content_Form {
    div {
      display: flex;
      position: relative;
      align-items: flex-end;
      margin: 1rem 0;
      height: min-content;
      font-size: 0.8rem;
      border-bottom: 1px solid #0000001a;
      input {
        width: 100%;
        border: unset;
        margin-left: 1rem;
      }
      .addResults {
        all: unset;
        flex-direction: column;
        position: absolute;
        top: 1.25rem;
        width: 100%;
        border: 2px solid #fcead6;
        border-radius: 0 0 0.5rem 0.5rem;
        background-color: white;
        z-index: 3;
        p {
          all: unset;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          height: 1.5rem;
          text-indent: 1rem;
        }
      }
    }
    .gradient {
      margin: 0.1rem 0.5rem;
      width: 3rem;
      height: 1rem;
      color: transparent;
      border-radius: 0.2rem;
      -webkit-appearance: none;
      cursor: pointer;
    }
  }
`;
/**
 * Function to Collect all new updated data from the form
 * @description This function will compare the current state of the form to the state of the server sent form when the page was loaded
 * If the data is different it will be added to the NewForm array and sent to the server
 * @param state is the current state of the form
 */
function updateBusiness(state: BusinessTypes, location: BusinessTypes) {

  // NewForm is the new data that has been updated
  let NewForm: Array<BusinessTypes> | BusinessTypes = Array<Object>()
  
  // Check if the location object is empty to tell if lacation data has been updated
  if (Object.keys(location).length > 0) {
    // LocatArr is the current state of the location as an array of objects
    let LocatArr = Array<Object>()
    // Convert the form data to an array of objects
    for (let data of Object.entries(location)) {
      LocatArr.push({[data[0]]: data[1]})
    }
    // Compare the current state of the form to the state of the form when the page was loaded
    for (let i = 0; i < LocatArr.length; i++) {
      let FormValue = `${Object.entries(LocatArr[i])[0][1]}`
      let StateValue = `${Object.entries(state).filter((item) => item[0] === Object.entries(LocatArr[i])[0][0])[0][1]}`
      if (FormValue.trim() !== StateValue.trim()) {
        NewForm.push({[Object.entries(LocatArr[i])[0][0]]: Object.entries(LocatArr[i])[0][1]})
      }
    }
  }
  else {
    // FornDataSet is the current state of the form as an array of objects
    let FormDataSet = Array<Object>()
    const formList = new FormData(document.getElementById('Overview_Content_Form') as HTMLFormElement)

    // Convert the form data to an array of objects
    for (let data of formList.entries()) {
      FormDataSet.push({[data[0]]: data[1]})
    }
    // Compare the current state of the form to the state of the form when the page was loaded
    for (let i = 0; i < FormDataSet.length; i++) {
      let FormValue = `${Object.entries(FormDataSet[i])[0][1]}`
      let StateValue = `${Object.entries(state).filter((item) => item[0] === Object.entries(FormDataSet[i])[0][0])[0][1]}`
      if (FormValue.trim() !== StateValue.trim()) {
        NewForm.push({[Object.entries(FormDataSet[i])[0][0]]: Object.entries(FormDataSet[i])[0][1]})
      }
    }
  }
  // Convert the array of objects to a single object
  NewForm = Object.assign({}, ...NewForm)
  // If the NewForm object is not empty send it to the server to be updated
  if (typeof NewForm === 'object' && Object.keys(NewForm).length > 0) {
    // manage.patch(NewForm)
  }
  return {...state, ...NewForm}
}

function openGrad() {
  const colorPicker = document.querySelector('.gradientPicker') as HTMLElement
  colorPicker.classList.add('open')
}


export default Boilerplate