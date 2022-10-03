import axios from 'axios'
import React, { useState } from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import styled from 'styled-components'
import { MyRoster } from '../../Helpers/Context'

function Edit(props) {

    const {Staff, staff, setStaff} = useContext(MyRoster)
    const Permissions = 'admin'
    const [ableEdit, setAbleEdit] = useState(false)
    useEffect(() => {if (Permissions == 'admin' || Permissions =='manager') { setAbleEdit(true) }}, []) 
    
    let array = []
    useEffect(()=> {console.log(Staff)}, [array])

    const addEmployee = (e) => {
        array = []
        e.preventDefault()
        const grabForm = document.querySelector('.addstaff')
        const form = new FormData(grabForm)
        for (let data of form.entries()) {array.push({[data[0]]: data[1]})}
        array = Object.assign({}, ...array)
        if (array.role === 'admin') {Staff[0].admin.push({employee: array})}
        if (array.role === 'staff') {Staff[0].staff.push({employee: array})}
        if (array.role === 'manager') {Staff[0].admin.push({employee: array})}
        console.log(array)
        axios.post(process.env.REACT_APP_Server + '/addemployee', (array), {withCredentials: true}).then(response => {
            setStaff(curr => [...curr])
        })
    }


  return (
    <Wrapper>
        <div className="header">
            <h2>CheeseCake Factory</h2>
            <p>for: 5015 Westheimer Rd, Houston, TX 77056</p>
        </div>
        <section>
            <div className="nav">
                <h3>edit queue</h3>
                <h3>edit roster</h3>
            </div>
            <div className="page">
                <div className="settings">
                    <div className="location">
                        <div className="map" />
                        <h2>Location</h2>
                    </div>
                    <h3>Configs</h3>
                    <section className='checkboxes'>
                        <div className="configs">
                            <input type="checkbox" name="promo" disabled={false}/>
                            <label htmlFor="promo">Promo</label>
                        </div>
                        <div className="configs">
                            <input type="checkbox" name="onlyverified" disabled={false}/>
                            <label htmlFor="onlyverified">Only Verified</label>
                        </div>
                        <div className="configs">
                            <input type="checkbox" name="Nearby" disabled={false}/>
                            <label htmlFor="Nearby">Nearby</label>
                        </div>
                    </section>
                </div>
                <div className="rules">
                    <h3>Rules</h3>
                    <textarea name="" id="" cols="30" rows="10"></textarea>
                </div>
            </div>
        </section>
        <section className="roster">
            <h3>Emoployee's</h3>
            <div className='employees'>
                <form onSubmit={e => addEmployee(e)} className="addstaff">
                    <input type="text" placeholder='Employee Name' name='name' pattern="[^\s][A-z0-9À-ž^\s]+" maxLength='64' required/>
                    <input type="text" placeholder='Employee Id' name='employeeID' pattern="[a-zA-Z0-9]*" maxLength='32' required/>
                    <select type="text" placeholder='Employee Role' name='role' required>
                        {Permissions === 'admin' ? <option value="admin">admin</option> : <></>}
                        {Permissions == 'admin' || Permissions =='manager' ? <><option value="manager">manager</option><option value="staff">staff</option></> : <></>}
                    </select>
                    <input type="number" min='0' minLength='6' maxLength='8' placeholder='Employee Temp Pin' pattern="[0-9]+" required/>
                    <button>+ add employee</button>
                </form>
                {staff.map(roster => {
                    return (
                        <>
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
                                            <p key={people.employee.employeeID}>{people.employee.name}</p>
                                            <p key={people.employee.employeeID}>{"EmployeeID: " + people.employee.employeeID}</p>
                                        </div>
                                    )
                                })}
                            </div>
                            <h4>Staff</h4>
                            <div className='name'>
                                {roster.staff.map(people => {
                                    return (
                                        <div>
                                            <p key={people.employee.employeeID}>{people.employee.name}</p>
                                            <p key={people.employee.employeeID}>{"EmployeeID: " + people.employee.employeeID}</p>
                                        </div>
                                    )
                                })}
                            </div>
                        </>
                    )
                })}
            </div>
        </section>
    </Wrapper>
  )
}

