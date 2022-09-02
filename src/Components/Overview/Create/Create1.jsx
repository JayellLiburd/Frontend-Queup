import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import countryList from "../../../Helpers/Countries";
import { abbrState, State, States } from "../../../Helpers/States";
import { validSchema } from "../../../Helpers/Validation";
import Temp from "./temp.png";
import axios from 'axios'

import { createbusContext } from "./Create";

function Create() {
  const {
    setAdd,
    setAdd2,
    setCity,
    setCountry,
    setName,
    setZip,
    setStates,
    setNext,
    setSmall,
    setRate,
    setCategory,
    setRaffles,
    setPromos,
    setHost,
    preview,
    setPreview,
    preview2,
    setPreview2,
  } = useContext(createbusContext);
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [c, setC] = useState(0);
  const [d, setD] = useState(0);
  const [e, setE] = useState(0);
  const [f, setF] = useState(0);
  const [g, setG] = useState(0);

  let List = [];

  function handelSubmit(e) {
    e.preventDefault();
    var i, s;
    const len = e.target;
    for (i = 0; i < 7; ++i) {
      s = { data: { len: len[i].value.length, val: len[i].value } };
      List.push(s);
    }
    setA(List[0].data.len);
    setB(List[1].data.len);
    setC(List[2].data.len);
    setD(List[3].data.len);
    setE(List[4].data.len);
    setF(List[5].data.len);
    setG(List[6].data.len);
  }

  const submit = (e) => {
    List = [];
    handelSubmit(e);
    console.log(List);
  };
  const submitbutton = () => {
    axios.get('http://localhost:4000/create', {withCredentials: true})
  };

  return (
    <Wrapper>
      <form onSubmit={submitbutton}>
        <section id="previews">
          <div className="views">
            Small View
            <div id="mobile">
              <svg
                width="233"
                height="420"
                viewBox="0 0 233 420"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Group 1">
                  <rect
                    id="Rectangle 1"
                    x="5.5"
                    y="1.5"
                    width="223"
                    height="417"
                    rx="21.5"
                    fill="black"
                    fill-opacity="0.75"
                    stroke="black"
                    stroke-width="3"
                  />
                  <rect
                    id="Rectangle 7"
                    x="7"
                    y="51"
                    width="219"
                    height="336"
                    fill="#ECECEC"
                  />
                  <circle
                    id="Ellipse 1"
                    cx="157.5"
                    cy="37.5"
                    r="5.5"
                    fill="#D9D9D9"
                  />
                  <rect
                    id="Rectangle 3"
                    x="82"
                    y="32"
                    width="64"
                    height="11"
                    rx="5.5"
                    fill="#D9D9D9"
                  />
                  <rect
                    id="Rectangle 8"
                    x="68"
                    y="401"
                    width="95"
                    height="5"
                    rx="2.5"
                    fill="#EEEEEE"
                  />
                  <rect
                    id="Rectangle 4"
                    x="229"
                    y="71"
                    width="4"
                    height="26"
                    fill="black"
                  />
                  <rect
                    id="Rectangle 5"
                    y="71"
                    width="4"
                    height="26"
                    fill="black"
                  />
                  <rect
                    id="Rectangle 6"
                    y="100"
                    width="4"
                    height="26"
                    fill="black"
                  />
                </g>
              </svg>
              <div class="upload-btn-wrapper btn2">
                <button class="btn">
                  {preview2[1] === true ? "Upload" : "Change"}
                  <input
                    type="file"
                    name="myfile"
                    onChange={(e) =>
                      e.target.files[0]
                        ? setPreview2(URL.createObjectURL(e.target.files[0]))
                        : setPreview2(Temp)
                    }
                  />
                </button>
              </div>
              <div className="gradient" />
              <img src={preview2[1] ? preview2 : Temp} alt="" />
            </div>
          </div>
          <div className="views">
            Full View
            <img id="full-view" src="Images/queup-home.jpg" alt="" />
            <div id="website">
              <div class="upload-btn-wrapper">
                <button class="btn">
                  {preview[1] === true ? "Upload Cover" : "Change Cover"}
                </button>
                <input
                  type="file"
                  name="myfile"
                  onChange={(e) =>
                    e.target.files[0]
                      ? setPreview(URL.createObjectURL(e.target.files[0]))
                      : setPreview(Temp)
                  }
                />
              </div>
              <div id="gradient" />
              <img src={preview[1] ? preview : Temp} alt="" />
            </div>
          </div>
        </section>
        <section id="data-form">
          <h3>Create Business Queue</h3>
          <label>
            Business Name
            <input type="text" placeholder="ex: John's Cafe" />
            {a < 3 ? <p>Please input more than 3 Characters</p> : <></>}
          </label>
          <label>
            Address
            <input
              type="text"
              placeholder="ex: Lakewater Path Lane"
              onChange={(e) => setAdd(e.target.value)}
            />
            {a < 3 ? <p>Please enter a Valid Street Address</p> : <></>}
          </label>
          <label>
            Address 2
            <input
              type="text"
              placeholder="ex: #Unit, Postal Office, etc"
              onChange={(e) => setAdd2(e.target.value)}
            />
          </label>
          <label>
            City
            <input
              type="text"
              placeholder="ex: Dallas"
              onChange={(e) => setCity(e.target.value)}
            />
          </label>
          <div className="input2">
            <label>
              Zip Code
              <input
                type="text"
                placeholder="ex: 77056"
                onChange={(e) => setZip(e.target.value)}
              />
            </label>
            <label>
              State
              <select onClick={(e) => setStates(e.target.value)}>
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
            <select onClick={(e) => setCountry(e.target.value)}>
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
            <select onClick={(e) => setSmall(e.target.value)}>
              <option value="0">No</option>
              <option value="1">Yes</option>
            </select>
          </label>
          <label>
            Typical rate of people in a Day?
            <select onClick={(e) => setRate(e.target.value)}>
              <option value="0">Testing</option>
              <option value="10">{"<10/day"}</option>
              <option value="50">{"<50/day"}</option>
              <option value="100">{"<100/day"}</option>
              <option value="200">{"<200/day"}</option>
            </select>
          </label>
          <label>
            Category
            <select onClick={(e) => setCategory(e.target.value)}>
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
              <select onClick={(e) => setRaffles(e.target.value)}>
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </label>
            <label>
              Promos?
              <select data-selected onClick={(e) => setPromos(e.target.value)}>
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
              placeholder="ex: John Doe"
              onChange={(e) => setHost(e.target.value)}
            />
          </label>
          <button onClick={""}>Create Queue</button>
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
