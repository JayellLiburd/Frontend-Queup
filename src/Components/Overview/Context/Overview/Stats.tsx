import { useEffect, useState } from 'react'
import { BusinessTypes } from 'Connections/lib/@Types'
import { BsFilterCircle } from 'react-icons/bs'
import styled from 'styled-components'

function Stats({data}: {data: Array<BusinessTypes>}) {
  const 
    Ques: typeof data = JSON.parse(JSON.stringify(data)),
    [seachValue, setSearchValue] = useState(''),
    [Lines, setLines] = useState<typeof data>(Ques),
    filters = [
      {name: 'Ascending', disabled: false},
      {name: 'Descending', disabled: false},
      {name: 'Most Viewed', disabled: false},
      {name: 'Least Viewed', disabled: false},
      {name: 'Most Rated', disabled: false},
      {name: 'Least Rated', disabled: false},
      {name: 'Open', disabled: false},
      {name: 'Closed', disabled: false}
    ];

  //Todo: the search will search database not just the current top 20 results of data
  useEffect(() => {
    setLines(Ques)
  }, [data]);

  useEffect(() => {
    setTimeout(() => {
      if (seachValue === '' || null || undefined) {
        return setLines(Ques);
      } else {
        Searches(seachValue, Ques).then((res) => setLines(res))
      }
    }, 200);
  }, [seachValue]);

  return (
    <Wrapper>
      <h2 style={{color: '#5e5d5d', fontFamily: 'serif', fontSize: '1.4rem', margin: '0.5rem 1.5rem'}}>Stats</h2>
      <div className="Stats_filters">
        <div className="Stats_search">
            <BsFilterCircle onClick={e => e.currentTarget.parentElement?.parentElement?.classList.toggle('filter')} className='filterBtn' size={20} style={{marginLeft: '1.5rem', marginRight: '1rem'}}/>
            <input type='search' onChange={e => setSearchValue(e.target.value)}/>
        </div>
        <div className='Stats_filter_carousell'>
          {filters.map((item) => {
            return (
              <div>
                <input 
                  type='checkbox' 
                  onClick={e => sort(setLines, item, e)} 
                  key={item.name}
                  value={item.name}
                />
                <label htmlFor={item.name}>{item.name}</label>
              </div>
            )
          })}
        </div>
      </div>
      {
        Lines.map((item) => {
          return (
            <div className='Stats' key={item.line_id}>
              <p>{item.name}<caption>#{item.street_number}</caption></p>
              <p style={{fontWeight: '600'}}>{item.rate}</p>
            </div>
          )
        })
      }
    </Wrapper>
  )
}

const Wrapper = styled.div.attrs({id: 'Overview_stats', className: 'Overview_modals'})`
  margin: .5rem auto;
  margin-right: 0;
  width: 29%;
  background-color: white;
  border-radius: .5rem;
  box-shadow: 0 0 5px 0 rgba(0,0,0,0.2);
  .Stats_filters{
    padding: .5rem 0;
    border-top: 1px solid silver;
    border-bottom: 1px solid silver;
    &.filter{
      .filterBtn{
        color: #62b7c2;
      }
      .Stats_filter_carousell{
        height: 1.5rem;
        margin: .5rem 1rem;
        padding: .5rem 0;
        pointer-events: all;
        transition: all .5s ease-in-out;
      }
    }
    .Stats_search{
      display: flex;
      align-items: center;
      position: relative;
      .filterBtn{
        position: relative;
        margin-left: '1.5rem';
        margin-right: '1rem';
        cursor: pointer;
        &:hover{
          color: #62b7c2;
        }
      }
      input{
        all: unset;
        padding-left: .5rem;
        width: 75%;
        border-radius: .25rem;
        border: 1px solid #e0e0e0;
      }
    }
    .Stats_filter_carousell{
      display: flex;
      height: 0rem;
      overflow-x: scroll;
      overflow-y: hidden;
      pointer-events: none; 
      div{
        all: unset;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        input{
          all: unset;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: .5rem;
          padding: .25rem .5rem;
          min-width: 5rem;
          height: 1rem;
          font-size: .6rem;
          font-weight: 600;
          border-radius: 1rem;
          border: 1px solid #e0e0e0;
          cursor: pointer;
          &:hover{
            background-color: #62b7c2;
            color: white;
          }
          &:checked{
            background-color: #62b7c2;
          }
          &:disabled{
            background-color: #e0e0e0;
          }
        }
        label{
          position: absolute;
          font-size: .6rem;
          transform: translate(-10%, 0%);
        }
      }
    }
  }
  .Stats{
    display: flex;
    align-items: center;
    p{
      margin: .5rem 0;
      width: 50%;
      caption{
        all: unset;
        font-size: .6rem;
      }
      &:first-child{
        margin: 0 1.5rem;
      }
    }
  }
`

const Searches = async(seachValue: string, arr: Array<BusinessTypes>): Promise<typeof arr> => {
  return arr.filter((item: typeof arr[0]) => 
    item.name?.toLowerCase().match(seachValue.toLowerCase()) !== null
    ||
    item.address?.toLowerCase().match(seachValue.toLowerCase()) !== null
  )
};

function sort(
  state: React.Dispatch<React.SetStateAction<BusinessTypes[]>>,
  type: {name: string, disabled: boolean},
  event: React.MouseEvent<HTMLInputElement, MouseEvent>
 ) {
  switch (type.name) {
    case 'Ascending':
      event.currentTarget.checked = true
      console.log(event.currentTarget.parentElement?.parentElement?.children)
      state((prev) => prev.sort((a, b) => {
        if (!a.rate || !b.rate) {return 0}
        else if (a.rate > b.rate) {return 1}
        else return -1
      }))
      break;
    }
}


export default Stats