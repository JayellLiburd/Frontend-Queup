import React, { useEffect, useLayoutEffect, useRef } from 'react'
import styled from 'styled-components'
import axios from 'axios'

import { Que } from "../index"
import { myQue } from 'Connections'
import { management } from 'Connections/lib/@Types'
import { BsPencil } from 'react-icons/bs'

//todo: add a refresh button

var storedData: {
  user: Array<management>;
  roles: Array<{
    name: string;
    Access: "Full-Access" | "Limited-Access" | "No-Access";
  }>;
} = {user: [], roles: []}

function Staffing({lineId}: {lineId: management['line_id']}) {

  const 
    [editor, setEditor] = React.useState({name: '', ID_NO: '', role: ''}),
    [data, setData] = React.useState<typeof storedData>({} as typeof storedData);

  const roleInput = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    if (lineId && storedData.user.length < 1){
      myQue.Que(lineId).then(res => {
        let
          users: Array<management> = [], 
          roles: Array<{
            name: string;
            Access: "Full-Access" | "Limited-Access" | "No-Access";
          }> = [];
        
        res.data.forEach((item: any) => {
          let parsedrole: Que['roles'][0] = JSON.parse(item.role)
          users.push({full_name: item.full_name, ID_NO: item.ID_NO, role: item.role})
          if (!roles.find(role => role.name === parsedrole.name)) roles.push(parsedrole)
        })
        storedData = ({user: users, roles: roles})
        setData(storedData)
      })
    } else {
      setData(storedData)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lineId])

  let usersIndex = 0;
  return (
    <Wrapper>
      <div className='Staffing_Roster_Item' style={{backgroundColor: '#d0c79d', 'height': '2rem','fontWeight': 'bold'}}>
        <p style={{textIndent: '.5rem', fontSize: '1rem'}}>Name</p>
        <p style={{fontSize: '1rem'}}>Identification</p>
      </div>
      {data.roles?.map((role) => {
        return (
          <div className="Staffing" key={role.name}>
            <h3 onClick={e => collapseList(e)}>{role.name}</h3>
            <div className="Staffing_Roster" >
              {storedData.user.filter(item => {
                if (!item.role) return false
                if (JSON.parse(item.role).name === role.name) {
                  return item
                }
              }).map((user, i) => {
                user['index'] = usersIndex++
                if (!user.role) return null
                return (
                  <div className="Staffing_Roster_Item" key={user.full_name}>
                    <input disabled defaultValue={user.full_name} onKeyUp={e => e.code === 'Enter' ? modifyUser(e) : null} />
                    <p>{JSON.parse(user.role).Access}</p>
                    <input disabled defaultValue={user.ID_NO}/>
                    <input hidden defaultValue={user.role}/>
                    <div className="Staffing_tools">
                      <button onClick={e => toggleEdit(e)} ><BsPencil size={11} /></button>
                      <button onClick={() => removeUser(user)} >X</button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
      <div className="Staffing_Edit_Modal_Paremeter" onClick={e => {
        const modal = e.currentTarget as HTMLElement
        const form = document.querySelector('.Staffing_Edit_Modal') as HTMLElement
        if (e.target === modal) {
          modal.style.display = 'none'
          form.style.display = 'none'
        }
      }}/>
      <div className="Staffing_Edit_Modal" >
        <div className="Management"> 
          <form id='Edit_Roster_Form' className="Management_col1">
            <label htmlFor="name">
              <h5>Name</h5>
              <input type="text" name="name" defaultValue={editor.name}/>
            </label>
            <label htmlFor="ID_NO">
              <h5>Identification No.</h5>
              <input  type="text" name="ID_NO" defaultValue={editor.ID_NO}/>
            </label>
            <label htmlFor="role">
              <h5>Role</h5>
              <select name="role" ref={roleInput}>
                {storedData.roles?.map((role, i) => {
                  let selected = false
                  if (editor.role !== '' && JSON.parse(editor.role).name === role.name) selected = true
                  return (
                    <option key={role.name} value={JSON.stringify(role)} selected={selected}>{role.name}</option>
                  )
                })}
              </select>
            </label>
            <div className="manageRoles_container">
              <label htmlFor="manageRoles" className="manageRoles">
                <h5>Manage Roles</h5>
                <input type="text" name="manageRoles" className="manageRoles_input" id="manageRoles_input" onKeyUp={e => e.code === 'Enter' ? manageRoles(e) : null }/>
                <div>
                  {storedData.roles?.map((role, i) => {
                    return (
                      <p 
                        onClick={() => storedData = ({user: storedData.user, roles: storedData.roles.filter(item => item.name !== role.name)})}
                        key={role.name}
                      >{'X ' + role.name}</p>
                    )
                  })}
                </div>
                </label>
                <select name="permissions" id="managePermissions">
                  <option value="Full-Access">Full-Access</option>
                  <option value="Limited-Access">Manage Que</option>
                  <option value="No-Access">Read Only</option>
                </select>
            </div>
            <button type='button' onClick={e => handleRoster(e)}>Submit Changes</button>
          </form>
        </div>
      </div>
    </Wrapper>
  );

  function manageRoles(e: React.KeyboardEvent<HTMLInputElement>) {
    let target = e.currentTarget
    if (storedData.roles.filter(role => role.name === target.value.trim()).length > 0) {
      target.readOnly = true
      target.value = 'Already Exists'
      setTimeout(() => {
        target.value = ''
        target.attributes.removeNamedItem('readonly')
      }, 1000)
    }
    else {
      let value = e.currentTarget.value.trim()
      value = value.charAt(0).toUpperCase() + value.slice(1)
      if (!roleInput.current)
        return
      const role: Que['roles'][0] = JSON.parse(roleInput.current.value)
      if (role.Access === 'Full-Access' || role.Access === 'Limited-Access' || role.Access === 'No-Access') {
        storedData.roles.push({ name: value, Access: role.Access })
        storedData = ({ ...storedData, roles: storedData.roles })
        target.value = ''
      }
    };
  }

  function toggleEdit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const 
      editor = document.querySelector('.Staffing_Edit_Modal_Paremeter') as HTMLElement,
      modal = document.querySelector('.Staffing_Edit_Modal') as HTMLElement,
      input = e.currentTarget.parentElement?.parentElement?.querySelectorAll('input') as NodeListOf<HTMLInputElement>,
      name = input[0],
      ID_NO = input[1],
      role = input[2];

    setEditor({name: name.value, ID_NO: ID_NO.value, role: role.value})
    editor.style.display = 'block'
    modal.style.display = 'block'
  };

  function collapseList(e: React.MouseEvent<HTMLHeadingElement>) {
    const list = e.currentTarget.nextElementSibling as HTMLElement
    if (list.style.height === '0px') {
      list.style.height = 'auto'
    }
    else {
      list.style.height = '0px'
    }
  };
  
  function handleRoster(e: React.MouseEvent<HTMLButtonElement>) {
    const theForm = e.currentTarget.parentElement as HTMLFormElement
    const inputID = theForm.querySelector('input[name="ID_NO"]') as HTMLInputElement
    let form = new FormData(theForm)
    const findUser = storedData.user.filter(user => user.ID_NO === inputID.defaultValue)
    if (findUser.length > 0) {
      axios.post('/management/change', {}, {withCredentials: true})
      const 
        formParemeter = document.querySelector('.Staffing_Edit_Modal_Paremeter') as HTMLElement,
        modal = document.querySelector('.Staffing_Edit_Modal') as HTMLElement;
      modal.style.display = 'none'
      formParemeter.style.display = 'none'
  
      axios.post('/management/change', {
        line_id: lineId,
        full_name: form.get('name')?.toString() || '',
        ID_NO: form.get('ID_NO')?.toString() || '',
        role: form.get('role')?.toString() || ''
      }, {withCredentials: true}).then(res => {
        storedData.user = storedData.user.map(item => {
          if (item.ID_NO === inputID.defaultValue) {
            item.full_name = form.get('name')?.toString() || ''
            item.ID_NO = form.get('ID_NO')?.toString() || ''
            item.role = form.get('role')?.toString() || ''
          }
          return item
        })
        storedData = ({...storedData, user: storedData.user})
      });
    }
  };
  
  function modifyUser(e: React.KeyboardEvent<HTMLInputElement>) {
    const input = e.currentTarget
    if (input.value !== input.defaultValue) {
        storedData.user.filter((item: typeof storedData['user'][0]) => {
          if (item.full_name === input.defaultValue) 
            item.full_name = input.value
          return item
        })
        storedData = ({...storedData, user: storedData.user})
      const submitButton = document.querySelector('.Main_Overview .edit img') as HTMLElement
      const editDiv = document.querySelector('.Main_Overview .edit p') as HTMLElement
      editDiv.innerText = 'Save'
      submitButton.classList.add('ani')
    }
  };
  
  function removeUser(user: Que['user'][0]) {
    const newProps = {...storedData}
    newProps.user = newProps.user.filter(item => item.ID_NO !== user.ID_NO)
    storedData = (newProps)
  };
}

const Wrapper = styled.div.attrs({id: 'Management_Staffing'})`
  width: 101%;
  height: 24rem;
  overflow-y: scroll;
  ::-webkit-scrollbar { width: 3px;}
  ::-webkit-scrollbar-track { background: transparent; margin: 2rem 0;}
  ::-webkit-scrollbar-thumb { background: #8080802c; border-radius: 1rem;}
  h3{
    display: flex;
    align-items: center;
    margin: 0;
    width: 100%;
    height: 1.8rem;
    font-size: .8rem;
    color: #3c3a2e;
    text-indent: 1rem;
    border-bottom: 1px solid #8080802c;
    background-color: #8080802c;
    cursor: pointer;
    user-select: none;
  }
  .Staffing_Roster{
    transition: all .5s ease;
    overflow: hidden;
  }
  .Staffing_Roster_Item{
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    padding: .3rem .5rem;
    padding-bottom: .2rem;
    border-bottom: 1px solid #8080802c;
    &:hover{
      .Staffing_tools button{
        transition: all .5s ease;
        opacity: 1;
        pointer-events: all;
      }
    }
    input {
      margin: 0;
      width: 10rem;
      text-indent: .5rem;
      border: 1px solid #8080802c;
      &:disabled{
        border: none;
        background-color: transparent;
        border: 1px solid transparent;
      }
    }
    p{
      margin: 0;
      min-width: 10rem;
      font-size: .8rem;
      &:first-child{
        width: 10rem;
      }
    }
    .Staffing_tools{
      display: flex;
      justify-content: center;
      position: absolute;
      right: 0;
      padding: 0 .5rem;
      button{
        all: unset;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 2px .5rem;
        font-size: .8rem;
        border-radius: .3rem;
        box-shadow: 0 0 3px #8080802c;
        opacity: 0;
        pointer-events: none;
        &:first-child{ margin-right: .2rem;}
        &:hover{
          cursor: pointer;
          color: #9d3e07;
        }
      }
    }
    &:last-child{
      border-bottom: none;
      margin-bottom: .2rem;
    }
  }
  .Staffing_Edit_Modal_Paremeter{
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #0000002c;
    z-index: 0;
  }
  .Staffing_Edit_Modal{
    display: none;
    position: fixed;
    top: 20%;
    left: 25%;
    padding: 3rem 0;
    width: 50%;
    background-color: #ffffff;
    border: 3px solid #8080802c;
    border-radius: .5rem;
    z-index: 2;
    button{
      all: unset;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: .5rem; 
      padding: .5rem 1rem;
      font-size: .8rem;
      border-radius: .3rem;
      box-shadow: 0 0 3px #2d2d2d2c;
      z-index: 2;
      &:hover{
        cursor: pointer;
        color: #9d3e07;
      }
    }
    input{
      width: 100%;
    }
  }
`;

export default Staffing