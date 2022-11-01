import React from 'react'
import styled from 'styled-components'
import { useEffect, useState } from 'react';
import { MyRoster } from '../../Helpers/Context';
import axios from 'axios';
import Edit from './Edit';
import Line from './Lineup'

function Activelines(props) {

  const [count, setCount] = useState(0)
  let testarray = [
    {name: 'jayell', timeJoined: '', otherData: '', user_id: ''},
    {name: 'jayell', timeJoined: '', otherData: '', user_id: ''},
    {name: 'jayell', timeJoined: '', otherData: '', user_id: ''},
    {name: 'jayell', timeJoined: '', otherData: '', user_id: ''},
    {name: '4134', timeJoined: '', otherData: '', user_id: ''},
    {name: 'jayell', timeJoined: '', otherData: '', user_id: ''},
    {name: 'jayell', timeJoined: '', otherData: '', user_id: ''},
    {name: 'jayell', timeJoined: '', otherData: '', user_id: ''},
    {name: 'sjgn', timeJoined: '', otherData: '', user_id: ''},
    {name: 'jayell', timeJoined: '', otherData: '', user_id: ''},
    {name: 'jayell', timeJoined: '', otherData: '', user_id: ''},
    {name: 'jayell', timeJoined: '', otherData: '', user_id: ''},
    {name: 'jbjhba', timeJoined: '', otherData: '', user_id: ''},
    {name: 'jayell', timeJoined: '', otherData: '', user_id: ''},
    {name: 'jayell', timeJoined: '', otherData: '', user_id: ''},
    {name: 'jayell', timeJoined: '', otherData: '', user_id: ''},
    {name: 'ajfgnajf', timeJoined: '', otherData: '', user_id: ''},
    {name: 'jayell', timeJoined: '', otherData: '', user_id: ''},
    {name: 'jayell', timeJoined: '', otherData: '', user_id: ''},

  ]
  
  const [staff, setStaff] = useState([false])
  const [spots, setSpots] = useState(testarray)
  const [page, setPage] = useState(4)
  const [isloading, setIsloading] = useState(true)


  useEffect(()=> {
    let array = [{
      admin: [],
      manager: [],
      staff: [],
      line_info: [],
    }]
    setSpots(testarray.slice(page-4, page))
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
      console.log(page)
    })
    console.log(testarray.length-page >= 4, testarray.length-page)
  }, [count, props.links, page])

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

  const counteru = () => { if (testarray.length-page >= 0 ) {let count = page + 4; setPage(count)} }
  const counterd = () => { if (page > 4 ) {let count = page - 4; setPage(count)} }

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
              <p>- Addrress: {staff[0].line_info[0].address_1}</p>
              <p>- People currently in line: 13</p>
              <p>- Max people: false</p>
              <p>- Movement: 22 Every 30min</p>
              <p>- Total people in Queue Today: 68</p>
              <p>- Views: 2.3k</p>
              <h4>Configs</h4>
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
                        {roster.admin?.length > 0 ? <h4>Admin's</h4> : '' }
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
                        {roster.manager?.length > 0 ? <h4>Manager's</h4> : '' }
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
                        {roster.staff?.length > 0 ? <h4>Staff</h4> : '' }
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
      </div> 

      <button onClick={counterd}>back</button>
      <button onClick={counteru}>forth</button>
      </> : <></> }
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
      section{ p{ margin: .5rem 0;}}
      .checkboxes{
        display: flex;
        margin-top: -1rem;
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
      border-radius: .5rem;
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
  .line{
    position: absolute;
    top: .5rem;
    right: 1rem;
    h1{
      margin: 0;
      text-indent: 1rem;
      color: #DBBB90;
      font-family: 'Cinzel', serif;
    }
    p{margin: 0; margin-bottom: 1rem; text-indent: 1rem;}
    .spot{
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      h2{ width: 40%; margin: 0 1rem; font-size: 1.2rem;}
      p{ width: 40%; margin: 0; font-size: .8rem;}
      .buttons{
        display: flex;
        align-items: center;
        margin: .5rem;
        button{
          margin: 0rem .5rem;
          margin-bottom: 1rem;
          padding: .5rem 1.5rem;
          color: #505050;
          font-weight: bold;
          border-radius: .5rem;
          border: unset;
        }
      }
    }
  }

  @media (max-width: 1400px) {
    .preview{
      flex-direction: column;
      left: unset;
      height: 40rem;
      width: 90%; 
      border: unset;
      #partion{
        width: 100%;
      }
      .map{
        aspect-ratio: 1/1;
        width: 50%;
        margin: 1rem auto;
        margin-bottom: 1rem;
      }
      section{width: 100%;}
    }
    .management{
      position: unset;
      top: unset;
      left: unset;
      width: 90%;
      h2{margin-top: 1rem; font-size: 1.2rem;}
      li{font-size: 1rem; font-weight: bold; font-size: 1.1rem;}
      p{font-size: .9rem;}
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
    .line{
      display: flex;
      flex-direction: column;
      justify-content: center;
      position: relative;
      top: unset;
      right: unset;
      margin-top: 1rem;
      padding-top: 1rem;
      width: 80vw;
      border-top: 5px double;
      h1{ display: flex; align-items: center; margin: 0 .5rem; font-size: 1.4rem; text-indent: unset;}
      p{ display: flex; align-items: center; margin:0 .5rem; margin-bottom: 1rem; text-indent: unset;}
      .spot{
        h2{ width: 100%; font-size: 1.1rem; margin: .5rem;}
        p{ margin:0;}
        .buttons{
          display: flex; 
          justify-content: space-between;
          margin: 0;
          width: 100%;
          button{
            width: 100%;
            padding: .8rem .8rem;
          }
        }
      }
    }
  }
  @media (max-width: 712px) {
    .preview{.map{width: 80%; height: 35%;}}
  }
`

export default Activelines