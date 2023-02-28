import { useEffect, useLayoutEffect, useState } from "react"
import { useRef } from "react"
import styled from "styled-components"
import Staff from "./Roster"
import { Props, Que, validationSchema } from "../index"
import { management } from "Connections/lib/@Types"

// todo: add a way to remove roles and transfer users to another role
function Management({data}: {data: management}) {
  
  let
    newUsers: Array<management> = [],
    roles: Array<{name: string, Access: 'Full-Access' | 'Limited-Access' |'No-Access'}> = [];

  const [currStaffed, setCurrStaffed] = useState({data: data, role: {}});
  const 
    pin = useRef<HTMLInputElement>(null),
    roleInput = useRef<HTMLSelectElement>(null);

  useLayoutEffect(() => {
    showRosterView()
    setCurrStaffed({data: data, role: {}})
  }, [data]);

  return (
    <Wrapper onSubmit={e => e.preventDefault()}>
      <div className="Management">
        <div className="Management_multiAdd">
          <h5>New Users</h5>
          {newUsers.map((user, i) => {
            return (
              <div className="Management_multiAdd_user" key={i}>
                <p>{user.full_name}</p>
                <p>{user.ID_NO}</p>
                <p>{typeof user.role === 'string' ? JSON.parse(user.role).name : null}</p>
              </div>
          )})}
        </div>
        <div className="Management_col1">
          <label htmlFor="full_name">
            <h5>Name</h5>
            <input type="text" name="full_name" />
          </label>
          <label htmlFor="ID_NO">
            <h5>Identification No.</h5>
            <input type="text" name="ID_NO" />
          </label>
          <label htmlFor="role">
            <h5>Role</h5>
            <select name="role" ref={roleInput}>
              {roles?.map((role, i) => {
                return (
                  <option key={role.name} value={JSON.stringify(role)}>{role.name}</option>
                )
              })}
            </select>
          </label>
          <div className="manageRoles_container">
            <label htmlFor="manageRoles" className="manageRoles">
              <h5>Manage Roles</h5>
              <input type="text" name="manageRoles" className="manageRoles_input" id="manageRoles_input" onKeyUp={e => e.code === 'Enter' ? manageRoles(e) : null }/>
              <div>
                {roles?.map((role, i) => {
                  return (
                    <p className="roleNames" onClick={() => {
                      const modal = document.getElementById('roleRemovalModal') as HTMLDivElement
                      modal.style.display = 'flex'
                      setCurrStaffed((curr: any) => {
                        return {...curr, role: role, state: setCurrStaffed}
                      })
                    }} key={role.name}>{'X ' + role.name}</p>
                  )
                })}
              </div>
            </label>
            <select name="permissions" id="managePermissions">
              <option value="Full-Access">Full-Access</option>
              <option value="Limited-Access">Manage Que</option>
              <option value="No-Access">Read Only</option>
            </select>
            <button type="button" className="Management_multiAdd_btn" onClick={(e) => addUsers(newUsers)}>Create Another User</button>
          </div>
        </div>
        <div className="Management_col2">
          <h5>Pin</h5>
          <div className="Management_switch_pin" id="Management_switch_pin" onClick={() => usingPin(pin)}>
            <p>Locked</p>
            <p>Unlocked</p>
            <div className="Management_switch_pin_slider"/>
          </div>
          <input id="Management_pin1" ref={pin} type="password" pattern="[0-9]*" inputMode="numeric" name="pin" min={0} minLength={4} maxLength={10} placeholder='1234' onChange={e => typeCheck(e)}/>
          <input id="Management_pin2" type="password" pattern="[0-9]*" inputMode="numeric" name="pinConfirm" min={0} minLength={4} maxLength={10} placeholder='1234' onChange={e => comparePins(e, pin)}/>
        </div>
        <button type="button" className="Management_close" onClick={e => showRosterView()}>close</button>
      </div>
      {/* <Staff {...props.data.info} />
      <RoleRemoval {...currStaffed}/> */}
    </Wrapper>
  );

  function manageRoles (e: React.KeyboardEvent<HTMLInputElement>) {}
  //   const target = e.currentTarget

  //   if (props.data.roles.filter(role => role.name === target.value.trim()).length > 0) {
  //     target.readOnly = true
  //     target.value = 'Already Exists'
  //     setTimeout(() => {
  //       target.value = ''
  //       target.attributes.removeNamedItem('readonly')
  //     }, 1000)
  //   } 
  //   else {
  //     let 
  //       value = e.currentTarget.value.trim(),
  //       access = document.querySelector('#managePermissions') as HTMLSelectElement;
  //     value = value.charAt(0).toUpperCase() + value.slice(1)
  //     setCurrStaffed({ ...props.data, roles: [...props.data.roles, {name: value, Access: access.value}]})
  //     target.value = ''
  //   }
  // }
  
  function typeCheck(e: React.ChangeEvent<HTMLInputElement>) {}
  //   let error = ''
  //   const 
  //     appendTo = document.getElementById('Management_switch_pin') as HTMLElement,
  //     invalid = document.createElement('div');
      
  //   invalid.className = 'Management_invalid'
  //   invalid.classList.add('ani')
  
  //   if (e.target.value.length < 4) {
  //     e.target.style.border = ''
  //   }
  //   for (let i = 0; i < e.target.value.length; i++) {
  //     if (Number.isNaN(parseInt(e.target.value[i]))) {
  //       e.target.value = e.target.value.slice(0, i)
  //       error = 'must be numbers'
  //       invalid.innerText = `Invalid Pin ${error}`
  //       appendTo.appendChild(invalid)
  //       setTimeout(() => {
  //         invalid.remove()
  //       }, 2000);
  //       break
  //     }
  //     if (i === e.target.value.length -1) {
  //       for (let i = 0; i < e.target.value.length; i++) {
  //         if (e.target.value[i] === e.target.value[i + 1] && e.target.value[i + 1] === e.target.value[i + 2]) {
  //           e.target.value = e.target.value.replace(e.target.value[i], '')
  //           error = 'must not have repeating numbers'
  //           invalid.innerText = `Invalid Pin ${error}`
  //           appendTo.appendChild(invalid)
  //           setTimeout(() => {
  //             invalid.remove()
  //           }, 2000);
  //           break
  //         }
  //         if (i === e.target.value.length -1) {
  //           setTimeout(() => {   
  //             if (e.target.value.length < 4) {
  //               e.target.style.border = '1px solid red'
  //             }
  //           }, 4000);
  //         }
  //       }
  //     }
  //   }
  // };

  function showRosterView() {}
  //   const managementView = document.querySelector('.Management') as HTMLElement
  //   const staffingView = document.querySelector('#Management_Staffing') as HTMLElement
  //   const edit = document.querySelector('.edit p') as HTMLElement
  //   managementView.style.display = 'none'
  //   staffingView.style.display = 'block'
  //   edit.innerHTML = 'Edit Me'
  // };
  
  function usingPin(pin: React.MutableRefObject<HTMLInputElement | null>) {}
  //   const switchContainer = document.querySelector('#Management_switch_pin') as HTMLElement
  //   const pinSlider = document.querySelector('.Management_switch_pin_slider') as HTMLElement
  //   const inputs = document.querySelectorAll('.Management_col2 input') as NodeListOf<HTMLInputElement>
  //   if (pinSlider.style.left === '50%') {
  //     pinSlider.style.left = '0%'
  //     switchContainer.style.backgroundColor = '#9cc7ff'
  //     switchContainer.style.color = 'white'
  //     pin.current?.setAttribute('required', '')
  //     inputs.forEach(input => {
  //       input.disabled = true
  //       input.style.backgroundColor = '#e6e6e6'
  //     })
  //   }
  //   else {
  //     pinSlider.style.left = '50%'
  //     switchContainer.style.backgroundColor = 'white'
  //     switchContainer.style.color = 'black'
  //     pin.current?.removeAttribute('required')
  //     inputs.forEach(input => {
  //       input.disabled = false
  //       input.style.backgroundColor = 'white'
  //     })
  //   }
  // };
  
  function comparePins(e: React.ChangeEvent<HTMLInputElement>, pin: React.MutableRefObject<HTMLInputElement | null>) {}
  //   if (e.target.value !== pin.current?.value) {
  //     e.target.style.border = '1px solid red'
  //   }
  //   else {
  //     e.target.style.border = ''
  //   }
  //   // Todo: add restiction submit button
  // };
  
  function addUsers(users: typeof newUsers) {}
  //   const userForm = document.querySelector('#Management') as HTMLFormElement
  //   const formData = new FormData(userForm)
  //   const dataForm = Object.fromEntries(formData.entries())
  //   let name = dataForm.full_name as string
  //   name = name.charAt(0).toUpperCase() + name.slice(1)
  //   dataForm.full_name = name
  //   let role = dataForm.role as string
  //   validationSchema.validate({
  //     full_name: dataForm.full_name,
  //     ID_NO: dataForm.ID_NO,
  //     role: JSON.parse(role),
  //     pin: dataForm.pin,
  //     confirmPin: dataForm.confirmPin
  //   }, { abortEarly: false }).then(_ => {
  //     let data = {..._}
  //     data.role = JSON.parse(role)
  //     delete data.confirmPin
  //     users = [...users, {...data}]
  //     userForm.reset()
  //   }).catch(err => {
  //     const inputs = document.querySelectorAll('#Management input') as NodeListOf<HTMLInputElement>
  //     err.inner.forEach((error: any) => {
  //       inputs.forEach(input => {
  //         const value = input.value
  //         if (input.name === error.path  && input.name !== 'pin' && input.name !== 'pinConfirm') {
  //           input.style.border = '1px solid red'
  //           input.disabled = true
  //           input.value = error.message
  //           setTimeout(() => {
  //             input.style.border = '1px solid #e6e6e6'
  //             input.disabled = false
  //             input.value = ''
  //           }, 2000)
  //         }
  //       })
  //     });
  //   })
  // };
};

