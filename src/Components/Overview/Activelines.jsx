import React from 'react'
import styled from 'styled-components'
import {NavLink} from 'react-router-dom';
import Edit from './Edit';
import { useEffect, useState } from 'react';
import { MyRoster } from '../../Helpers/Context';

function Activelines() {

  const Staff = [{
    admin: [ {employee: {name: 'Jayell Liburd', employeeID: 111147}} ],
    manager: [ {employee: {name: 'Glen', employeeID: 123456}}, {employee: {name: 'Madonnad', employeeID: 123456}}, {employee: {name: 'Randy', employeeID: 123456}} ],
    staff: [ {employee: {name:'Pauli', employeeID: 123456}}, {employee:  {name:'Nora', employeeID: 123456}}, {employee: {name:'Morgan', employeeID: 123456}}, {employee: {name: 'Brenda', employeeID: 123456}}, {employee: {name: 'Nola', employeeID: 123456}} ]
  }]
  const [staff, setStaff] = useState(Staff)
  useEffect(()=> {}, [staff])


  return (
    <MyRoster.Provider value={{staff, setStaff, Staff}}>
    <Wrapper>
      <Edit />
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
        {staff.map(roster => {
                return (
                    <div className='employees'>
                        <h4>Admin's</h4>
                        <div className='name'>
                            {roster.admin.map(people => {
                                return (
                                  <div>
                                    <p>{people.employee.name}</p>
                                    <p>{"EmployeeID: " + people.employee.employeeID}</p>
                                  </div>
                                )
                            })}
                        </div>
                        <h4>Manager's</h4>
                        <div className='name'>
                            {roster.manager.map(people => {
                                return (
                                  <div>
                                    <p>{people.employee.name}</p>
                                    <p>{"EmployeeID: " + people.employee.employeeID}</p>
                                  </div>
                                )
                            })}
                        </div>
                        <h4>Staff</h4>
                        <div className='name'>
                            {roster.staff.map(people => {
                                return (
                                  <div>
                                    <p>{people.employee.name}</p>
                                    <p>{"EmployeeID: " + people.employee.employeeID}</p>
                                  </div>
                                )
                            })}
                        </div>
                    </div>
                )
            })}
        </div>
      </div>
  </Wrapper>
  </MyRoster.Provider>
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
    position: relative;
    left: -3rem;
    justify-content: space-evenly;
    width: 55%;
    min-height: 40rem;
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
      width: 22rem;
      height: 22rem;
      background-color: grey;
    }
  }
  .management{
    position: absolute;
    top: 0rem;
    left: 0rem;
    width: 20%;
    overflow: hidden;
    overflow-x: auto;
    .name{
      p{
        width: max-content;
        &:nth-child(1) {margin: 1rem 0; margin-right: 1rem; min-width: 5rem;}
      }
      div{display: flex; width: max-content;}
    }
  }

  @media (max-width: 1400px) {
    .preview{
      left: unset;
      height: 40rem;
      width: 80%; 
      flex-direction: column;
      border: unset;
      #partion{
        width: 100%;
      }
      .map{
        aspect-ratio: 1/1;
        width: 50%;
        margin: 1rem auto;
        margin-bottom: 2rem;
      }
    }
    .management{
      position: unset;
      top: unset;
      left: unset;
      width: 80%;
      h2{margin-top: 2rem; font-size: 1.2rem;}
      li{font-size: 1rem; font-weight: bold; font-size: 1.1rem;}
      p{font-size: .9rem; text-indent: 1.5rem;}
      .name{
        overflow: hidden;
        overflow-x: auto;
        p{
          min-width: max-content;
          &:nth-child(2) {margin: 1rem;}
        }
        div{display: flex;}
      }
    }
  }
  @media (max-width: 712px) {
    .preview{.map{width: 100%;}}
  }
`

export default Activelines