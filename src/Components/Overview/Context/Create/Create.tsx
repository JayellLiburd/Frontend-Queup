import axios from 'axios'
import React, { useState } from 'react'
import styled from 'styled-components'
import GradientPicker from '../../Gradient'
import PlacesAutoComplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import ReactQuill from 'react-quill'
import { phoneFormat } from '../../../../Functions/InputFunctions'
import { Links } from '../../../../Helpers/Context'


type coordinates = {
  lat: number;
  lng: number;
}
function Create() {
 
  const preText = '<p>edit text here...</p><h2><strong>Rules</strong></h2><ul><li>When Called you have&nbsp;<strong><em><u>5</u></em><u>&nbsp;minutes</u></strong>&nbsp;to arrive at the listed location&nbsp;</li><li>If not accounted for before time runs out you will be skipped and after the first skip if still have not arrived then you will be kicked out of the line</li></ul>'

  const [address, setAddress] = useState('')
  const [parsedLocation, setParsedLocation] = useState([])
  const [coordinates, setCoordinates] = useState({} as coordinates)
  const [notes, setNotes] = useState(preText)
  const {color} = React.useContext(Links)
  
  const submitbutton = (e: React.FormEvent) =>{
    let form = []
    e.preventDefault()
    const getForm = document.getElementById('#createform') as HTMLFormElement
    const formData = new FormData(getForm)
    for (let data of formData.entries()) {
      form.push({[data[0]]: data[1]})
    }
    let stingedColor = JSON.stringify(color).replace(/"/g, "'")
    form.push({color: stingedColor})
    form.push({notes: notes})
    for (let item of parsedLocation) {
      form.push(item)
    }
    form.push({coordinates: coordinates.lat+','+coordinates.lng})
    form = Object.assign({}, ...form)
    if (form.address === '') {alert('Please enter a name'); return}
    else if (form.email === '') {alert('Please enter a valid email'); return}
    else if (form.url === '') {alert('Please enter a valid email'); return}
    else {
      axios.post(process.env.REACT_APP_Server + '/createque', form, 
      { withCredentials: true, headers: { "Content-Type": "multipart/form-data" } }).then(response => {
        if (response.data.messageSuccess) { window.location.reload()}
      })
    }
  }
    
  function Preview(e: any) {
    const preview = document.getElementById('previewimg') as HTMLImageElement
    const busname = document.getElementById('busname') as HTMLHeadingElement
    const inputbusname = document.getElementById('inputbusname') as HTMLInputElement
    if (e.target.files[0]) {
      preview.src=URL.createObjectURL(e.target.files[0])
      busname.innerHTML = inputbusname.value
    }
    else {preview.src = ''}
  }
    
  const handleSelect = async (value: string) => {
    const location = []
    const results = await geocodeByAddress(value)
    const latLng = await getLatLng(results[0])
    for (let result of results[0].address_components) {
      if (result.types[0] === 'country') {
        location.push({country: result.long_name})
      }
      if (result.types[0] === 'administrative_area_level_1') {
        location.push({area: result.long_name})
      }
      if (result.types[0] === 'locality') {
        location.push({city: result.long_name})
      }
      if (result.types[0] === 'postal_code') {
        location.push({zip: result.long_name})
      }
      if (result.types[0] === 'route') {
        location.push({street: result.long_name})
      }
      if (result.types[0] === 'street_number') {
        location.push({street_number: result.long_name})
      }
    }
    
    let checkLocation = Object.assign({}, ...location)
    if (!checkLocation.area || !checkLocation.street_number || !checkLocation.street || !checkLocation.zip || !checkLocation.city || !checkLocation.country ) {alert('Please enter a valid address'); setAddress(''); return}
    setParsedLocation(checkLocation)
    setAddress(value)
    setCoordinates(latLng)
  }

  const handleChange = (content: string) => {
    setNotes(content);
  };

  const toggleGradient = (e: any) => {
    e.preventDefault(); 
    const gradientPicker = document.querySelector('.gradientPicker')
    if (!gradientPicker) {return}
    else {
      if (!gradientPicker.classList.contains('open')) {
        gradientPicker.classList.add('open')
      } else {
        gradientPicker.classList.remove('open')
      }
    }
  }

  return (
    <Wrapper>
      <form id='createform' name='CreateQue' onSubmit={e => submitbutton(e)}>
        <section id="data-form">
          <h3>Create Queue</h3>
          <label>
            Operation Name*
            <input type="text" id='inputbusname' placeholder="ex: John's Cafe" name='name'/>
          </label>
          <label>
            Address*
            <PlacesAutoComplete value={address} onChange={setAddress} onSelect={handleSelect} debounce={500}>
              {({ getInputProps, suggestions, getSuggestionItemProps, loading}) => (
                <>
                  <input
                    {...getInputProps({
                      type:"text",
                      placeholder: "ex: Lakewater Path Lane",
                    })}
                  /> 
                  <div className='addResults'>
                    {loading ? <div>...loading</div> : null}
                    {suggestions.map(suggestion => {
                      const style = {
                        backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
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
          </label> 
          <div className="input2">
            <label>
              Email*
              <input type="email" name="email" required placeholder='ex: JohnDoe@host.com'/>
            </label>
            <label>
              Phone Number*
              <input type="tel" name='tele' onChange={e => phoneFormat(e.target)} min={0} minLength={10} maxLength={14} required placeholder='ex: 123-246-7890'/>
            </label>
          </div>
          <label id='info'>If Open 24Hours set a matching time perferably 12:00AM~12:00AM</label>
          <div className="input2">
            <label>
              Opening Time*
              <input type="time" name="open" min='00:00' max='23:59' required placeholder='00:00'/>
            </label>
            <label>
              Closing Time*
              <input type="time" name='close' min='00:00' max='23:59' required placeholder='ex: 09:00'/>
            </label>
          </div> 
          <label>
              Website
              <input type="url" name='website' maxLength={100} required placeholder='ex: https://google.com'/>
            </label> 
          <label>
            Name of Owner or Host
            <input
              type="text"
              name='host'
              placeholder="ex: John Doe"
              maxLength={100}
            />
          </label>
          <label>
            Small Business?
            <select name='small'>
              <option value="0">No</option>
              <option value="1">Yes</option>
            </select>
          </label>
          <label>
            Typical rate of people in a Day?
            <select name='rate'>
              <option value="0">Testing</option>
              <option value="10">{"<10/day"}</option>
              <option value="50">{"<50/day"}</option>
              <option value="100">{"<100/day"}</option>
              <option value="200">{"<200/day"}</option>
            </select>
          </label>
          <label>
            Category*
            <select name='category'>
              <option value="H">Hobby Hosting</option>
              <option value="Mgr">Major Event</option>
              <option value="FF">Fast Dinning</option>
              <option value="RR">Restaurant</option>
              <option value="MG">Merchant Goods</option>
              <option value="Min">Minor Event</option>
              <option value="DS">Dealership</option>
            </select>
          </label>
          <div className="input2">
            <label>
              Raffles?
              <select name='raffle'>
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </label>
            <label>
              Promos?
              <select data-selected name='promo'>
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </label>
          </div>
          <div className='imgholder'>
            <img id="previewimg" src='' alt='' />
            <p id='busname'/>
          </div>
          <input type="file" 
            accept="image/apng, image/avif, image/jpeg, image/png, image/webp"
            style={{marginTop: '1rem', paddingTop: '.5rem'}}
            onChange={e => Preview(e)}
            id='img'
            name='img'
          />
          <ReactQuill 
            theme="snow" 
            style={{width: '100%', height: '20rem', marginBottom: '4rem'}}
            value={notes} 
            onChange={e => handleChange(e)}
            tabIndex={1}
            placeholder={'Type Description Here...'}
            preserveWhitespace={true}
          />
          <button style={color} onClick={e => toggleGradient(e)}>Choose Theme</button>
          <button>Create Queue</button>
        </section>
      </form>
      <div className='gradientPicker'>
        <div className="unfocusgrad" onClick={e => toggleGradient(e)}/>
        <GradientPicker />
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  form {
    display: flex;
    flex-direction: row;

    #data-form {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 30vw;
    }
    .imgholder{
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-top: .5rem;
      align-items: center;
      width: 100%;
      height: max-content;
      img{
        max-width: 6rem;
        max-height: 9rem;
        border-radius: .5rem;
      }
    }
    input[type='file']{
      margin: 1rem 0;
    }
    input {
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 0.5rem;
      border: unset;
      height: 2rem;
      margin-top: 0.3rem;
      padding: 0 1rem;
      background-color: #eeeeee9b;
      cursor: text;
    }
    label {
      display: flex;
      position: relative;
      flex-direction: column;
      font-family: sans-serif;
      font-weight: bold;
      margin-top: 1rem;
      text-indent: 0.5rem;
      &:first-child {
        margin-top: 2rem;
      }
      &#info{
        all: unset;
        margin: 1.5rem 0;
        margin-bottom: -.5rem;
        font-size: .8rem;
        text-indent: 0.5rem;
        color: #758a8b;
      }
    }
    select {
      height: 2rem;
      border-radius: 0.5rem;
      margin-top: 0.2rem;
      padding: 0 1rem;
      font-weight: 600;
      border: unset;
      background-color: #eeeeee9b;
      -webkit-appearance: none;
      cursor: pointer;
    }
    .input2 {
      margin-top: -1rem;
      display: flex;
      flex-direction: row;
      align-items: baseline;
      label {
        width: 49%;
        &:first-child {
          margin-right: 2rem;
        }
      }
    }
    .addResults{
      position: absolute;
      top: 4rem;
      width: 100%;
      background-color: white;
      z-index: 3;
      p{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: 1.5rem;
      }
    }
  }
  p {
    color: #758a8b;
    font-size: 0.8rem;
  }
  .gradientPicker{
    position: fixed;
    top: 7rem;
    height: 0;
    overflow: hidden;
    z-index: 5;
    .unfocusgrad{
      position: fixed;
      top: 3rem;
      left: 0;
      height: 0vh;
      width: 100vw;
      background-color: #000000a6;
      backdrop-filter: blur(5px);
      overflow: hidden;
      z-index: -1;
    }
    &.open{
      height: max-content;
      .unfocusgrad{
        height: 100vh;
      }
    }
  }
  .ql-container.ql-snow{ border: 3px solid #fcead68c; border-radius: 0 0 .5rem .5rem;}
  .ql-toolbar.ql-snow{border: 3px solid #fcead68c !important; border-radius: .5rem .5rem 0 0;}

  @media screen and (max-width: 1400px) {
    form {
      width: 80vw;
    }
    .input2 {
      label {
        &:first-child {
          margin-right: 0.2rem !important;
        }
      }
    }
  }
  
  .upload-btn-wrapper input[type="file"] {
    font-size: 100px;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
  }
  
  button {
    margin-top: 1.5rem;
    padding: 1rem;
    font-weight: bold;
    color: black;
    border-radius: 1rem;
    border: none;
    background-color: #fcead6;
  }

  .ql-snow.ql-toolbar button, .ql-snow .ql-toolbar button{
    margin: 0;
  }

  @media (max-width: 550px) {
    section {
      display: flex;
      flex-direction: column;
      margin-right: unset;
    }
  }

  @media (max-width: 1400px) {
    flex-direction: column;
    justify-content: center;
    margin-top: 2rem;
    margin-left: 0rem;
    form{#data-form{width: 80vw;}}
  }
`

export default Create