const Wrapper = styled.form.attrs({id: 'Management'})`
  display: flex;  
  justify-content: space-around;
  position: relative;
  padding-bottom: 5rem;
  max-height: 30rem;
  .Management {
    all: unset;
    display: flex;
    justify-content: space-around;
    position: relative;
    width: 100%;
    .Management_close{
      position: absolute;
      top: -1.5rem;
      left: 0rem;
      z-index: 3;
      aspect-ratio: 3/1;
      width: 3rem;
      border-radius: .5rem;
      background-color: #e8e8e86a;
      border: 1px solid rgba(0, 0, 0, 0.049);
      &:hover{
        cursor: pointer;
        background-color: #c1a38160;
        border: 1px solid #0000001a;
      }
    }
    .Management_multiAdd {
      position: fixed;
      top: 7rem;
      left: 3rem;
      width: 15rem;
      height: 20rem;
      outline: 1px solid #0000001a;
      h5{
        margin: unset;
        padding: .5rem;
        background-color: #e8e8e86a;
      }
      .Management_multiAdd_user{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: .5rem;
        font-size: .8rem;
        height: 1.5rem;
        border-bottom: 1px solid #0000001a;
      }
    }
  }
  .Management_col1{
      width: 50%;
      h5{
        padding-top: .5rem;
        margin: .25rem;
      }
      label{
        position: relative;
        overflow: visible;
        div{
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-start;
          margin-top: .5rem;
          padding: .5rem;
          width: 100%;
          border: 1px solid #0000001a;
          p {
            margin: .5rem .1rem;
            padding: .1rem .5rem;
            font-size: .7rem;
            border: 1px solid #0000001a;
            border-radius: 0.3rem;
            background-color: #e8e8e86a;
            &:hover{
              cursor: pointer;
              background-color: #c1a38160;
            }
          }
        }
      }
      input{
        all: unset;
        padding: .2rem .5rem;
        width: 100%;
        height: 1rem;
        font-size: .8rem;
        border: 1px solid #0000001a;
        border-radius: 0.3rem;
      }
      select{
        text-indent: .5rem;
        margin-bottom: .5rem;
        width: calc(100% + 1rem);
        height: 1.5rem;
        border: 1px solid #0000001a;
        border-radius: 0.3rem;
        -webkit-appearance: none;
      }
      .manageRoles_container{
        position: relative;
        width: 100%;
        select{
          position: absolute;
          top: 1.9rem;
          right: -1rem;
          width: 6rem;
          height: 1.2rem;
          background-color: rgba(210, 210, 210, 0.42);
          font-weight: bold;
        }
        .Management_multiAdd_btn{
          aspect-ratio: 3/.5;
          width: calc(101% + 1rem);
          border-radius: 0 0 .5rem .5rem;
          background-color: #e8e8e86a;
          border: 1px solid rgba(0, 0, 0, 0.049);
          &:hover{
            cursor: pointer;
            background-color: #c1a38160;
            border: 1px solid #0000001a;
          }
        }
      }
    }
  .Management_col2{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: relative;
    width: 30%;
    height: 100%;
    overflow: hidden;
    h5{margin: 0 1rem; margin-top: .5rem;}
    .Management_switch_pin{
      display: flex;
      justify-content: space-around;
      align-items: center;
      position: relative;
      margin: .5rem;
      width: 8rem;
      height: 1.5rem;
      border: 1px solid #0000001a;
      border-radius: 0.5rem;
      background-color: #e8e8e86a;
      cursor: pointer;
      overflow: hidden;
      p{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50%;
        height: 100%;
        font-size: .7rem;
        font-weight: bold;
      }
      .Management_switch_pin_slider{
        position: absolute;
        left: 50%;
        width: 50%;
        height: 2rem;
        background-color: #c1a381;
        border-radius: 0.5rem;
      }
    }
    input{
      all: unset;
      padding: .2rem .5rem;
      margin: .5rem;
      width: 80%;
      height: 1rem;
      font-size: .8rem;
      border: 1px solid #0000001a;
      border-radius: 0.3rem;
      -webkit-appearance: none;
    }
    .Management_invalid{
      position: absolute;
      bottom: -3.5rem;
      &.ani{
        animation: error 3s forwards;
        @keyframes error {
          100% {
            bottom: 1.5rem;
            opacity: 0;
          }
        }
      }
    }
  }
`;

