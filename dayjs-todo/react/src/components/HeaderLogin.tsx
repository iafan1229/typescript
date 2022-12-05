import React, { memo } from 'react';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {auth1} from './firebase';


function HeaderLogin() {
  const dispatch = useDispatch();
  const navi = useNavigate()
  const auth = auth1;

  const handleLogout = () => {
		signOut(auth)
			.then(() => {
				// Sign-out successful.
				alert('로그아웃이 성공적으로 이루어졌습니다.');
        dispatch({ type: 'SET_HEADER', payload: false });
				navi('/');
			})
			.catch((error) => {
				// An error happened.
				alert('에러가 발생했습니다.');
			});
	};

  return (
    <header>
      <p>관리자로 로그인시 게시글 삭제권한을 가집니다</p>
      <div>
        <p>관리자 하영님 반갑습니다</p>
        <button onClick={handleLogout}>로그아웃</button>
      </div>
    </header>
  )
}

export default memo(HeaderLogin)