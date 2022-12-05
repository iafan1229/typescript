import { Dayjs } from 'dayjs';
import React, {useState, useEffect, useMemo, useCallback} from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';


interface Checked {
  content: string,
  date: string
}

interface Calendar{
  setListDate: React.Dispatch<React.SetStateAction<number | null>>,
  checked: Checked[]
}

function Calendar({setListDate, checked}:Calendar) {

  const path = process.env.PUBLIC_URL;
  const navi = useNavigate();

  const [color, setColor]= useState<string[]>([])

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

  interface Obj {
    content: string,
    date: string
  }
  
  const check = useCallback(()=>{
    if(checked){
      setColor(checked.map((el:Obj,idx:number)=>{
        console.log(el)
        if(checked.indexOf(el)===idx)
        return el.date
      }))

    }
    
  },[checked])

  useEffect(()=>{
    check()
  },[check])


  const [viewDate, setViewDate] = useState(dayjs());
  const [selectDate, setSelectDate] = useState(dayjs());


  const createCalendar = useMemo(() => {
    const startWeek = viewDate.startOf('month').week();
    const endWeek = viewDate.endOf('month').week() === 1 ? 53 : viewDate.endOf('month').week();
    let calendar = [];

    for (let week = startWeek; week <= endWeek; week++) { //11월의 경우 5번 반복문
      calendar.push( //7일 row
        <div className="row" key={week}>
          {Array(7).fill(0).map((n, i) => {
            let current = viewDate.startOf('week').week(week).add(n + i, 'day');
            // if (viewDate.format('YYYY') === '12') {
            //   current = viewDate.startOf('week').week(week - 52).add(n + i, 'day');
            // }
            // 현재 날짜 (기준)
            let isSelected = selectDate.format('YYYYMMDD') === current.format('YYYYMMDD') ? 'selected' : '';
            let isToday = today.format('YYYYMMDD') === current.format('YYYYMMDD') ? 'today' : '';
            //안 나오면 none 처리
            let isNone = current.format('MM') === viewDate.format('MM') ? '' : 'none';
            let colored = (color.includes(current.format('YYYYMMDD'))) ? 'marked' : '';
            let len = (arr:string[], el:string) => arr.filter((v:string) => v === el).length;
          
            return (
              <>
                <div className={`box`} key={`${week}_${i}`}>
                  <div className={`text ${colored} ${isSelected} ${isToday} ${isNone}`} onClick={() => {
                    setSelectDate(current) 
                    setListDate(current.format('YYYYMMDD'))
                    navi(`/list/${current.format('YYYYMMDD')}`)
                  }}>
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
  },[viewDate, selectDate, color, navi, today, setListDate, setSelectDate])

  const changegeMonth = (date:Dayjs, changeString:string) => {
    switch (changeString) {
      case 'add':
        return setViewDate(viewDate.add(1, 'month'))
      case 'subtract':
        return setViewDate(viewDate.subtract(1, 'month'))
      default:
        return date;
    }
  }


  return (
    <>
      <Todo>
        <Wrap>
          <StyledHeader>
            <button onClick={() => changegeMonth(viewDate, 'subtract')}><img src={`${path}/next.png`} alt=""/></button>
            <span className="thisMonth">{viewDate.format("YYYY")}년{viewDate.format("MM")}월</span>
            <button onClick={() => changegeMonth(viewDate, 'add')}><img src={`${path}/next.png`} alt=""/></button>
          </StyledHeader>
          <StyledBody>
            <div className="row week calendartitle">
              {['일','월','화','수','목','금','토'].map((el,idx)=>{
                return <div className="box"><span className="text">{el}</span></div>
              })}
            </div>
            <div>
              {createCalendar}
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
    &:nth-of-type(1) {
      img {
        transform: rotateY(180deg);
      }
    }
    width: 30px;
    height: 30px;
    border: none;
    background: #fff;
    color: deeppink;
    cursor:pointer;
    padding:0 5px;
    font-size: 18px;
    img {
      width: 100%;
    }
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
    position: relative;
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
    position:relative;
    &::before{
      z-index: -1;
      position: absolute;
      top:50%;
      left:50%;
      transform: translate(-50%,-50%);
      content:'';
      display:block;
      width: 25px;
      height: 25px;
      border-radius: 50%;
      background-color: rgba(242, 255, 0,0.7);
      font-weight:bold;
    }
  }
  .today{
    &::before{
      z-index: -2;
      position: absolute;
      top:50%;
      left:50%;
      transform: translate(-50%,-50%);
      content:'';
      display:block;
      width: 25px;
      height: 25px;
      border-radius: 50%;
      background-color: rgba(107, 231, 224, 0.6);;
      font-weight:bold;
    }
    &.selected{
    position:relative;
    &::before{
      z-index: -1;
      position: absolute;
      top:50%;
      left:50%;
      transform: translate(-50%,-50%);
      content:'';
      display:block;
      width: 25px;
      height: 25px;
      border-radius: 50%;
      background-color: rgba(242, 255, 0,0.5);
      font-weight:bold;
    }
  }
  }
  .isSelected{
    position: relative;
    color: pink;
    font-size: 10px;
    font-weight: 400;
  }
  .isToday{
    display:block;
    margin-top:-8px;
    position: relative;
    color: #292929;
    font-size: 10px;
    font-weight: 400;
    padding-bottom:3px;
  }
  .none{
    color:#E8E8E8;
  }
`;

export default Calendar