function RoleRemoval(props: {data: Props['data'], role: Que['roles'][0], state: React.Dispatch<React.SetStateAction<any>>}) {

  const 
    modal = document.getElementById('roleRemovalModal') as HTMLElement,
    users = props.data.user;

  useEffect(() => {
    return ClickObserver()
  }, [props.role]);

  return (
    <Modal>
      <p>Caution!! Before you Delete either transfer to another role or all users listed here will be deleted</p>
      {users.filter(user => {
        if (!user.role) return
        let userRole = JSON.parse(user.role)
        if (userRole.name === props.role.name) return user
      }).map(user => {
        return (
          <input type='checkbox' className="RoleRemovalName" key={user.ID_NO} onClick={
            e => {
              e.currentTarget.checked = !e.currentTarget.checked;
              console.log(e.currentTarget.checked)
            }
          } value={
            `${user.full_name} ~ ${user.ID_NO}`
          }/>
        )
      })}
      <div className="RolesRemoval_container">
        {props.data.roles?.filter((roles: Que['roles'][0]) => {
          if (roles.name === props.role.name) return
          return roles
        }).map((role, i) => {
          return (
            <p className="roleNames" onClick={() => {
              props.state((prev: typeof props) => {
                return {...prev, role: {}, users: users.filter(user => {
                  if (!user.role) return
                  let userRole: Que['roles'][0] = JSON.parse(user.role)
                  if (userRole.name === props.role.name){
                    return user.role = JSON.stringify({name: role.name, Access: role.Access})
                  }
                  else return user
                })};
              });
            }} key={role.name}><p style={{'color': 'white'}}>{`${role.name} ​`}</p>{`~ ${role.Access}`}</p>
          )
        })}
      </div>
      <div className="buttons">
        <button onClick={e => {
          let transfer = document.querySelector('.RolesRemoval_container') as HTMLElement;
          if (transfer.style.display === 'flex') transfer.style.display = 'none';
          else transfer.style.display = 'flex';
        }}>Transfer</button>
        <button onClick={e => {
          modal.style.display = 'none';
          props.state((prev: typeof props) => {
            return {...prev, role: {}}});
        }}>cancel</button>
        <button onClick={e => {
          modal.style.display = 'none';
          props.state((prev: typeof props) => {
            return {...prev, role: {}}});
        }}>Delete All</button>
      </div>
    </Modal>
  )

  function check(event: MouseEvent) {
    if (modal && modal.style.display === 'flex' && !modal.contains(event.target as Node)) {
      event.stopPropagation();
      modal.style.display = 'none';
      if (props.role.name) props.state((prev: typeof props) => {
        return {...prev, role: {}}});
    };
  };
  
  function ClickObserver() {
    let transfer = document.querySelector('.RolesRemoval_container') as HTMLElement
    if (transfer)
      transfer.style.display = 'none'
    if (!props.role.name || modal.style.display !== 'flex') {
      document.body.removeEventListener('click', check, true)
    }
    else {
      document.body.addEventListener('click', check, true)
    }
    return () => {
      document.body.removeEventListener('click', check, true)
    }
  };
};

