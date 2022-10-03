import axios from 'axios'
import React, {createContext } from 'react'
import styled from 'styled-components'
import countryList from '../../../Helpers/Countries'
import { States } from '../../../Helpers/States'
import { usePlacesWidget } from 'react-google-autocomplete'

export const createbusContext = createContext()

function Create() {

  let a

  const submitbutton = (e) =>{
    let form = []
    e.preventDefault()
    const formData = new FormData(document.querySelector('#createform'))
    for (var data of formData.entries()) {
      form.push({[data[0]]: data[1]})
    }
    form = Object.assign({}, ...form)
    let img = document.getElementById('img').files[0]
    console.log(form)
    axios.post(process.env.REACT_APP_Server + '/createque', form, 
      { withCredentials: true, headers: { "Content-Type": "multipart/form-data" } }).then(response => {
        if (response.data.messageSuccess) { window.location.reload()}
      })
  }

  const { ref } = usePlacesWidget({
    apiKey: 'AIzaSyCk0A43vnPFAWIeRWiIqTKIGgCPIhAnf_I',
    onPlaceSelected: (place) => {console.log(place)},
  })

  function Preview(e) {
    if (e.target.files[0]) {
      document.getElementById('previewimg').src=URL.createObjectURL(e.target.files[0])
      document.getElementById("busname").innerHTML = document.getElementById("inputbusname").value
    }
    else {document.getElementById('previewimg').src = ''}
  }


  return (
    <Wrapper>
      <form id='createform' name='CreateQue' onSubmit={e => submitbutton(e)}>
        <section id="data-form">
          <h3>Create Business Queue</h3>
          <label>
            Business Name
            <input type="text" id='inputbusname' placeholder="ex: John's Cafe" name='name'/>
          </label>
          <label>
            Address
            <input
              type="text"
              name='address'
              placeholder="ex: Lakewater Path Lane"
              // ref={ref}
            />
          </label>
          <label>
            Address 2
            <input
              type="text"
              name='address2'
              placeholder="ex: #Unit, Postal Office, etc"
            />
          </label>
          <label>
            City
            <input
              type="text"
              name='city'
              placeholder="ex: Dallas"
            />
          </label>
          <div className="input2">
            <label>
              Zip Code
              <input
                type="text"
                name='zipcode'
                placeholder="ex: 77056"
              />
            </label>
            <label>
              State
              <select name='state'>
                {States.map((item) => {
                  return (
                    <option key={item.abbreviation} value={item.abbreviation}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </label>
          </div>
          <label>
            Counrty
            <select name='country'>
              {countryList.map((item) => {
                return (
                  <option key={item} value={item}>
                    {item}
                  </option>
                );
              })}
            </select>
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
            Category
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
                <option value="0">Choose an Available Option</option>
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </label>
          </div>
          <label>
            Name of Host
            <input
              type="text"
              name='host'
              placeholder="ex: John Doe"
            />
          </label>
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
          <button>Create Queue</button>
        </section>
      </form>
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
      img{
        max-width: 6rem;
        max-height: 9rem;
        border-radius: .5rem;
      }
    }
    input {
      border-radius: 0.5rem;
      border: unset;
      height: 2rem;
      margin-top: 0.3rem;
      padding: 0 1rem;
      background-color: #eeeeee9b;
    }
    label {
      display: flex;
      flex-direction: column;
      font-family: sans-serif;
      font-weight: bold;
      margin-top: 1rem;

      text-indent: 0.5rem;
      &:first-child {
        margin-top: 2rem;
      }
    }
    select {
      height: 2rem;
      border-radius: 0.5rem;
      margin-top: 0.2rem;
      padding: 0 1rem;
      font-weight: 600;
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
  }
  p {
    color: #758a8b;
    font-size: 0.8rem;
  }

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

  @media (max-width: 550px) {
    section {
      display: flex;
      flex-direction: column;
      margin-right: unset;
    }
  }

  button {
    margin-top: 1.5rem;
    margin-bottom: 10rem;
    padding: 1rem;

    font-weight: bold;
    color: black;

    border-radius: 1rem;
    border: none;
    background-color: #865c3ace;
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