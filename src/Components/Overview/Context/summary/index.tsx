import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import {BusinessTypes, management} from 'Connections/lib/@Types';
import styled from 'styled-components';
import * as yup from 'yup'

import Summery from './components/Summary';
import Management from './components/Management';
import RichTextEditor from './components/RichTextEditor';
import ReactQuill from 'react-quill';
import Lineup from './components/Lineup';
import axios from 'axios';

export const validationSchema = yup.object().shape({
  full_name: yup.string().trim().min(3).max(64).required('Name is required'),
  ID_NO: yup.string().trim().max(24).required('ID is required'),
  role: yup.object({
    name: yup.string().trim().min(3).max(64).required('Role is required'),
    Access: yup.string().trim().min(3).max(64).required('Role is required')
  }).required('Role is required'),
  pin: yup.string().max(8, 'Max Length Exceeded').matches(/[0-9]+/gi, "Enter number only").optional(),
  confirmPin: yup.string().when('pin', {
    is: (pin: string) => (pin && pin.length > 0 ? true : false),
    then: yup.string().oneOf([yup.ref('pin')], 'Pin does not match')
  })
})

type Nav = {
  name: string
  link: string
  size: number
  img: any
}

export type Que = {
  info: BusinessTypes
  roles: Array<{name: string, Access: 'Full-Access' | 'Limited-Access' |'No-Access'}>
  user: Array<management>
}

export type Props = {
  data: Que
  setData: (data: any) => void;
  setNewUsers: (data: any) => void;
  newUsers: Que['user'];
  editorRef: any;
}

function Boilerplate(props: BusinessTypes) {

  let Navigation = Array<Nav>(
    {name: 'Overview', link: '/', size: 1, img: ''},
    {name: 'Management', link: '/mg', size: 1, img: ''},
    {name: 'Editor', link: '/edit', size: 1, img: ''},
    {name: 'Queue', link: '/que', size: 1, img: ''},
  )
  
  const
    pageView = {O: false, M: false, E: false, Q: false},
    [page, setPage] = useState(pageView),
    [data, setData] = useState<Que>({info: props, roles: [], user: []}),
    [newUsers, setNewUsers] = useState<Que['user']>([]),
    editorRef = useRef<ReactQuill> (null);
  
  let ManageData: Props = {
    data: data,
    setData: setData,
    newUsers: newUsers,
    setNewUsers: setNewUsers,
    editorRef: editorRef
  }

  useLayoutEffect(() => {
    setPage({...pageView, O: true})
  }, [])

  useEffect(() => {
    //Todo: Get data from server
    const submitButton = document.querySelector('.Main_Overview .edit img') as HTMLElement
    const editDiv = document.querySelector('.Main_Overview .edit p') as HTMLElement
    editDiv.innerText = 'Edit Me'
    submitButton.classList.remove('ani')
  }, [page])

  const editMode = () => {
    const managementView = document.querySelector('.Management') as HTMLElement
    if (page.Q) {
      editQ()
    }
    else if (page.M) {
      if ( managementView.style.display === 'flex' ) {
          const userForm = document.querySelector('#Management') as HTMLFormElement
          const formData = new FormData(userForm)
          const dataForm = Object.fromEntries(formData.entries())
          let allNewUsers: Que['user'] = []
  
          new Promise((resolve, reject) => {
            if (dataForm.full_name !== '' && dataForm.ID_NO !== '') {
              const role = dataForm.role as string
              validationSchema.validate({
                full_name: dataForm.full_name,
                ID_NO: dataForm.ID_NO,
                role: JSON.parse(role),
                pin: dataForm.pin,
                confirmPin: dataForm.confirmPin
              })
              .then(schem => {
                //Todo: Add Pins to database
                if (data.user.filter(item => item.ID_NO && item.ID_NO.toString() === schem.ID_NO).length > 0) {
                  alert('User already exists')
                  return 
                }
                allNewUsers.push({
                  full_name: schem.full_name,
                  ID_NO: schem.ID_NO,
                  role: role,
                  permissions:  JSON.parse(role).Access,
                  pin: schem.pin
                })
              })
              .catch(err => {
                alert(err.errors)
                reject(err)
              })
              .finally(() => {
                userForm.reset()
                resolve('')
              })
            }
            else {
              resolve('')
            }
          })
          .then(() => {
            if (newUsers.length > 0) {
              allNewUsers = [...allNewUsers, ...newUsers]
            }
            if (allNewUsers) {
              if (window.confirm('Are you sure you want to save changes?')){
                console.log(allNewUsers)
                axios.post(process.env.REACT_APP_Server + '/management/change', [ {line_id: props.line_id}, ...allNewUsers], {withCredentials: true})
                .then((res: {data: {err: string}}) => {
                  if (res.data.err) {
                    alert(res.data.err)
                    return
                  } else {
                    setData({...data, user: [...data.user, ...allNewUsers]})
                  }
                })
                .finally(() => {
                  editM()
                })
              }
            }
          })
      }
      else {
        editM()
      }
    }
    else if (page.E) {
      if (data.info?.notes !== editorRef.current?.value && editorRef.current?.value) {
        if (window.confirm('Are you sure you want to save changes?')) {
          const value = editorRef.current.value as string
          setData({...data, info: {...data.info, notes: value}})
        }
      }
    }
  }


  return (
    <Wrapper>
      <ONav />
      <main className='Overview_Content'>
        <div className="banner">
          <h1>{props.name}</h1>
        </div>
        <div className="content" >
          {page.O ? <Summery {...ManageData.data.info}/> : null}
          {/* {page.M ? <Management {...ManageData}/> : null} */}
          {page.E ? <RichTextEditor {...ManageData}/> : null}
          {page.Q ? <Lineup {...ManageData.data.info}/> : null}
        </div>
        <div className="edit" style={{visibility: !page.Q ? 'visible': 'collapse'}}>
          <p>Edit Me</p>
          <img className='emblem' src={process.env.REACT_APP_Bucket + props.image} alt="" onClick={() => editMode()}/>
        </div>
      </main>
    </Wrapper>
  )
}

