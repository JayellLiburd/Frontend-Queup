import axios from 'axios';
import { BusinessTypes } from 'Connections/lib/@Types'
import { Links, usersContext } from 'Helpers/Context';
import { useContext, useEffect, useState } from 'react'
import { FiDelete } from 'react-icons/fi';
import styled from 'styled-components'

function MyQues({data: Ques}: {data: Array<BusinessTypes>}) {

  let view = false;
  const 
    {setUser, setAuth} =  useContext(usersContext),
    {buttonactive, setLink} = useContext(Links),
    [data, setData] = useState<typeof Ques>([] as typeof Ques),

    SwitchTabs = (data: BusinessTypes) => { 
      setLink(data); 
      buttonactive(); 
    },

    deleteLine = (id: string, img: string) => {
      axios.post(process.env.REACT_APP_Server + '/MyQueues/remove', {line_id: id, fileName: img}, {withCredentials: true}).then(response => {
        axios.get(process.env.REACT_APP_Server + '/verify',{withCredentials:true}).then((response) => {
          if (response.data[0]) {setAuth(true); setUser(response.data[0])}
          else {setAuth(false)}
        })
      })
    };
  ;

  useEffect(() => {
    if (Ques.length > 0) {
      setData(Ques)
    }
  }, [Ques])

  return (
    <Wrapper>
      <h2 style={{color: '#5e5d5d', fontFamily: 'serif', fontSize: '1.4rem', margin: '0.5rem 1.5rem'}}>Business Lines</h2>
      {data.map((item) => {
        let confirm = false
        function confirmDelete(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
          if (confirm && item.line_id && item.image) {deleteLine(item.line_id, item.image)}
          else {
            confirm = true
            e.currentTarget.style.backgroundColor = '#e00000'
            setTimeout(() => {
              confirm = false
              e.currentTarget.style.backgroundColor = ''
            }, 2000)
          }
        }
        return (
          <div className='myQues_businesses' key={item.line_id} onClick={e => showInfoModal()}>
            <h3>{item.name}</h3>
            <p className='myQues_address'>{item.address}</p>
            {/* <p>Currently in line: {item.currentline}</p> */}
            <p>Manager: {item.host}</p>
            <button onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>  confirmDelete(e) }><FiDelete color='black'/></button>
          </div>
        )
      })}
    </Wrapper>
  );

  
  function showInfoModal() {
    const modals = document.querySelectorAll('.Overview_modals') as NodeListOf<HTMLElement>;
    let count = 0;
    if (view) {
      modals.forEach((modal) => {
        modal.animate(null)
      });
      view = false;
    }
    else {
      modals.forEach(item => item.animate([
        {opacity: '1'},
        {opacity: '0', pointerEvents: 'none'}
      ], {
        duration: 1000,
        fill: 'forwards'
      }));
      count++
      view = true;
    }
  };
};

const Wrapper = styled.div.attrs({id: 'myQues', className: 'Overview_modals'})`
  margin: .25rem auto;
  width: 100%;
  background-color: white;
  border-radius: .5rem;
  padding-bottom: 1rem;
  box-shadow: 0 0 5px 0 rgba(0,0,0,0.2);
  .myQues_businesses{
    display: flex; 
    align-items: center;
    position: relative;
    margin: 0 auto;
    padding: 0 1rem;
    width: 95%;
    overflow: hidden;
    overflow-x: auto;
    transition: all .5s ease;
    border-top: 1px solid #e0e0e0;
    cursor: pointer;
    &:hover{
      background-color: #f5f5f5;
      transition: all .5s ease;
      h3{color: #62b7c2;}
    }
    h3{
      margin: .2rem 0;
      font-size: 1rem; 
      min-width: 12rem;
    }
    p{ 
      display: flex;
      position: relative;
      justify-content: center;
      padding: .5rem;
      height: .8rem;
      width: max-content;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      line-clamp: 1; 
      -webkit-box-orient: vertical;
      overflow: hidden;
      &:nth-child(2){
        width: 17rem;
      }
    }
    button{
      all: unset;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      right: 1rem;
      width: 6rem;
      height: 1.5rem;
      font-size: .8rem;
      color: white;
      background-color: #8eb5c6;
      border-radius: .5rem;
      transition: all .2s ease;
      cursor: pointer;
      &:hover{background-color: #e00000;}
    }
  }
`

export default MyQues