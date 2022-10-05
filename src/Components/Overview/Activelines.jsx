import React from 'react'
import styled from 'styled-components'
import Edit from './Edit';
import { useEffect, useState } from 'react';
import { MyRoster } from '../../Helpers/Context';
import axios from 'axios';

function Activelines(props) {

  const [count, setCount] = useState(0)
  
  const [staff, setStaff] = useState([false])
  const [isloading, setIsloading] = useState(true)

  useEffect(()=> {
    let array = [{
      admin: [],
      manager: [],
      staff: [],
      line_info: [],
    }]
    setIsloading(true)

    // TODO: this url to server will be changed to have live data using web sockets so response.data.results will be changes soon
    axios.get(process.env.REACT_APP_Server + '/MyQueues/' + props.links + '/Queue', {withCredentials: true}).then(response => {
      for (let i = 0; i < response.data.results2.length; i++) {
        if ( response.data.results2[i].role === 'admin') { array[0].admin.push({employee: response.data.results2[i]}) }
        if ( response.data.results2[i].role === 'manager') { array[0].manager.push({employee: response.data.results2[i]}) }
        if ( response.data.results2[i].role === 'staff') { array[0].staff.push({employee: response.data.results2[i]}) }
      }
      array[0].line_info.push(response.data.results[0])
      setStaff(array)
      setIsloading(false)
    })
  }, [count, props.links])

  const openEdit = () => { 
    const editor = document.getElementById('editor')
    const close = document.getElementById('unfocusEditor')
    close.style.display = 'block' 
    editor.style.display = 'block'
  }
  const closEditor = () =>  {
    const editor = document.getElementById('editor')
    const close = document.getElementById('unfocusEditor')
    editor.style.display = 'none'
    close.style.display = 'none'
    setCount(0)
  }


  return (
    <MyRoster.Provider value={{setStaff, staff, isloading, count, setCount}}>
    <Wrapper>
    <button id='unfocusEditor' onClick={closEditor} style={{top: 0, width: '100vw', height: '100vh', background: 'transparent', position: 'fixed', display: 'none'}}/>
    {!isloading && staff ? <>
      <Edit line_id={props.links}/>
      <div className='preview'>
        <div className="map"><img src="" alt="" /></div>
        <div id='partion'>
          <div id='name'>
            <h3>{staff[0].line_info[0].bus_name}</h3>
            <button onClick={openEdit}>edit</button>
          </div>
          <section>
              <p>Addrress: {staff[0].line_info[0].address_1}</p>
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
                                    <p>{"EmployeeID: " + people.employee.idemployee}</p>
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
                                    <p>{"EmployeeID: " + people.employee.idemployee}</p>
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
                                    <p>{"EmployeeID: " + people.employee.idemployee}</p>
                                  </div>
                                )
                            })}
                        </div>
                    </div>
                )
            })}
        </div>
      </div> </> : <></> }
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
  margin-top: 2rem;
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
        button{ margin-left: 1rem; padding: .2rem 1rem; border-radius: 1rem; border: unset; &:hover{border: 1px solid}}
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
    left: -5rem;
    width: 25%;
    overflow: hidden;
    overflow-x: auto;

    h4{margin: 1rem 0; margin-bottom: .2rem;}
    .name{
      p{
        margin: .5rem 0;
        font-size: .9rem;
        width: max-content;
        &:nth-child(1) {margin-right: 1rem; min-width: 8rem;}
      }
      div{display: flex; width: 100%; justify-content: space-between;}
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