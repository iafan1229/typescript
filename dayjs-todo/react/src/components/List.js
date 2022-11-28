import React from 'react'
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';

const WrapContent = styled.div`
    width: 400px;
    padding: 20px;
    border: 1px solid #eee;
    h1 {
      font-size: 18px;
    }
    input {
      margin: 10px 0;
      height: 30px;
    }
  `

function List({listDate, setChecked}) {
	const [comment, setComment] = useState('');
  const [todo, setTodo] = useState(null)

  

  const handleChange = (e) => {
    e.preventDefault();
    setComment(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
			content:comment,
			date:listDate,
		};
    axios.post('/api/write', data).then((res) => {
			if (res) {
				alert('데이터 저장에 성공했습니다');
				console.log(res);
			}
		}).catch(function (error) {
      // handle error
      console.dir(error);
    })
  }

  useEffect(()=>{
    axios.post('/api/read', {date:listDate}).then((res)=>{
      setTodo(res.data.list)
    })
  },[listDate])
  return (
    <>
      <WrapContent>
        <h1>{listDate && listDate.substring(0,4)+"년 "+listDate.substring(4,6)+"월 "+listDate.substring(6,listDate.length)+"일"}</h1>
        <div>
          <input type="text" value={comment} onChange={handleChange}/>
          <button className="add" onClick={handleSubmit}>추가하기</button>
        </div>
        <ul className='todolist'>
          {todo && todo.map((el,idx)=>{
            return (
              <li key={idx}>
                <p>{idx+1}. {el.content}</p>
              </li>
            )
          })}
        </ul>
      </WrapContent>
    </>
  )
}

export default List