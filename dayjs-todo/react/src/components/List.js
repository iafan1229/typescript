import React , {useContext} from 'react'
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { dataContext } from '../App';

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

function List() {
  const listDate = useContext(dataContext)

  const header = useSelector(
		(state) => state.headerReducer.header
	);

  const path = process.env.PUBLIC_URL;
	const [comment, setComment] = useState('');
  const [todo, setTodo] = useState(null)
  

  const handleChange = (e) => {
    e.preventDefault();
    setComment(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if(!header) return alert('관리자만 게시글을 쓸수 있어요!')
    const data = {
			content:comment,
			date:listDate,
		};
    axios.post('/api/write', data).then((res) => {
			if (res) {
				alert('데이터 저장에 성공했습니다');
				console.log(res);
        window.location.replace("/")
			}
		}).catch(function (error) {
      // handle error
      console.dir(error);
    })
    
  }

  const handleKeyDown = (e) => {
    if(e.key === 'Enter') {
      handleSubmit(e)
    }
  }

  const handleDelete = (el) => {
    if(!header) return alert('관리자만 게시글을 지울수 있어요!')
    const result = window.confirm('정말로 삭제하시겠습니까? ');
		if (!result) return;
		axios.post('/api/delete', { content: el.content }).then((res) => {
			console.log(res);
		}).catch(err=>console.log(err));
		window.location.replace("/")
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
          <input type="text" value={comment} onChange={handleChange} onKeyPress={handleKeyDown}/>
          <button className="add" onClick={handleSubmit}>추가하기</button>
        </div>
        <ul className='todolist'>
          {todo && todo.map((el,idx)=>{
            return (
              <li key={idx}>
                <p>{idx+1}. {el.content}</p>
                <button onClick={()=>handleDelete(el)}><img src={`${path}/delete.png`} alt=""/></button>
              </li>
            )
          })}
        </ul>
      </WrapContent>
    </>
  )
}

export default List