const Wrapper = styled.div`
/* display: none; */
    position: absolute;
    top: -4rem;
    width: 65rem;
    height: 40rem;
    background-color: #f3f3f381;
    backdrop-filter: blur(60px);
    border: 2px solid black;
    border-radius: 1rem;
    z-index: 5;
    overflow: hidden;
    overflow-y: auto;
    &::-webkit-scrollbar{ width: 5px;}
    &::-webkit-scrollbar-track{background-color: rgba(0, 0, 0, 0); margin: 1rem;}
    &::-webkit-scrollbar-thumb{ background-color: rgba(151, 95, 36, 0.055); border-radius: 12px;}
    &:hover{
        &::-webkit-scrollbar-thumb{ background-color: rgba(151, 95, 36, 0.603);}
    }
    .header{
        display: flex;
        flex-direction: column;
        p, h2{ margin: .2rem 1rem;}
    }
    section{
        display: flex;
        justify-content: space-between;
        position: relative;
        .nav{
            margin: 1rem 0;
            width: 10rem;
            height: 80%;
            padding: .5rem .2rem;
            h3{
                padding: .5rem .5rem;
                text-align: right; 
                background-color: rgb(219,187,144);
                cursor: pointer;
                &:nth-child(2) {margin-top: 17rem;}
            }
        }
        .page{
            display: flex;
            position: relative;
            margin: 1rem .5rem;
            width: 52rem;
            height: min-content;
            .settings{
                .location{
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    width: fit-content;
                    .map{
                        margin: 1rem 5rem;
                        aspect-ratio: 1/1;
                        width: 12rem;
                        background-color: grey;
                        border-radius: 50%;
                    }
                    h2{margin: 0; font-size: 1rem;}
                }
                .checkboxes{
                    .configs{margin: 0rem 1rem;}
                }
            }
            .rules{
                margin: 0 5rem;
                width: 100%;
                h3{text-indent: 1rem;}
                textarea{
                    margin: 0 1rem;
                    width: 90%;
                    max-height: 70%;
                    border-radius: 1rem;
                    border: 1px solid grey;
                    resize: none;
                }
            }
        }
    }
    .roster{
        display: flex;
        flex-direction: column;
        width: 90%;
        margin: 1rem auto;
        margin-top: -3rem;
        h3{ padding: .5rem 0; border-bottom: 5px double black;}
        .employees{
            h4{text-indent: 1rem; margin-bottom: 1rem;; font-weight: bold; text-decoration: underline black;}
            .addstaff{
                display: flex;
                flex-wrap: wrap;
                position: relative;
                width: 100%;
                input{
                    margin: 0rem 1rem;
                    padding: .5rem;
                    height: 1rem;
                    border: 1px solid #d3d3d3;
                    border-radius: .2rem;
                    margin-bottom: 1rem;
                }
                select{
                    margin: 0 1rem; 
                    margin-bottom: 1rem; 
                    width: 186px; 
                    height: 34px; 
                    border: 1px solid #d3d3d3;
                }
                button{
                    height: 2rem; 
                    margin: 1rem;
                    margin-top: 0rem;
                    background-color: #dddddd;
                    border: unset;
                    cursor: pointer;
                    &:hover{ background-color: #4cbfec52; transition-delay: .1s;}
                }
            }
            .name{
                text-indent: 1rem;
                overflow: hidden;
                overflow-x: auto;
                div{display: flex; width: max-content;}
                p{margin: .5rem 0; font-size: .9rem; min-width: max-content; &:first-child{ min-width: 8rem; }} 
                &::-webkit-scrollbar{ width: 8px; height: 8px}
                &::-webkit-scrollbar-track{background-color: rgba(167, 167, 167, 0); margin: 0 1rem;}
                &::-webkit-scrollbar-thumb{ background-color: rgba(157, 123, 96, 0.952); border-radius: 12px;}
            }
        }
        
    }

    @media (max-width: 1400px) {
        top: 20rem;
        width: 95vw;
        height: 70vh;
        border: 4px solid black;
        backdrop-filter: blur(15px);
        section{
            display: block;
            .nav{
                display: flex;
                justify-content: space-evenly;
                align-items: center;
                margin: 1rem 0;
                padding: 0;
                width: 100%;
                height: 3rem;
                background-color: white;
                h3{width: 100%; text-align: center; font-size: .8rem; &:nth-child(2) {margin-top: .8rem; border-left: 1px solid white;}}
            }
            .page{
                display: unset;
                position: relative;
                margin: auto;
                width: 22rem;
                height: 30rem;
                background-color: white;
                .settings{
                    h3{margin: 0 1rem;}
                    .location{
                        margin: auto;
                        .map{
                            margin: 1rem auto;
                            width: 8rem;
                        }
                    }
                    .checkboxes{
                        display: flex;
                        margin: .5rem 2rem;
                        width: 80%;
                        .configs{margin: .5rem 0rem;}
                    }
                }
                .rules{
                    margin: 0 1rem;
                    width: 95%;
                    h3{text-indent: 0rem;}
                    textarea{
                        margin: 0 1rem;
                        min-height: 10rem;
                        width: 80%;
                    }
                }
            }
        }
        .roster{
            margin-top: unset;
            .employees{
                .addstaff{
                    display: block;
                    button{border-radius: 1rem; margin: 1rem; margin-top: 0;}
                    select{
                        -webkit-appearance: none;
                        margin-bottom: 1rem; 
                        padding-left: .5rem;
                        width: 158px; 
                        border-radius: unset;
                    }
                }
            }
        }
    }
`

export default Edit