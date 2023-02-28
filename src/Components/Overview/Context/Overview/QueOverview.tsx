import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { BsArrowLeft } from 'react-icons/bs'
import { BusinessTypes } from 'Connections/lib/@Types'
import Roster from '../summary/components/Roster'

function QueOverview({data}: {data: BusinessTypes}) {

  const viewController = [
    {name: 'info', view: <Info data={data}/>, set: true},
    {name: 'management', view: <Roster lineId={data ? data.line_id : ''}/>, set: false}, 
    {name: 'notes', view: <Notes />, set: false},
    {name: 'line', view: <Line />, set: false}
  ]
  
  const [view, setView] = useState<typeof viewController>(viewController);
  
  useEffect(() => {
    if (data === undefined) {
      return
    }
    delete data.user_id
    setView(viewController)
  }, [data])

  return (

    <Wrapper>
      <>
        <div className='backBtn'>
          <BsArrowLeft />
          <p>Back</p>
        </div>
        <h2>Basic Information</h2>
        <div className='Que_tabs'>
          {
            view.map((item) => {
              return <input
                type='checkbox'
                key={item.name}
                onClick={() => ViewPreparer(item.name)}
                checked={item.set}
                about={item.name[0].toUpperCase() + item.name.slice(1)}
              />
            })
          }
        </div>
        <div className="Que_context">
          {
            view.filter(item => item.set).map((item) => {
              return item.view
            })
          }
        </div>
      </>
    </Wrapper>
  );

  function ViewPreparer(view: string): void {
    setView(curr => {
      const newView = curr.map((item) => {
        if(item.name === view){
          item.set = true
        }else{
          item.set = false
        }
        return item
      })
      return newView
    })
  };
  
  function Info({data}: {data: BusinessTypes}): JSX.Element {
    if (data === undefined) {
      return <></>
    }
    return (
      <InfoWrapper>
        <h5>Location</h5>
        <form action="">
        <div className="form_Row">
            <div className='form_capsule'>
              <label htmlFor="Name">Organization Name</label>
              <input type="text" name="Name" id="Name" placeholder="Name" value={data.name} readOnly/>
            </div>
          </div>
          <div className="form_Row">
            <div className='form_capsule'>
              <label htmlFor="phone">Phone</label>
              <input type="text" name="phone" id="phone" placeholder="Phone" value={data.tele} readOnly/>
            </div>
            <div className='form_capsule'>
              <label htmlFor="email">Email</label>
              <input type="text" name="email" id="email" placeholder="Email" value={data.email} readOnly/>
            </div>
          </div>
          <div className="form_Row">
            <div className='form_capsule'>
              <label htmlFor="address_1">Address</label>
              <input type="text" name="address_1" id="address_1" placeholder="Address 1" value={data.address} readOnly/>
            </div>
          </div>
          <div className="form_Row">
            <div className='form_capsule'>
              <label htmlFor="city">City</label>
              <input type="text" name="city" id="city" placeholder="City" value={data.city} readOnly/>
            </div>
            <div className='form_capsule'>
              <label htmlFor="state">State</label>
              <input type="text" name="state" id="state" placeholder="State" value={data.area} readOnly/>
            </div>
          </div>
          <div className="form_Row">
            <div className='form_capsule'>
              <label htmlFor="Country">Country</label>
              <input type="text" name="Country" id="Country" placeholder="Country" value={data.country} readOnly/>
            </div>
            <div className='form_capsule'>
              <label htmlFor="zip">Zip</label>
              <input type="text" name="zip" id="zip" placeholder="Zip" value={data.zip} readOnly/>
            </div>
          </div>
        </form>
      </InfoWrapper>
    )
  };
    
  function Line(): JSX.Element {

    return (
      <LineWrapper>
        
      </LineWrapper>
    )
  };
    
  function Notes(): JSX.Element {

    return (
      <div style={{
        width: '100%',
        background: 'grey',
        height: '100%',
      }}>Notes</div>
    )
  };
};

const Wrapper = styled.div.attrs({id: 'QueOverview'})`
  position: absolute;
  top: 1rem;
  padding: 1rem;
  width: 90%;
  min-height: 80%;
  background-color: #fcfcfc;
  border-radius: 1rem;
  box-shadow: 0 0 5px 0 rgba(0,0,0,0.2);
  .backBtn{
    display: flex;
    align-items: center;
    margin-left: .5rem;
    padding: .5rem;
    width: min-content;
    font-weight: bold;
    color: grey;
    text-indent: .5rem;
    border-radius: .5rem;
    /* box-shadow: 0 0 3px 0px silver; */
    cursor: pointer;
    p{
      margin: 0;
    }
    &:hover{
      transition: all .1s ease-in-out;
      box-shadow: 0 0 5px 1px silver;
    }
  }
  h2{
    margin: .5rem .5rem;
    padding-bottom: 1rem;
    width: calc(100%-1rem);
  }
  .Que_tabs{
    display: flex;
    margin: 1rem 0rem;
    margin-top: -.5rem;
    input{
      position: relative;
      appearance: none;
      margin: 0 .25rem;
      padding: .2rem 1rem;
      width: 8rem;
      height: 1.5rem;
      font-weight: bold;
      background-color: white;
      box-shadow: 0 0 1px 1px #dddddd;
      border: none;
      border-radius: .5rem;
      cursor: pointer;
      &:hover{
        transition: all .1s ease-in-out;
        box-shadow: 0 0px 5px 0px silver;
      }
      &:checked{
        transition: all .1s ease-in-out;
        box-shadow: 0 0px 5px 0px #d2870e;
      }
      &::before{
        display: flex;
        align-items: center;
        justify-content: center;
        appearance: none;
        margin: -.25rem -1rem;
        position: absolute;
        content: attr(about);
        width: 100%;
        height: 100%;
      }
    }
  }
  .Que_context{
    display: flex;
    flex-direction: column;
    position: relative;
    padding-bottom: 1rem;
    width: 100%;
    height: 75%;
    background-color: white;
    border-radius: .5rem;
    box-shadow: 0 0 4px 1px silver;
    overflow-x: hidden;
  }
  `
const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  h5{
    display: flex;
    align-items: center;
    margin: 0rem;
    text-indent: .5rem;
    width: 100%;
    height: 3rem;
    border-bottom: 1px solid silver;
  }
  form{
    width: 100%;
    .form_Row{
      display: flex;
      justify-content: space-evenly;
      width: 100%;
      &:first-child{
        margin-top: .5rem;
      }
      .form_capsule{
        display: flex;
        flex-direction: column;
        margin: .25rem .5rem;
        width: 100%;
        label{
          margin: .2rem;
          font-size: .8rem;
          font-weight: bold;
        }
        input{
          padding: 0rem .5rem;
          height: 2rem;
          font-size: .8rem;
          border: 1px solid #e3e3e3;
          border-radius: .5rem;
          border: 1px solid #e3e3e3;
        }
      }
    }
  }
`
const LineWrapper = styled.div`
  display: flex;
`


export default QueOverview