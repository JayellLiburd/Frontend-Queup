import axios from 'axios'
import React, { useState, createContext, useEffect } from 'react'
import styled from 'styled-components'
import countryList from '../../../Helpers/Countries'
import { States } from '../../../Helpers/States'
import { usePlacesWidget } from 'react-google-autocomplete'

import Temp from './temp.png'

export const createbusContext = createContext()

function Create() {

  let a

  const [address, setAddress] = useState('')
  const [preview, setPreview] = useState([true])
  const [preview2, setPreview2] = useState([true])

  let form = []
  const submitbutton = (e) => { 
    form = []
    e.preventDefault()
    const formData = new FormData(document.querySelector('form'))
    for (var data of formData.entries()) {
      // console.log(data[1])
      form.push(data[1]);
    }
    console.log(form)
    axios.post('https://queueupnext.com/createque', {
      0: form[0],
      1: form[1],
      2: form[2],
      3: form[3],
      4: form[4],
      5: form[5],
      6: form[6],
      7: form[7],
      8: form[9],
      9: form[9],
      10: form[10],
      11: form[11],
      12: form[12],
    })
  }

  function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(
      () => {
        // Update debounced value after delay
        const handler = setTimeout(() => {
          setDebouncedValue(value)
        }, delay);
        return () => {
          clearTimeout(handler);
        };
      },
      [value, delay]
    );
    return debouncedValue;
  }

  const deBounce = useDebounce(address, 500)

  const { ref } = usePlacesWidget({
    apiKey: 'AIzaSyCk0A43vnPFAWIeRWiIqTKIGgCPIhAnf_I',
    onPlaceSelected: (place) => {console.log(place)},
  })



  return (
    <Wrapper>
      <form id='form' name='CreateQue' action='https://queueupnext.com/createque' method='post' onSubmit={submitbutton}>
        <section id="data-form">
          <h3>Create Business Queue</h3>
          <label>
            Business Name
            <input type="text" placeholder="ex: John's Cafe" name='name'/>
          </label>
          <label>
            Address
            <input
              type="text"
              name='address'
              defaultValue=''
              placeholder="ex: Lakewater Path Lane"
            />
            {a < 3 ? <p>Please enter a Valid Street Address</p> : <></>}
          </label>
          <label>
            Address 2
            <input
              type="text"
              name='address 2'
              defaultValue='0'
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
  margin-left: -10rem;

  form {
    display: flex;
    flex-direction: row;

    #data-form {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 30vw;
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

  #previews {
    display: flex;
    flex-direction: row;
    margin-right: 8rem;

    height: 20rem;

    input {
      width: 5rem;
    }
  }

  .views {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;

    font-weight: bold;
    font-family: serif;
    font-size: 1.2rem;

    min-width: 22rem;
    height: 20rem;

    #full-view {
      position: relative;
      top: 1.5rem;
      width: 36rem;
      height: 26rem;
      border: 3px solid;
      border-radius: 1rem;
      z-index: 2;
    }

    #mobile {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: -0.5rem;
      margin-bottom: 1rem;

      transform: scale(1);
      min-height: 30rem;
      text-decoration: none;

      overflow: hidden;
      z-index: 2;

      svg {
        z-index: 1;
      }
      .gradient {
        position: absolute;
        width: 6rem;
        height: 10rem;
        background: linear-gradient(
          180deg,
          rgba(255, 255, 255, 0) 50%,
          #242424ca 100%
        );
        z-index: 6;
        border-radius: 1rem;
      }
      img {
        position: absolute;
        width: 6rem;
        height: 10rem;
        z-index: 5;
        border-radius: 1rem;
      }
      .upload-btn-wrapper {
        top: 21rem;
        left: 3.6rem;
        height: 2rem;
        .btn {
          width: 7rem;
          height: 2rem;
          font-size: 0.8rem;
          margin-top: 0;
          padding: 0;
          border-radius: 2rem;
        }
        input {
          margin-top: 0rem;
          height: 2rem;
        }
      }
    }

    #website {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      top: -62%;
      left: -0.6rem;

      z-index: 5;

      #gradient {
        position: absolute;
        width: 12.5rem;
        height: 6.8rem;
        background: linear-gradient(
          180deg,
          rgba(255, 255, 255, 0) 50%,
          #242424ca 100%
        );
        z-index: 6;
        border-radius: 0.5rem;
      }
      img {
        width: 12.5rem;
        height: 6.8rem;
        border-radius: 0.5rem;
      }
      .upload-btn-wrapper {
        left: 1rem;
        bottom: -2.5rem;
        .btn {
          margin: 0;
          padding: 0;
        }
        input {
          margin-top: 0rem;
          width: 10rem;
          height: 1.5rem;
        }
      }
    }
  }

  .upload-btn-wrapper {
    position: absolute;
    /* overflow: hidden; */
    display: inline-block;
    z-index: 10;
    text-decoration: unset !important;
    &.btn2 {
      top: 0rem;
      left: unset;
    }
  }

  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid gray;
    color: #252525cf;
    background-color: #ffffffa4;
    width: 10rem;
    height: 1.3rem;
    padding: 8px 20px;
    border-radius: 2rem;
    font-size: 15px;
    font-weight: bold;
  }

  .upload-btn-wrapper input[type="file"] {
    font-size: 100px;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
  }

  @media (max-width: 550px) {
    height: 35rem;
    section {
      display: flex;
      flex-direction: column;
      margin-right: unset;
    }

    .views {
      min-width: 10rem;
      font-size: 1rem;
      margin-top: -5rem;
      margin-bottom: 3rem;
      h3 {
        top: 4.5rem;
        left: 33%;
      }
      #mobile {
        margin-top: -8rem;
        width: 6.5rem;
        height: 10rem;
        img {
          width: 3rem;
          height: 5rem;
          border-radius: 0.5rem;
        }
        .gradient {
          width: 3rem;
          height: 5rem;
          border-radius: 0.5rem;
        }
        .upload-btn-wrapper {
          left: -0.3rem;
          bottom: -2.5rem;
          .btn {
            position: relative;
            margin: 0.5rem 0;
            left: 0.3rem;
            width: 6.4rem;
          }
        }
      }
      #website {
        top: -38%;
        left: -0.3rem;
        width: 6.5rem;
        height: 10rem;
        margin-top: 1.5rem;
        img {
          position: relative;
          top: -0.6rem;
          width: 5.35rem;
          height: 2.5rem;
          border-radius: 0.3rem;
        }
        #gradient {
          top: 2.1rem;
          width: 5.4rem;
          height: 2rem;
        }
        .btn {
          position: relative;
          left: -2.5rem;
        }
      }
      #full-view {
        top: 1rem;
        width: 15rem;
        height: 10rem;
      }
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
  }
`;

export default Create;