const Modal = styled.div.attrs({id: 'roleRemovalModal'})`
  display: none;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 1rem;
  position: fixed;
  top: 15%;
  left: 25%;
  width: 50%;
  height: 20rem;
  background-color: #ffffff;
  border: 3px solid #e3f4f1;
  border-radius: 0.5rem;
  box-shadow: 0 0 0.5rem 0.1rem #0000001a;
  z-index: 10;
  .RoleRemovalName{
    all: unset;
    display: flex;
    justify-content: space-between;
    padding: .2rem .5rem;
    width: 85%;
    height: 1.5rem;
    background-color: #e8e8e86a;
    border-bottom: 1px solid #0000001a;
    cursor: pointer;
    &:last-child{
      border: none;
    }
  }
  .RoleRemovalName:checked{
    background-color: #81c1c0;
  }
  .RolesRemoval_container{
    display: none;
    flex-direction: column;
    align-items: center;
    padding: 1rem 0;
    width: 85%;
    height: 10rem;
    background-color: unset;
    .roleNames{
      all: unset;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: .5rem;
      padding: .2rem 0rem;
      width: 100%;
      font-size: .8rem;
      height: 1.5rem;
      font-weight: bold;
      border: 1px solid #0000001a;
      border-radius: 0.3rem;
      background-color: silver;
      transition: all 0.3s ease;
      cursor: pointer;
      &:hover{
        background-color: #81c1c0;
      }
    }
  }
  .buttons{
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: absolute;
    padding: 1rem 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2rem;
    background-color: unset;
    button{
      all: unset;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 20%;
      height: 100%;
      font-size: .8rem;
      font-weight: bold;
      border: 1px solid #0000001a;
      border-radius: 0.3rem;
      background-color: #c1a381b3;
      transition: all 0.3s ease;
      cursor: pointer;
      &:hover{
        background-color: #81c1c0;
      }
      &:nth-child(2){
        background-color: #e8e8e86a;
        &:hover{
          background-color: #e8e8e86a;
        }
      }
      &:nth-child(3){
        background-color: #232322;
        color: #ffffff;
        &:hover{
          background-color: #4c0000;
          font-weight: 1000;
        }
      }
    }
  }
`;

export default Management