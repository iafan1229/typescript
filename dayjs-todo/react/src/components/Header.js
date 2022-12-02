import React, {useState, useEffect} from 'react'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import firebase from './firebase';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

function Header({setLoginState}) {
  const dispatch = useDispatch();
  const auth = getAuth();
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
      console.log(user)
      dispatch({ type: 'SET_HEADER', payload: user });
      navi('/')
      // ...
    })
    .catch((error) => {
      alert('유저를 찾을수 없습니다')
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage)
    });

	};


  useEffect(()=>{
    
  },[])

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

export default Header