const Wrapper = styled.div.attrs({className: 'Main_Overview'})`
  position: relative;
  margin: 0;
  width: 100%;
  min-height: 40rem;
  overflow: hidden;
  .Overview_Content {
    position: relative;
    margin: 1rem 0;
    min-width: 30rem;
    width: 60%;
    height: min-content;
    border-radius: 1.5rem 1.5rem 0 0;
    box-shadow: 0 0 0.5rem 0.5rem #0000001a;
    padding: 1rem;
    .banner {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 7rem;
      border-radius: 1.5rem 1.5rem 0 0;
      background: radial-gradient(ellipse at center,#fcf6ef 70%,#84684936 100%);
      h1 {color: #5e5d5d;}
    }
    .content {
      position: relative;
      margin-top: 8rem;
    }
    .edit {
      display: flex;
      align-items: center;
      position: absolute;
      bottom: 3%;
      right: 5%;
      color: #5e5d5d;
      cursor: default;
      img {
        margin-left: 0.5rem;
        padding: 0.5rem;
        aspect-ratio: 1;
        width: 3rem;
        object-fit: cover;
        border-radius: 50%;
        box-shadow: 0 0 5px 5px #0000001a;
        cursor: pointer;
        &:hover {
          animation: rotate 1s ease;
          background-color: #d7fff9c1;
          @keyframes rotate {
            100% {
              rotate: 360deg;
            }
          }
        }
        &.ani {
          animation: rotate 1s forwards;
          @keyframes rotate {
            100% {
              rotate: 360deg;
              background-color: #d7fff9c1;
            }
          }
        }
      }
      &:hover {
        transition: all 0.2s ease-in-out;
        font-weight: bold;
        img {
          box-shadow: 0 0 2px 3px #0000003d;
        }
      }
    }
  }
`

function editQ() {
  console.log('editQ')
}

function editM() {
  const managementView = document.querySelector('.Management') as HTMLElement
  const staffingView = document.querySelector('#Management_Staffing') as HTMLElement
  const edit = document.querySelector('.edit p') as HTMLElement
  if (managementView.style.display === 'flex') {
    managementView.style.display = 'none'
    staffingView.style.display = 'block'
    edit.innerHTML = 'Edit Me'
    return
  }
  else {
    managementView.style.display = 'flex'
    staffingView.style.display = 'none'
    edit.innerHTML = 'submit changes'
    return
  }
}

function ONav() {


  return (
    <Navigator>

    </Navigator>
  )
}

const Navigator = styled.div.attrs({className: 'Overview_Nav'})`
  position: relative;
  width: 100%;
  height: 3rem;
  background-color: #d7fff9c1;
`


export default Boilerplate