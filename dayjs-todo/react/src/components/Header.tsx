import React, {memo, useState} from 'react'
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {auth1} from './firebase';

function Header() {
  const dispatch = useDispatch();
  const auth = auth1;
  const navi = useNavigate();
  const [email, setEmail] = useState('');
	const [pw1, setPw1] = useState('');

  const handleJoin = async () => {
		if (!email || !pw1) {
			return alert('모든 양식을 입력하세요');
		}

		
    await signInWithEmailAndPassword(auth, email, pw1)
    .then((userCredential) => {
      alert('로그인 성공')
      // Signed in 
      const user = userCredential.user;
      dispatch({ type: 'SET_HEADER', payload: user });
      navi('/')
      // ...
    })
    .catch((error) => {
      alert('유저를 찾을수 없습니다')
    });

	};



  return (
    <header>
      <p>관리자로 로그인시 게시글 삭제권한을 가집니다</p>
      <div>
        <p>관리자</p>
        <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="이메일을 입력하세요"/>
        <input type="password" value={pw1} onChange={(e)=>setPw1(e.target.value)} placeholder="비밀번호를 입력하세요"/>
        <button onClick={handleJoin}>로그인</button>
      </div>
    </header>
  )
}

export default memo(Header)