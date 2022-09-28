import React from 'react'
import styled from 'styled-components'
import {NavLink} from 'react-router-dom';

function Activelines() {

  return (
    <Wrapper>
      <div className='preview'>
        <div className="map"><img src="" alt="" /></div>
        <div id='partion'>
          <div id='name'>
            <h3>CheeseCake Factory</h3>
            <NavLink to='/Currline' id='view'><button>edit</button></NavLink>
          </div>
          <section>
              <p>Addrress: 5015 Westheimer Rd, Houston, TX 77056</p>
              <p>People currently in line: 13</p>
              <p>Max people: false</p>
              <p>Movement: 22 Every 30min</p>
              <p>Total people in Queue Today: 68</p>
              <p>Views: 2.3k</p>
              <section className='checkboxes'>
                <div className="configs">
                  <input type="checkbox" name="promo" disabled='disabled' checked={true}/>
                  <label htmlFor="promo">Promo</label>
                </div>
                <div className="configs">
                  <input type="checkbox" name="Nearby" disabled='disabled' checked={false}/>
                  <label htmlFor="Nearby">Nearby</label>
                </div>
                <div className="configs">
                  <input type="checkbox" name="onlyverified" disabled='disabled' checked={false}/>
                  <label htmlFor="onlyverified">Only Verified</label>
                </div>
              </section>
          </section>
      </div>
    </div>
    <div className="management">
        <h2>Employee Roster</h2>
        <div className="employee">
          <h3>Manager role</h3>
          <p>Genny</p>
          <p>Katy</p>
          <h3>Staff role</h3>
          <p>Celie</p>
          <p>Indira</p>
          <p>Arlene</p>
          <p>Sheri</p>
          <p>Wally</p>
        </div>
      </div>
  </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex; 
  position: relative;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 4rem;
  width: 80vw;
  .preview{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80%;
    #partion{
      display: flex;
      flex-direction: column; 
      align-items: center;
      width: max-content;
      #view{display: flex; margin: 0 1rem; button{ padding: 0.3rem 1rem; border-radius: 1rem; background-color: #ececec; border: unset; cursor: pointer;}}
      #name{
        display: flex;
        align-items: center;
        width: 100%;
      }
      .checkboxes{
        display: flex;
        .configs{
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 6rem;
          &:first-child{width: min-content}
        }
      }
    }
    .map{
      margin: 1rem 5rem;
      margin-left: -5rem;
      aspect-ratio: 1/1;
      width: 20rem;
      background-color: grey;
    }
  }
  .management{
    position: absolute;
    top: 1rem;
    left: 0rem;
    width: 20%;
  }

  @media (max-width: 1400px) {
    .preview{
      width: 80%; 
      flex-direction: column;
      #partion{
        width: 100%;
      }
      .map{
        width: 50%;
        margin: unset;
        margin-bottom: 2rem;
      }
    }
    .management{
      position: unset;
      top: unset;
      left: unset;
      width: 80%;
      h2{margin-top: 4rem; font-size: 1.2rem;}
      h3{font-size: 1rem;}
      p{font-size: .9rem;}
    }
  }
  @media (max-width: 712px) {
    .preview{.map{width: 100%;}}
  }
`

export default Activelines