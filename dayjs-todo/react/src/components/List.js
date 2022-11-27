import React from 'react'
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';


function List({listDate}) {
  const [title, setTitle] = useState('');
	const [comment, setComment] = useState('');

  const WrapContent = styled.div`
    width: 400px;
    padding: 20px;
    border: 1px solid #eee;
    h1 {
      font-size: 18px;
    }
  `

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
			title,
			comment,
		};

    axios.post('/api/diary/write', data).then((res) => {
			if (res) {
				alert('데이터 저장에 성공했습니다');
				console.log(res);
			}
		}).catch(function (error) {
      // handle error
      console.log(error);
    })
  }
  return (
    <>
      <WrapContent>
        <h1>{listDate && listDate.substring(0,4)+"년 "+listDate.substring(4,6)+"월 "+listDate.substring(6,listDate.length)+"일"}</h1>
        <div>
          <input type="text" />
          <button onClick={handleSubmit}>추가하기</button>
        </div>
        {/* <List date={selectDate.format('YYYY-MM-DD')} /> */}
      </WrapContent>
    </>
  )
}

export default List