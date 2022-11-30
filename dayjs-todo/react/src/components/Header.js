import React from 'react'

function Header() {
  return (
    <header>
      <p>관리자로 로그인시 게시글 삭제권한을 가집니다</p>
      <div>
        <p>관리자</p>
        <input type="text" placeholder="비밀번호를 입력하세요"/>
        <button>로그인</button>
      </div>
    </header>
  )
}

export default Header