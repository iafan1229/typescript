import React from 'react'
import { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation, useParams } from 'react-router-dom';


function List({listDate}) {
  const navi = useNavigate();
  const loca = useLocation()
  const param = useParams();

  const WrapContent = styled.div`
    width: 400px;
    padding: 20px;
    border: 1px solid #eee;
    h1 {
      font-size: 18px;
    }
`
  return (
    <>
      <WrapContent>
        <h1>{listDate && listDate.substring(0,4)+"년 "+listDate.substring(4,6)+"월 "+listDate.substring(6,listDate.length)+"일"}</h1>
        <button>추가하기</button>
        {/* <List date={selectDate.format('YYYY-MM-DD')} /> */}
      </WrapContent>
    </>
  )
}

export default List