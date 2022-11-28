import React, {useState, useEffect} from 'react'
import styled from 'styled-components';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import {Link} from 'react-router-dom';

function Calendar({setListDate, checked}) {
  const navi = useNavigate();
  const loca = useLocation()

  const [color, setColor]= useState([])

  // import
  const dayjs = require('dayjs');

  const weekday = require('dayjs/plugin/weekday');
  const isoWeek = require('dayjs/plugin/isoWeek');
  const weekOfYear = require('dayjs/plugin/weekOfYear');
  

  // day extend
  dayjs.extend(weekday);
  dayjs.extend(isoWeek);
  dayjs.extend(weekOfYear);


  const today = dayjs();

  useEffect(()=>{
    setListDate(today.format('YYYYMMDD'));
  },[])

  useEffect(()=>{
    if(checked){
      setColor(checked.map((el,idx)=>{
        if(checked.indexOf(el)===idx)
        return el.date
      }))
    }
    
  },[checked])

  useEffect(()=>{
    
  },[color])

  const [viewDate, setViewDate] = useState(dayjs());
  const [selectDate, setSelectDate] = useState(dayjs());

  const createCalendar = () => {
    const startWeek = viewDate.startOf('month').week();
    const endWeek = viewDate.endOf('month').week() === 1 ? 53 : viewDate.endOf('month').week();
    let calendar = [];

    for (let week = startWeek; week <= endWeek; week++) { //11월의 경우 5번 반복문
      calendar.push( //7일 row
        <div className="row" key={week}>
          {Array(7).fill(0).map((n, i) => {
            let current = viewDate.startOf('week').week(week).add(n + i, 'day');
            if (viewDate.format('MM') === '12') {
              current = viewDate.startOf('week').week(week - 52).add(n + i, 'day');
            }
            // 현재 날짜 (기준)
            let isSelected = selectDate.format('YYYYMMDD') === current.format('YYYYMMDD') ? 'selected' : '';
            let isToday = today.format('YYYYMMDD') === current.format('YYYYMMDD') ? 'today' : '';
            //안 나오면 none 처리
            let isNone = current.format('MM') === viewDate.format('MM') ? '' : 'none';
            let colored = (color.includes(current.format('YYYYMMDD'))) ? 'marked' : '';
            let len = (arr, el) => arr.filter(v => v === el).length;
          
            return (
              <>
                <div className={`box`} key={`${week}_${i}`} onClick={()=>{
                  setListDate(current.format('YYYYMMDD'))
                  navi(`/list/${current.format('YYYYMMDD')}`)
                }} >
                  <div className={`text ${colored} ${isSelected} ${isToday} ${isNone}`} onClick={() => { setSelectDate(current) }}>
                    <span className={`day`}>
                      {current.format('D')}
                    </span>
                    {isToday ? (<span className="isToday">오늘</span>)
                      : isSelected ? (<span className="isSelected"></span>) : null}
                    {len(color, current.format('YYYYMMDD')) ?  <span className='diarylen'>{len(color, current.format('YYYYMMDD'))}</span> : null}
                  </div>
                </div >
              </>
            )
          })
          }
        </div >
      )
    }
    
    return calendar;
  }

  const changegeMonth = (date, changeString) => {
    switch (changeString) {
      case 'add':
        return setViewDate(viewDate.add(1, 'month'))
      case 'subtract':
        return setViewDate(viewDate.add(-1, 'month'))
      default:
        return date;
    }
  }


  return (
    <>
      <Todo>
        <Wrap>
          <StyledHeader>
            <button onClick={() => changegeMonth(viewDate, 'subtract')}>&lt;</button>
            <span className="thisMonth">{viewDate.format("YYYY")}년{viewDate.format("MM")}월</span>
            <button onClick={() => changegeMonth(viewDate, 'add')}>&gt;</button>
          </StyledHeader>
          <StyledBody>
            <div className="row week calendartitle">
              {['일','월','화','수','목','금','토'].map((el,idx)=>{
                return <div className="box"><span className="text">{el}</span></div>
              })}
            </div>
            <div>
              {createCalendar()}
            </div>
          </StyledBody>
        </Wrap>
        
      </Todo>
    </>
  )
}
const Todo = styled.div`
  display: flex;
  justify-content: center;  
  padding: 20px;
  h1 {
    font-size: 18px;
  }
`
const Wrap = styled.div`
  width: 400px;
`

const StyledHeader = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  margin: 20px;
  
  button {
    border: none;
    background: #fff;
    color: deeppink;
    cursor:pointer;
    padding:0 5px;
    font-size: 18px;
  }
  .thisMonth{
    font-weight: 700;
    color: #292929;
    line-height: 24px;
  }
`;

const StyledBody = styled.div`
  text-align: center;
  margin: 20px;
  .row{
    
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    width: 100%;
    &.calendartitle {
      background: #e5c7ff;
      color:#fff;
    }
  }
  .row.week{
    height: 18px;
    border-bottom: 1px solid #E8E8E8;
  }
  .box{
    width: 40px;
    height: 40px;
    margin: 6px 6px;
    font-size: 14px;
  }
  .text{
    position: static;
    width: 40px;
    height: 40px;
    color: #292929;
  }
  .holiday,
  .grayed{
    color: #484848;
    pointer-events: none;
  }
  .day{
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
  }
  .selected{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background : deeppink;
    font-weight: 700;
    color: #fff;
  }
  .today{
    border-radius: 50%;
    font-weight: 500;
    /* color: pink; */
    background : deeppink;
  }
  .isSelected{
    position: relative;
    color: pink;
    font-size: 10px;
    font-weight: 400;
  }
  .isToday{
    position: relative;
    color: #292929;
    font-size: 10px;
    font-weight: 400;
  }
  .none{
    color:#E8E8E8;
  }
`;

export default Calendar